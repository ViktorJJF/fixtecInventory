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
            Listado de serviceos
            <v-icon>mdi-format-list-checks</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Agregar servicio
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'tab-' + 1">
            <v-card flat>
              <v-data-table
                no-results-text="No se encontraron resultados"
                :search="search"
                hide-default-footer
                :headers="headers"
                :items="filteredServices"
                @page-count="pageCount = $event"
                :page.sync="page"
                :items-per-page="$store.state.itemsPerPage"
              >
                <template v-slot:top>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <span class="font-weight-bold">Filtrar por modelo: {{search}}</span>
                        <v-text-field
                          dense
                          hide-details
                          v-model="search"
                          append-icon="search"
                          placeholder="Escribe el nombre del servicio"
                          single-line
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <span class="font-weight-bold">Filtrar por tipo:</span>
                        <v-select
                          clearable
                          @click:clear="showAllTypes()"
                          hide-details
                          dense
                          placeholder="Selecciona un tipo"
                          v-model="selectedType"
                          :items="types"
                          item-text="name"
                          item-value="_id"
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-divider class="mx-4" inset vertical></v-divider>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn class="mr-3 mb-2" small color="secondary" @click="editItem(item)">Editar</v-btn>
                  <v-btn class="mb-2" small color="error" @click="deleteItem(item)">Eliminar</v-btn>
                </template>
                <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
                <template v-slot:item.typeId="{ item }">S/.{{item.typeId.name}}</template>
                <template v-slot:item.price="{ item }">S/.{{item.price}}</template>
                <template v-slot:no-data>
                  <v-alert type="error" :value="true">No se encontraron datos</v-alert>
                </template>
              </v-data-table>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
              <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-container class="pa-5">
                    <v-alert
                      text
                      type="error"
                      :value="validateError"
                    >Es necesario colocar el nombre del modelo</v-alert>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <span class="font-weight-bold">Nombre</span>
                        <v-text-field
                          dense
                          hide-details
                          outlined
                          v-model="editedItem.name"
                          placeholder="Nombre del modelo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <span class="font-weight-bold">Tipo</span>
                        <v-select
                          dense
                          hide-details
                          v-model="editedItem.typeId"
                          :items="types"
                          item-text="name"
                          item-value="_id"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <span class="font-weight-bold">Precio del servicio</span>
                        <v-text-field
                          prefix="S/."
                          dense
                          hide-details
                          outlined
                          v-model="editedItem.price"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <span class="font-weight-bold">Descripción</span>
                        <v-textarea
                          dense
                          hide-details
                          placeholder="Ingresa una descripción"
                          outlined
                          v-model="editedItem.description"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn outlined color="error" text @click="close">Cancelar</v-btn>
                    <v-btn :loading="loadingButton" color="success" @click="save">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
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
import addService from "./addService";
import { format } from "date-fns";
import Service from "../../classes/Service";
export default {
  components: {
    addService,
  },
  filters: {
    formatDate: function (value) {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    loadingButton: false,
    qualitiesLoading: false,
    validateError: false,
    tab: null,
    search: "",
    dialog: false,
    selectedType: null,
    selectedBrand: null,
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Tipo", value: "typeId", filterable: false },
      { text: "Precio del servicio", value: "price", filterable: false },
      {
        text: "Agregado",
        align: "left",
        sortable: true,
        value: "createdAt",
      },
      { text: "Acciones", value: "action", sortable: false },
    ],
    services: [],
    editedIndex: -1,
    editedItem: Service(),
    defaultItem: Service(),
  }),

  computed: {
    formTitle() {
      return "Editar Servicio";
    },
    types() {
      return this.$store.state.typesModule.types;
    },
    filteredServices() {
      return this.selectedType || this.selectedBrand
        ? this.services.filter(
            (service) =>
              (this.selectedType
                ? service.typeId._id === this.selectedType
                : true) &&
              (this.selectedBrand
                ? service.brandId._id === this.selectedBrand
                : true)
          )
        : this.services;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    async initialize() {
      this.services = this.$deepCopy(this.$store.state.servicesModule.services);
    },
    showAllTypes() {
      this.selectedType = null;
    },
    showAllBrands() {
      this.selectedBrand = null;
    },
    editItem(item) {
      this.editedIndex = this.services.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.services.indexOf(item);
      let itemId = this.services[index]._id;
      if (await this.$confirm("¿Realmente deseas eliminar este registro?")) {
        await this.$store.dispatch("servicesModule/delete", itemId);
        this.services.splice(index, 1);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    validateForm() {
      if (!this.editedItem.model) {
        this.validateError = true;
        return false;
      }
      this.validateError = false;
      return true;
    },
    async save() {
      //update item
      this.loadingButton = true;
      if (this.editedIndex > -1) {
        let itemId = this.services[this.editedIndex]._id;
        try {
          let updatedItem = await this.$store.dispatch(
            "servicesModule/update",
            {
              id: itemId,
              data: this.editedItem,
            }
          );
          Object.assign(this.services[this.editedIndex], updatedItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
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
    checkTab(tab) {
      if (tab === "tab-1") this.initialize();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>