<template>
  <v-container class="container-width">
    <h1 class="mb-3">
      Ventas de hoy:
      <span class="ganancia">S/.560</span>
    </h1>
    <h1 class="mb-3">
      Ganancias de hoy:
      <span class="ganancia">S/.340</span>
    </h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              <span>Tipo</span>
            </th>
            <th class="text-center">
              <span>Nombre</span>
            </th>
            <th class="text-center">
              <span>Cantidad</span>
            </th>
            <th class="text-center">
              <span>Precio de compra</span>
            </th>
            <th class="text-center">
              <span>Precio de venta</span>
            </th>
            <th class="text-center">
              <span>Ganancia</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sales" :key="item.name">
            <td class="text-center">
              <b>{{ item.type=="SERVICE"?"Servicio":"Producto" }}</b>
            </td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-center">S/.{{ item.purchasePrice }}</td>
            <td class="text-center">S/.{{ item.salePrice }}</td>
            <td class="text-center">
              <span
                :class="item.salePrice>item.purchasePrice?'ganancia':'perdida'"
              >S/.{{ item.salePrice-item.purchasePrice}}</span>
            </td>
          </tr>
          <tr>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center"></td>
            <td class="text-center">
              <b>Total de Ventas:</b>
              <span class="ganancia">S/.310</span>
            </td>
            <td class="text-center">
              <b>Total Ganancias:</b>
              <span class="ganancia">S/.248</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      sales: [
        {
          name: "Producto 1",
          qty: 1,
          purchasePrice: 40,
          salePrice: 80,
          type: "PRODUCT",
        },
        {
          name: "Producto 2",
          qty: 1,
          purchasePrice: 50,
          salePrice: 30,
          type: "SERVICE",
        },
        {
          name: "Producto 3",
          qty: 1,
          purchasePrice: 0,
          salePrice: 60,
          type: "SERVICE",
        },
        {
          name: "Producto 1",
          qty: 1,
          purchasePrice: 40,
          salePrice: 80,
          type: "PRODUCT",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
th {
  span {
    color: black;
    font-size: 1.4em;
  }
}
.container-width {
  width: 1500px;
}
</style>