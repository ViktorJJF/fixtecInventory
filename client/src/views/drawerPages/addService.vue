<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Nombre</span>
        <v-text-field
          dense
          hide-details
          outlined
          v-model="newService.name"
          placeholder="Nombre del servicio"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Tipo</span>
        <v-select
          placeholder="Selecciona un Tipo"
          item-text="name"
          item-valur="_id"
          dense
          hide-details
          v-model="newService.typeId"
          :items="types"
          item-value="_id"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <span class="font-weight-bold">Precio promedio del servicio</span>
        <v-text-field
          prefix="S/."
          dense
          hide-details
          outlined
          v-model="newService.price"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <span class="font-weight-bold">Descripción</span>
        <v-textarea
          hide-details
          placeholder="Ingresa una descripción"
          outlined
          v-model="newService.description"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-btn :loading="loadingButton" color="success" @click="saveService(newService)">Guardar cambios</v-btn>
  </v-container>
</template>

<script>
import Service from "../../classes/Service";
export default {
  data() {
    return {
      qualitiesLoading: false,
      loadingButton: false,
      newService: Service(),
    };
  },
  mounted() {},
  computed: {
    types() {
      return this.$store.state.typesModule.types;
    },
  },
  methods: {
    async saveService() {
      //create new service
      this.loadingButton = true;
      try {
        await this.$store.dispatch("servicesModule/create", this.newService);
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
      this.newService = Service();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>