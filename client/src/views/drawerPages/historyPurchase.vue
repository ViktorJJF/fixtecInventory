<template>
  <custom-card title="Historial de compras" icon="mdi-format-list-checks">
    <template v-slot:content>
      <v-row align="center" class="mb-3">
        <v-col cols="12" sm="4">
          <span class="body-1 font-weight-bold d-inline mx-3">Desde:</span>
          <v-text-field
            outlined
            dense
            v-model="filters.startDate"
            prepend-icon="event"
            type="date"
            class="mr-3 mb-3"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="body-1 font-weight-bold d-inline mx-3">Hasta:</span>
          <v-text-field
            outlined
            dense
            v-model="filters.endDate"
            prepend-icon="event"
            type="date"
            class="mr-3 mb-3"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="body-1 font-weight-bold d-inline mx-3">Negocio:</span>
          <v-select
            clearable
            @click:clear="filters.commerce=null"
            hide-details
            dense
            placeholder="Selecciona un negocio"
            v-model="filters.commerce"
            :items="['VENTA DE ACCESORIOS','VENTA DE REPUESTOS','CELULARES']"
            class="mr-3 mb-3"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <span class="body-1 font-weight-bold d-inline mx-3">Filtrar por producto:</span>
          <v-dialog v-model="dialog" width="1200">
            <template v-slot:activator="{ on:dialog }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn v-on="{ ...tooltip, ...dialog }" tile color="primary" class="my-3 mr-3">
                    <v-icon left>search</v-icon>Seleccionar producto
                  </v-btn>
                </template>
                <span>Inventario</span>
              </v-tooltip>
            </template>
            <v-card>
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Productos</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <products
                  @add-product="filters.product=$event._id;dialog=false;"
                  :selectButton="true"
                ></products>
              </v-container>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">De acuerdo</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row v-show="filters.product">
            <v-simple-table v-if="filters.product">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      <span>Tipo</span>
                    </th>
                    <th class="text-left">
                      <span>Nombre</span>
                    </th>
                    <th class="text-left">
                      <span>Marca</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{(productById(filters.product)).typeId?(productById(filters.product)).typeId.name:"Sin tipo"}}</td>
                    <td>{{(productById(filters.product)).name}}</td>
                    <td>{{(productById(filters.product)).brandId?(productById(filters.product)).brandId.name:"Sin marca"}}</td>
                    <td>
                      <v-btn color="error" small @click="filters.product=null;">Limpiar</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-btn block color="success" @click="initialData(1,filters)">Buscar!</v-btn>
        </v-col>
      </v-row>
      <v-col cols="12" sm="12">
        <p>
          <strong>Cantidad de compras:</strong>
          {{$store.state.purchasesModule.total}}
        </p>
      </v-col>
      <div class="text-center pt-2">
        <v-pagination v-model="page" @input="initialData(page,filters)" :length="totalPages"></v-pagination>
      </div>
      <v-data-table
        :loading="!isDataReady"
        :headers="headers"
        :items="purchases"
        :options.sync="pagination"
        :items-per-page="500"
        hide-default-footer
        :server-items-length="totalItems"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <v-alert type="error" :value="true">Aún no cuentas con un historial de compras</v-alert>
        </template>
        <template v-slot:item.userId="{item}">{{item.userId.email}}</template>
        <template v-slot:item.products="{item}">
          <ul>
            <li
              v-for="product in item.products"
              :key="product._id"
            >{{product.productId?product.productId.name:'Producto eliminado'}} ({{product.qty}} x S/.{{product.purchasePrice}})</li>
          </ul>
        </template>
        <template v-slot:item.amount="{item}">
          <span class>S/.{{totalRevenue(item.products)}}</span>
        </template>
        <template v-slot:item.commerce="{item}">
          <span>{{item.commerce}}</span>
        </template>
        <template v-slot:item.date="{item}">
          <div>
            <v-text-field
              class="mt-4"
              v-show="editMode && item._id==editedIndex"
              outlined
              dense
              v-model="editedDate"
              prepend-icon="event"
              type="date"
            ></v-text-field>
            <span v-show="!editMode || item._id!=editedIndex">{{item.date | formatDate}}</span>
            <v-chip
              v-show="item.products[0]?item.products[0].history:false"
              color="info"
              class="ma-2"
              small
            >Histórico</v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{item}">
          <v-btn
            v-show="!editMode || item._id!=editedIndex"
            class="mr-2 my-2"
            small
            color="info"
            @click="editMode=true;editedIndex=item._id;editedDate=new Date(item.date).toISOString().substr(0, 10)"
          >Editar</v-btn>
          <v-btn
            v-show="editMode && item._id==editedIndex"
            class="mr-2 my-2"
            small
            color="success"
            @click="savePurchase(item);editMode=false;"
          >Guardar</v-btn>
          <v-btn small color="error" @click="deleteItem(item)">Eliminar</v-btn>
        </template>
        <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" @input="initialData(page,filters)" :length="totalPages"></v-pagination>
      </div>
    </template>
  </custom-card>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";
import { buildPayloadPagination } from "@/utils/utils.js";
import products from "@/views/drawerPages/products.vue";
export default {
  components: {
    products,
  },
  filters: {
    formatDate: function (value) {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  data: () => ({
    filters: { startDate: null, endDate: null, commerce: null, product: null },
    editedDate: null,
    editedIndex: null,
    editMode: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    isDataReady: false,
    selectedOrder: 0,
    pagination: {},
    search: "",
    dialog: false,
    headers: [
      { text: "Negocio", value: "commerce" },
      { text: "Fecha de compra", value: "date" },
      { text: "Comprador", value: "userId" },
      { text: "Productos comprados", value: "products" },
      { text: "Inversión", value: "amount" },
      { text: "Acciones", value: "actions" },
    ],
    purchases: [],
    orderDetails: [],
  }),
  computed: {
    totalItems() {
      return this.$store.state.purchasesModule.totalPurchases;
    },
    totalPages() {
      return this.$store.state.purchasesModule.totalPages;
    },
    ...mapGetters({
      productById: "productsModule/productById",
    }),
    commerce() {
      return this.$store.state.commerce;
    },
  },
  created() {
    this.initialData();
  },
  methods: {
    async initialData(currentPage, filters) {
      try {
        this.$store.dispatch("loadingModule/showLoading");
        currentPage = currentPage || 1;
        this.purchases = this.$deepCopy(
          await this.$store.dispatch("purchasesModule/listWithProducts", {
            ...filters,
            ...buildPayloadPagination({
              page: currentPage,
              itemsPerPage: this.$store.state.itemsPerPage,
            }),
          })
        );
      } catch (error) {
        console.log("algo salio mal...:", error);
      } finally {
        this.$store.dispatch("loadingModule/showLoading", false);
      }
      this.isDataReady = true;
    },
    async savePurchase(purchase) {
      console.log("se guardara estO .", purchase);
      let date = new Date(this.editedDate);
      date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
      purchase.date = date;
      await this.$store.dispatch("purchasesModule/update", {
        id: purchase._id,
        data: {
          commerce: purchase.commerce,
          date: date,
        },
      });
    },
    totalRevenue(purchasesDetail) {
      if (purchasesDetail)
        return purchasesDetail
          .reduce((a, b) => a + b.purchasePrice * b.qty, 0)
          .toFixed(2);
      else return "S/.0";
    },
    async deleteItem(item) {
      const index = this.purchases.indexOf(item);
      let itemId = this.purchases[index]._id;
      let detailsProducts = this.purchases[index].products;
      if (
        await this.$confirm(
          "¿Seguro que deseas eliminar esta venta? Se sumará el stock a los productos del detalle"
        )
      ) {
        try {
          this.$store.dispatch("loadingModule/showLoading");
          await this.$store.dispatch("purchasesModule/delete", itemId);
          for (const detailsProduct of detailsProducts) {
            console.log("este es el history: ", detailsProduct.history);
            if (!detailsProduct.history) {
              this.$store.commit("productsModule/updateStock", {
                productId: detailsProduct.productId._id,
                qty: -detailsProduct.qty,
              });
            }
          }
          this.purchases.splice(index, 1);
        } catch (error) {
          console.log(error);
        } finally {
          this.$store.dispatch("loadingModule/showLoading", false);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>