<template>
  <custom-card title="Consulta de inventario" icon="mdi-magnify">
    <template v-slot:content>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          centered
          dark
          icons-and-text
          @change="checkTab"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Listado de productos
            <v-icon>mdi-format-list-checks</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Agregar producto (modelo)
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'tab-' + 1">
            <v-card flat>
              <products :key="rerenderComponent"></products>
            </v-card>
          </v-tab-item>
          <v-tab-item :value="'tab-' + 2">
            <v-card flat>
              <add-product></add-product>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </custom-card>
</template>

<script>
import products from "./products";
import addProduct from "./addProduct";
export default {
  components: {
    products,
    addProduct,
  },
  data() {
    return {
      tab: null,
      rerenderComponent: 0,
    };
  },
  methods: {
    checkTab(tab) {
      if (tab === "tab-1") this.rerenderComponent++;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>