<template>
  <v-container>
    <v-row justify="center">
      <material-card
        width="700px"
        icon="mdi-cellphone-dock"
        color="primary"
        title="Marca de producto"
        text="Tabla resumen de marcas de productos"
      >
        <v-data-table
          no-results-text="No se encontraron resultados"
          :search="search"
          hide-default-footer
          :headers="headers"
          :items="brands"
          sort-by="calories"
          @page-count="pageCount = $event"
          :page.sync="page"
          :items-per-page="$store.state.itemsPerPage"
        >
          <template v-slot:top>
            <v-container>
              <span class="font-weight-bold">Filtrar por nombre: {{search}}</span>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    hide-details
                    v-model="search"
                    append-icon="search"
                    placeholder="Escribe el nombre de la marca"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">Agregar Marca</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <v-icon color="primary" class="mr-1">mdi-update</v-icon>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <ValidationObserver ref="obs" v-slot="{ passes }">
                        <v-container class="pa-5">
                          <v-alert
                            text
                            type="error"
                            :value="validateError"
                          >Es necesario colocar el nombre de la marca</v-alert>
                          <v-row dense>
                            <v-col cols="12" sm="12" md="12">
                              <p class="body-1 font-weight-bold">Nombre</p>
                              <VTextFieldWithValidation
                                rules="required"
                                v-model="editedItem.name"
                                label="Nombre de la marca"
                              />
                            </v-col>
                            <v-col cols="12" sm="12">
                              <span class="font-weight-bold">Descripción</span>
                              <v-textarea
                                hide-details
                                placeholder="Ingresa una descripción"
                                outlined
                                v-model="editedItem.description"
                              ></v-textarea>
                            </v-col>
                            <!-- <v-col cols="12" sm="12" md="12">
                            <span class="font-weight-bold">Estado</span>
                            <v-select
                              hide-details
                              v-model="editedItem.status"
                              :items="[{name:'Activo',value:true},{name:'Inactivo',value:false}]"
                              item-text="name"
                              item-value="value"
                              outlined
                            ></v-select>
                            </v-col>-->
                          </v-row>
                        </v-container>
                        <v-card-actions rd-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn outlined color="error" text @click="close">Cancelar</v-btn>
                          <v-btn
                            :loading="loadingButton"
                            color="success"
                            @click="passes(save)"
                          >Guardar</v-btn>
                        </v-card-actions>
                      </ValidationObserver>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="mr-3" small color="secondary" @click="editItem(item)">Editar</v-btn>
            <v-btn small color="error" @click="deleteItem(item)">Eliminar</v-btn>
          </template>
          <template v-slot:no-data>
            <v-alert type="error" :value="true">Aún no cuentas con marcas de productos</v-alert>
          </template>
          <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
          <template v-slot:item.status="{item}">
            <v-chip v-if="item.status" color="success">Activo</v-chip>
            <v-chip v-else color="error">Inactivo</v-chip>
          </template>
        </v-data-table>
        <v-col cols="12" sm="12">
          <span>
            <strong>Mostrando:</strong>
            {{$store.state.itemsPerPage>brands.length?brands.length:$store.state.itemsPerPage}} de {{brands.length}} registros
          </span>
        </v-col>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </material-card>
    </v-row>
  </v-container>
</template>

<script>
import { format } from "date-fns";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import BrandProduct from "../../classes/BrandProduct";
export default {
  components: {
    VTextFieldWithValidation,
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
    validateError: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "Marca",
        align: "left",
        sortable: false,
        value: "name",
      },
      {
        text: "Agregado",
        align: "left",
        sortable: true,
        value: "createdAt",
      },
      { text: "Acciones", value: "action", sortable: false },
    ],
    brands: [],
    editedIndex: -1,
    editedItem: BrandProduct(),
    defaultItem: BrandProduct(),
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva marca" : "Editar marca";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.brands = this.$deepCopy(this.$store.state.brandsModule.brands);
    },
    editItem(item) {
      this.editedIndex = this.brands.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.brands.indexOf(item);
      let itemId = this.brands[index]._id;
      if (await this.$confirm("¿Realmente deseas eliminar este registro?")) {
        await this.$store.dispatch("brandsModule/delete", itemId);
        this.brands.splice(index, 1);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      this.loadingButton = true;
      if (this.editedIndex > -1) {
        let itemId = this.brands[this.editedIndex]._id;
        try {
          await this.$store.dispatch("brandsModule/update", {
            id: itemId,
            data: this.editedItem,
          });
          Object.assign(this.brands[this.editedIndex], this.editedItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
      } else {
        //create item
        try {
          let newItem = await this.$store.dispatch(
            "brandsModule/create",
            this.editedItem
          );
          this.brands.push(newItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>