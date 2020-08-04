<template>
  <v-container class="container-width">
    <h1>
      Productos -
      <span class="ganancia">S/.5832</span>
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
              <span>Cantidad vendidos</span>
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
            <td class="text-center">
              <span class="ganancia">S/.{{ item.total }}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <h1>
      Servicios -
      <span class="perdida">-S/.432</span>
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
              <span>Cantidad vendidos</span>
            </th>
            <th class="text-center">
              <span>Ganancia</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sales2" :key="item.name">
            <td class="text-center">
              <b>Servicio</b>
            </td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-center">
              <span class="ganancia">S/.{{ item.total }}</span>
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
          name: "Producto 2",
          qty: 125,
          total: 1580,
          type: "PRODUCT",
        },
        {
          name: "Producto 3",
          qty: 234,
          total: 2280,
          type: "PRODUCT",
        },
        {
          name: "Producto 4",
          qty: 315,
          total: 1480,
          type: "PRODUCT",
        },
        {
          name: "Producto 5",
          qty: 422,
          total: 2580,
          type: "PRODUCT",
        },
      ],
      sales2: [
        {
          name: "Cambio de pantalla",
          qty: 125,
          total: 1580,
          type: "PRODUCT",
        },
        {
          name: "Cambio de zócalo",
          qty: 234,
          total: 2280,
          type: "PRODUCT",
        },
        {
          name: "Reparaciones",
          qty: 315,
          total: 1480,
          type: "PRODUCT",
        },
        {
          name: "Otros",
          qty: 422,
          total: 2580,
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