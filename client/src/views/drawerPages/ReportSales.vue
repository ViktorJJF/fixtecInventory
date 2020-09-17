<template>
  <v-container class="container-width pa-5">
    <ul>
      <li>
        <h2 class="mb-3">
          Total de Ventas:
          <span class="ganancia">S/.{{totalSales | formatMoney}}</span>
        </h2>
      </li>
      <li>
        <h2 class="mb-3">
          Total de Ganancias:
          <span class="ganancia">S/.{{(totalSales-totalSalesCost) |formatMoney}}</span>
        </h2>
      </li>
    </ul>
    <v-container fluid>
      <v-simple-table class="custom-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                <span>Negocio</span>
              </th>
              <th class="text-center">
                <span>Fecha</span>
              </th>
              <th class="text-center">
                <span>Productos</span>
              </th>
              <th class="text-center">
                <span>Costo</span>
              </th>
              <th class="text-center">
                <span>Total de venta</span>
              </th>
              <th class="text-center">
                <span>Ganancias</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sales" :key="item.name">
              <!-- <td>{{item}}</td> -->
              <td class="text-center">
                <b>{{ item.commerce }}</b>
              </td>
              <td class="text-center">{{ item.date | formatDate }}</td>
              <td class="text-center">
                <ul>
                  <li
                    v-for="productDetail in item.products"
                    :key="productDetail._id"
                  >{{productDetail.productId?productDetail.productId.name:'Producto eliminado'}} ({{productDetail.qty}} x S/.{{productDetail.salePrice}})</li>
                </ul>
              </td>
              <td class="text-center">S/.{{subTotalCost(item.products) | formatMoney}}</td>
              <td class="text-center">S/.{{subTotalRevenue(item.products) | formatMoney}}</td>
              <td
                class="text-center"
              >S/.{{(subTotalRevenue(item.products)-subTotalCost(item.products)) | formatMoney}}</td>
            </tr>
            <tr>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center">
                <b>Costo total:</b>
                <span class>S/.{{totalSalesCost | formatMoney}}</span>
              </td>
              <td class="text-center">
                <b>Total de Ventas:</b>
                <span class>S/.{{totalSales | formatMoney}}</span>
              </td>
              <td class="text-center">
                <b>Total de Ganancias:</b>
                <span class>S/.{{totalSales-totalSalesCost | formatMoney}}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>


<script>
import { format } from "date-fns";

export default {
  filters: {
    formatDate: function (value) {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  data() {
    return {};
  },
  async mounted() {
    this.$store.getters["salesModule/salesWithProductsPopulated"];
    this.$store.dispatch("loadingModule/showLoading");
    await this.$store.dispatch("salesModule/listWithProducts", {
      page: 1,
      limit: 9999,
    });
    this.$store.dispatch("loadingModule/showLoading", false);
  },
  computed: {
    sales() {
      return this.$store.state.salesModule.sales;
    },
    totalSales() {
      return this.sales
        .reduce(
          (a, b) => a + b.products.reduce((c, d) => c + d.salePrice * d.qty, 0),
          0
        )
        .toFixed(2);
    },
    totalSalesCost() {
      return this.sales
        .reduce(
          (a, b) =>
            a + b.products.reduce((c, d) => c + d.purchasePrice * d.qty, 0),
          0
        )
        .toFixed(2);
    },
  },
  methods: {
    subTotalRevenue(salesDetail) {
      if (salesDetail)
        return salesDetail.reduce((a, b) => a + b.salePrice * b.qty, 0);
      else return "S/.0";
    },
    subTotalCost(salesDetail) {
      if (salesDetail)
        return salesDetail.reduce((a, b) => a + b.purchasePrice * b.qty, 0);
      else return "S/.0";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>