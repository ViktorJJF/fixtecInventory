<template>
  <v-container class="container-width pa-5">
    <h1 class="mb-3">
      Total de compras:
      <span class>S/.{{totalPurchases | formatMoney}}</span>
    </h1>
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
                <span>Vendedor</span>
              </th>
              <th class="text-center">
                <span>Productos</span>
              </th>
              <th class="text-center">
                <span>Total de compra</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in purchases" :key="item.name">
              <td class="text-center">
                <b>{{ item.commerce }}</b>
              </td>
              <td class="text-center">{{ item.date | formatDate }}</td>
              <td class="text-center">{{ item.userId.email }}</td>
              <td class="text-center">
                <ul>
                  <li
                    v-for="productDetail in item.products"
                    :key="productDetail._id"
                  >{{productDetail.productId?productDetail.productId.name:'Producto eliminado'}} ({{productDetail.qty}} x S/.{{productDetail.purchasePrice}})</li>
                </ul>
              </td>
              <td class="text-center">S/.{{totalRevenue(item.products)}}</td>
            </tr>
            <tr>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center">
                <b>Total de Compras:</b>
                <span class>S/.{{totalPurchases}}</span>
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
    this.$store.getters["purchasesModule/purchasesWithProductsPopulated"];
    this.$store.dispatch("loadingModule/showLoading");
    await this.$store.dispatch("purchasesModule/listWithProducts", {
      page: 1,
      limit: 9999,
    });
    this.$store.dispatch("loadingModule/showLoading", false);
  },
  computed: {
    purchases() {
      return this.$store.state.purchasesModule.purchases;
    },
    totalPurchases() {
      return this.purchases
        .reduce(
          (a, b) =>
            a + b.products.reduce((c, d) => c + d.purchasePrice * d.qty, 0),
          0
        )
        .toFixed(2);
    },
  },
  methods: {
    totalRevenue(purchasesDetail) {
      if (purchasesDetail)
        return purchasesDetail
          .reduce((a, b) => a + b.purchasePrice * b.qty, 0)
          .toFixed(2);
      else return "S/.0";
    },
  },
};
</script>

<style lang="scss" scoped>
.container-width {
  width: 1500px;
}
</style>