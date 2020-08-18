<template>
  <v-navigation-drawer color="#040505" dark v-model="drawer" app width="260">
    <v-list>
      <v-list-item>
        <v-img aspect-ratio="1.7" contain src="/images/logo/fixtec.png"></v-img>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{user}}</v-list-item-title>
          <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>-->
      </v-list-item>
      <div class="text-center">
        <v-btn color="secondary" small :to="{name:'userProfile'}">Editar perfil</v-btn>
      </div>
    </v-list>

    <v-divider class="mx-3 mb-3"></v-divider>
    <v-list nav flat>
      <template v-for="(item, i) in items">
        <v-list-item active-class="primary" :key="i" :to="{name:item.to}">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-group
        color="white"
        v-for="item in expansionItems"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          active-class="primary"
          :to="{name:subItem.to}"
          v-for="subItem in item.items"
          :key="subItem.title"
        >
          <v-list-item-icon>
            <v-icon>{{ subItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider class="mx-3 mb-3"></v-divider>
      <v-list-item active-class="primary" :to="{name:'tools'}">
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Inversiones</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-chart-bar",
          text: "Estadísticas",
          to: "statistics",
        },
        {
          icon: "mdi-format-list-checks",
          text: "Inventario",
          to: "listProduct",
        },
        {
          icon: "mdi-format-list-checks",
          text: "Servicios",
          to: "services",
        },

        // {
        //   icon: "mdi-format-list-bulleted",
        //   text: "Calidades",
        //   to: "qualities",
        // },
        // { icon: "mdi-format-list-bulleted", text: "Tipos", to: "type" },
        // { icon: "mdi-cellphone-dock", text: "Marcas", to: "brand" },
        // { icon: "mdi-format-color-fill", text: "Colores", to: "colors" },
      ],
      expansionItems: [
        {
          icon: "mdi-chart-bar",
          title: "Reportes",
          items: [
            {
              icon: "mdi-bookmark-plus-outline",
              title: "Reporte de ventas",
              to: "ReportSales",
            },
            {
              icon: "mdi-bookmark-plus-outline",
              title: "Reporte de compras",
              to: "ReportPurchases",
            },
            // {
            //   icon: "mdi-bookmark-plus-outline",
            //   title: "Ganancia diaria",
            //   to: "reportDailyRevenue",
            // },
            // {
            //   icon: "mdi-format-list-checks",
            //   title: "Ganancia por producto",
            //   to: "reportRevenuePerProduct",
            // },
          ],
        },
        {
          icon: "mdi-chart-line",
          title: "Ventas",
          items: [
            {
              icon: "mdi-bookmark-plus-outline",
              title: "Agregar venta",
              to: "addSale",
            },
            {
              icon: "mdi-format-list-checks",
              title: "Historial de ventas",
              to: "salesHistory",
            },
          ],
        },
        {
          icon: "mdi-store",
          title: "Compras",
          items: [
            {
              icon: "mdi-bookmark-plus-outline",
              title: "Agregar compra",
              to: "addPurchase",
            },
            {
              icon: "mdi-format-list-checks",
              title: "Historial de compras",
              to: "historyPurchase",
            },
          ],
        },
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.toolbar.drawerIcon;
      },
      set(newValue) {
        this.$store.state.toolbar.drawerIcon = newValue;
      },
    },
    user() {
      return this.$store.getters["authModule/getFullNameUser"];
    },
    email() {
      return this.$store.state.authModule.user.email;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>