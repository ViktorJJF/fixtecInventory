<template>
  <custom-card title="Historial de ventas" icon="mdi-format-list-checks">
    <template v-slot:content>
      <!-- <v-col cols="12" sm="12">
        <p>
          <strong>Total de ventas:</strong>
          {{$store.getters.getTotalOrders}}
        </p>
      </v-col>-->

      <div class="text-center pt-2">
        <v-pagination v-model="page" @input="initialData(page)" :length="totalPages"></v-pagination>
      </div>
      <v-data-table
        :loading="!isDataReady"
        :headers="headers"
        :items="sales"
        :options.sync="pagination"
        :items-per-page="5"
        :server-items-length="totalItems"
        hide-default-footer
        class="elevation-1"
        :footer-props="{
        'items-per-page-text': 'yarita',
        'items-per-page-options': [5, 10, 25]
      }"
      >
        <template v-slot:no-data>
          <v-alert type="error" :value="true">Aún no cuentas con un historial de ventas</v-alert>
        </template>
        <template v-slot:item.userId="{item}">{{item.userId.email}}</template>
        <template v-slot:item.products="{item}">
          <ul>
            <li
              v-for="product in item.products"
              :key="product._id"
            >{{product.productId?product.productId.name:'Producto eliminado'}} ({{product.qty}} x S/.{{product.salePrice}})</li>
          </ul>
        </template>
        <template v-slot:item.amount="{item}">
          <span class="ganancia">S/.{{totalRevenue(item.products)}}</span>
        </template>
        <template v-slot:item.date="{item}">
          <div>
            {{item.date | formatDate}}
            <v-chip
              v-show="item.products[0]?item.products[0].history:false"
              color="info"
              class="ma-2"
              small
            >Histórico</v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{item}">
          <v-btn small color="error" @click="deleteItem(item)">Eliminar</v-btn>
        </template>
        <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" @input="initialData(page)" :length="totalPages"></v-pagination>
      </div>
    </template>
  </custom-card>
</template>

<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";
import { buildPayloadPagination } from "@/utils/utils.js";
// import { customHttpRequest } from "../../tools/customHttpRequest";
export default {
  filters: {
    formatDate: function (value) {
      return format(new Date(value), "hh:m:s a dd/MM/yyyy");
    },
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    isDataReady: false,
    selectedOrder: 0,
    pagination: {},
    search: "",
    dialog: false,
    headers: [
      { text: "Fecha de venta", value: "date" },
      { text: "Vendedor", value: "userId" },
      { text: "Productos vendidos", value: "products" },
      { text: "Beneficio", value: "amount" },
      { text: "Acciones", value: "actions" },
    ],
    sales: [],
    orderDetails: [],
  }),
  computed: {
    totalItems() {
      return this.$store.state.salesModule.totalSales;
    },
    totalPages() {
      return this.$store.state.salesModule.totalPages;
    },
    ...mapGetters({
      productById: "productsModule/productById",
    }),
  },
  created() {
    this.initialData();
  },
  methods: {
    async initialData(currentPage) {
      try {
        this.$store.dispatch("loadingModule/showLoading");
        currentPage = currentPage || 1;
        this.sales = await this.$store.dispatch(
          "salesModule/listWithProducts",
          buildPayloadPagination({
            page: currentPage,
            itemsPerPage: this.$store.state.itemsPerPage,
          })
        );
        //populate with products
        for (let i = 0; i < this.sales.length; i++) {
          for (let j = 0; j < this.sales[i].products.length; j++) {
            this.sales[i].products[j].productId = this.productById(
              this.sales[i].products[j].productId
            );
          }
        }
      } catch (error) {
        console.log("algo salio mal...:", error);
      } finally {
        this.$store.dispatch("loadingModule/showLoading", false);
      }
      this.isDataReady = true;
    },
    totalRevenue(salesDetail) {
      if (salesDetail)
        return salesDetail.reduce((a, b) => a + b.salePrice * b.qty, 0);
      else return "S/.0";
    },
    async deleteItem(item) {
      const index = this.sales.indexOf(item);
      let itemId = this.sales[index]._id;
      let detailsProducts = this.sales[index].products;
      if (
        await this.$confirm(
          "¿Seguro que deseas eliminar esta venta? Se sumará el stock a los productos del detalle"
        )
      ) {
        try {
          this.$store.dispatch("loadingModule/showLoading");
          await this.$store.dispatch("salesModule/delete", itemId);
          for (const detailsProduct of detailsProducts) {
            console.log("este es el history: ", detailsProduct.history);
            if (!detailsProduct.history) {
              this.$store.commit("productsModule/updateStock", {
                productId: detailsProduct.productId._id,
                qty: detailsProduct.qty,
              });
            }
          }
          this.sales.splice(index, 1);
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