<template>
  <custom-card title="Consulta de servicios" icon="mdi-magnify">
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
            Listado de servicios
            <v-icon>mdi-format-list-checks</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Agregar servicio
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'tab-' + 1">
            <services :key="rerenderComponent"></services>
          </v-tab-item>
          <v-tab-item :value="'tab-' + 2">
            <v-card flat>
              <add-service></add-service>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </custom-card>
</template>

<script>
import services from "./services";
import addService from "./addService";
export default {
  components: {
    services,
    addService,
  },

  data: () => ({
    tab: null,
    rerenderComponent: 0,
  }),
  methods: {
    checkTab(tab) {
      if (tab === "tab-1") this.rerenderComponent += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>