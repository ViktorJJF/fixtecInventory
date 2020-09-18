<template>
  <v-container class="container-width pa-5">
    <ul>
      <li>
        <h2 class="mb-3">
          Total de Ventas de Servicios:
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
      <v-col cols="12" sm="12">
        <strong>Cantidad de ventas de servicios:</strong>
        {{$store.state.salesServicesModule.salesServices.length}}
      </v-col>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
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
                <span>Servicios</span>
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
            <tr v-for="item in paginatedSalesServices" :key="item.name">
              <!-- <td>{{item}}</td> -->
              <td class="text-center">
                <b>{{ item.commerce }}</b>
              </td>
              <td class="text-center">{{ item.date | formatDate }}</td>
              <td class="text-center">
                <div>
                  <div
                    v-for="serviceDetail in item.services"
                    :key="serviceDetail._id"
                  >- {{serviceDetail.serviceId?serviceDetail.serviceId.name:'servicio eliminado'}} (Venta: S/.{{serviceDetail.salePrice}})</div>
                </div>
              </td>
              <td class="text-center">
                <div v-for="service in item.services" :key="service._id">
                  <div
                    v-for="product in service.cost.products"
                    :key="product._id"
                  >- {{ product.name }} (Costo: {{product.purchasePrice}})</div>
                </div>
                <b>Total:</b>
                S/.{{subTotalCost(item.services) | formatMoney}}
              </td>
              <td class="text-center">S/.{{subTotalRevenue(item.services) | formatMoney}}</td>
              <td
                class="text-center"
              >S/.{{(subTotalRevenue(item.services)-subTotalCost(item.services)) | formatMoney}}</td>
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
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
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
    return {
      page: 1,
    };
  },
  async mounted() {
    this.$store.dispatch("loadingModule/showLoading");
    await this.$store.dispatch("salesServicesModule/list");
    this.$store.dispatch("loadingModule/showLoading", false);
  },
  computed: {
    pageCount() {
      return Math.ceil(
        this.salesServices.length / this.$store.state.itemsPerPage
      );
    },
    salesServices() {
      return this.$store.state.salesServicesModule.salesServices;
    },
    paginatedSalesServices() {
      return this.salesServices.slice(
        (this.page - 1) * this.$store.state.itemsPerPage,
        this.page * this.$store.state.itemsPerPage
      );
    },
    totalSales() {
      return this.salesServices
        .reduce(
          (a, b) => a + b.services.reduce((c, d) => c + d.salePrice, 0),
          0
        )
        .toFixed(2);
    },
    totalSalesCost() {
      return this.salesServices
        .reduce(
          (a, b) => a + b.services.reduce((c, d) => c + d.cost.value, 0),
          0
        )
        .toFixed(2);
    },
  },
  methods: {
    subTotalRevenue(salesServicesDetail) {
      if (salesServicesDetail)
        return salesServicesDetail.reduce((a, b) => a + b.salePrice, 0);
      else return "S/.0";
    },
    subTotalCost(salesServicesDetail) {
      if (salesServicesDetail)
        return salesServicesDetail.reduce((a, b) => a + b.cost.value, 0);
      else return "S/.0";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>