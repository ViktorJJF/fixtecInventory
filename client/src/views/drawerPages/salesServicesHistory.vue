<template>
  <custom-card title="Historial de ventas de servicios" icon="mdi-format-list-checks">
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
            :items="['SOFTWARE','HARDWARE']"
            class="mr-3 mb-3"
            outlined
          ></v-select>
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
          <strong>Cantidad de ventas de servicios:</strong>
          {{$store.state.salesServicesModule.total}}
        </p>
      </v-col>
      <div class="text-center pt-2">
        <v-pagination v-model="page" @input="initialData(page,filters)" :length="totalPages"></v-pagination>
      </div>
      <v-data-table
        :loading="!isDataReady"
        :headers="headers"
        :items="salesServices"
        :options.sync="pagination"
        :items-per-page="500"
        hide-default-footer
        :server-items-length="totalItems"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <v-alert type="error" :value="true">Aún no cuentas con un historial de ventas</v-alert>
        </template>
        <template v-slot:item.services="{item}">
          <ul>
            <li v-for="service in item.services" :key="service._id">
              {{service.serviceId.name}} (Costo:
              <span class="perdida">{{service.cost.value}}</span>)
            </li>
          </ul>
        </template>
        <template v-slot:item.amount="{item}">
          <span class="ganancia">S/.{{totalRevenue(item.services)}}</span>
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
            @click="saveSaleService(item);editMode=false;"
          >Guardar</v-btn>
          <v-btn class="mb-2 my-2" small color="error" @click="deleteItem(item)">Eliminar</v-btn>
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
export default {
  filters: {
    formatDate: function (value) {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  data: () => ({
    filters: { startDate: null, endDate: null, commerce: null },
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
      { text: "Fecha de venta", value: "date" },
      { text: "Servicios", value: "services" },
      { text: "Ingreso", value: "amount" },
      { text: "Acciones", value: "actions" },
    ],
    salesServices: [],
    orderDetails: [],
  }),
  computed: {
    totalItems() {
      return this.$store.state.salesServicesModule.totalSalesServices;
    },
    totalPages() {
      return this.$store.state.salesServicesModule.totalPages;
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
        this.salesServices = this.$deepCopy(
          await this.$store.dispatch("salesServicesModule/list", {
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
    async saveSaleService(sale) {
      let date = new Date(this.editedDate);
      date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
      sale.date = date;
      await this.$store.dispatch("salesServicesModule/update", {
        id: sale._id,
        data: {
          commerce: sale.commerce,
          date: date,
        },
      });
    },
    totalRevenue(salesServicesDetail) {
      if (salesServicesDetail)
        return salesServicesDetail
          .reduce((a, b) => a + b.salePrice, 0)
          .toFixed(2);
      else return "S/.0";
    },
    async deleteItem(item) {
      const index = this.salesServices.indexOf(item);
      let itemId = this.salesServices[index]._id;
      let detailsServices = this.salesServices[index].services;
      if (
        await this.$confirm(
          "¿Seguro que deseas eliminar esta venta de servicio? Se sumará el stock a los productos del costo del servicio"
        )
      ) {
        try {
          this.$store.dispatch("loadingModule/showLoading");
          await this.$store.dispatch("salesServicesModule/delete", itemId);
          for (const detailsService of detailsServices) {
            if (!detailsService.history) {
              if (detailsService.cost.products.length > 0) {
                for (const product of detailsService.cost.products) {
                  this.$store.commit("productsModule/updateStock", {
                    productId: product._id,
                    qty: 1,
                  });
                }
              }
            }
          }
          this.salesServices.splice(index, 1);
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