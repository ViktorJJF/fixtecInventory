<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="7">
        <span class="font-weight-bold">Nombre</span>
        <v-text-field
          dense
          hide-details
          outlined
          v-model="newProduct.name"
          placeholder="Nombre del producto"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5">
        <span class="font-weight-bold">Negocio</span>
        <v-select
          v-model="newProduct.commerce"
          :items="commerce"
          label="Selecciona el negocio"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Tipo</span>
        <v-select
          placeholder="Selecciona un Tipo"
          item-text="name"
          item-valur="_id"
          dense
          hide-details
          v-model="newProduct.typeId"
          :items="types"
          item-value="_id"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Marca</span>
        <v-select
          placeholder="Selecciona una Marca"
          item-text="name"
          dense
          hide-details
          v-model="newProduct.brandId"
          :items="brands"
          item-value="_id"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Color</span>
        <v-select
          dense
          hide-details
          v-model="newProduct.colorId"
          placeholder="Selecciona un color"
          item-text="name"
          item-value="_id"
          :items="colors"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Calidad</span>
        <v-select
          dense
          hide-details
          v-model="newProduct.qualityId"
          placeholder="Selecciona una calidad"
          item-text="name"
          item-value="_id"
          :items="qualities"
          :loading="qualitiesLoading"
          @click="getQualities"
          outlined
        >
          <template v-slot:no-data>
            <v-container fluid class="text-center" v-if="qualitiesLoading">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-container>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Género</span>
        <v-select
          dense
          hide-details
          v-model="newProduct.gender"
          placeholder="Selecciona un género"
          item-text="name"
          item-value="value"
          :items="genders"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Stock</span>
        <v-text-field
          suffix="unidades"
          dense
          hide-details
          outlined
          v-model="newProduct.stock"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Stock Mínimo</span>
        <v-text-field
          suffix="unidades"
          dense
          hide-details
          outlined
          v-model="newProduct.minStock"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Precio Compra</span>
        <v-text-field
          prefix="S/."
          dense
          hide-details
          outlined
          v-model="newProduct.purchasePrice"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Precio Venta</span>
        <v-text-field
          prefix="S/."
          dense
          hide-details
          outlined
          v-model="newProduct.price"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <span class="font-weight-bold">Descripción</span>
        <v-textarea
          hide-details
          placeholder="Ingresa una descripción"
          outlined
          v-model="newProduct.description"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-btn :loading="loadingButton" color="success" @click="saveProduct(newProduct)">Guardar cambios</v-btn>
  </v-container>
</template>

<script>
import Product from "../../classes/Product";
export default {
  data() {
    return {
      genders: [
        { id: 1, name: "Masculino", value: "M" },
        { id: 2, name: "Femenino", value: "F" },
      ],
      qualitiesLoading: false,
      loadingButton: false,
      newProduct: Product(),
    };
  },
  mounted() {},
  computed: {
    brands() {
      return this.$store.state.brandsModule.brands;
    },
    types() {
      return this.$store.state.typesModule.types;
    },
    colors() {
      return this.$store.state.colorsModule.colors;
    },
    qualities() {
      return this.$store.state.qualitiesModule.qualities;
    },
    commerce() {
      return this.$store.state.commerce;
    },
  },
  methods: {
    async saveProduct() {
      //create new product
      this.loadingButton = true;
      try {
        await this.$store.dispatch("productsModule/create", this.newProduct);
        this.clear();
      } finally {
        this.loadingButton = false;
      }
    },
    async getQualities() {
      if (this.qualities.length === 0) {
        this.qualitiesLoading = true;
        try {
          await this.$store.dispatch("qualitiesModule/list");
        } finally {
          this.qualitiesLoading = false;
        }
      }
    },
    clear() {
      this.newProduct = Product();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>