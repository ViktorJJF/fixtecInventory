<template>
  <v-container>
    <v-row justify="center">
      <material-card
        width="1500px"
        icon="mdi-cellphone-dock"
        color="primary"
        title="Inversiones"
        text="Tabla resumen de inversiones propias"
      >
        <v-data-table
          no-results-text="No se encontraron resultados"
          :search="search"
          hide-default-footer
          :headers="headers"
          :items="tools"
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
                    placeholder="Escribe el nombre de la inversión"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">Agregar inversión</v-btn>
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
                          >Es necesario colocar el nombre del tipo</v-alert>
                          <v-row dense>
                            <v-col cols="12" sm="12" md="12">
                              <p class="body-1 font-weight-bold">Nombre</p>
                              <VTextFieldWithValidation
                                rules="required"
                                v-model="editedItem.name"
                                label="Nombre del tipo"
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
            <v-alert type="error" :value="true">Aún no cuentas con tipos de productos</v-alert>
          </template>
          <!-- <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
          <template v-slot:item.status="{item}">
            <v-chip v-if="item.status" color="success">Activo</v-chip>
            <v-chip v-else color="error">Inactivo</v-chip>
          </template>-->
        </v-data-table>
        <v-col cols="12" sm="12">
          <!-- <span>
            <strong>Mostrando:</strong>
            {{$store.state.itemsPerPage>types.length?types.length:$store.state.itemsPerPage}} de {{types.length}} registros
          </span>-->
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
import TypeProduct from "../../classes/TypeProduct";
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
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "name",
      },
      {
        text: "Cantidad",
        align: "left",
        sortable: true,
        value: "qty",
      },
      {
        text: "Costo",
        align: "left",
        sortable: true,
        value: "purchasePrice",
      },
      {
        text: "Tipo",
        align: "left",
        sortable: true,
        value: "type",
      },
      {
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "description",
      },
      { text: "Acciones", value: "action", sortable: false },
    ],
    tools: [
      {
        _id: 1,
        name: "Caja de desbloqueo",
        qty: 10,
        purchasePrice: "S/.750",
        type: "Herramienta de trabajo",
        description: "Me los vendieron muy caro",
      },
      {
        _id: 2,
        name: "Dr Fone",
        qty: 1,
        purchasePrice: "400",
        type: "Software",
        description: "Tengo que pagar la licencia el siguiente mes",
      },
      {
        _id: 3,
        name: "Dr Fone v2",
        qty: 1,
        purchasePrice: "400",
        type: "Software",
        description: "Tengo que pagar la licencia el siguiente mes",
      },
    ],
    editedIndex: -1,
    editedItem: TypeProduct(),
    defaultItem: TypeProduct(),
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo tipo" : "Editar tipo";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    // this.initialize();
  },

  methods: {
    initialize() {
      this.types = this.$deepCopy(this.$store.state.typesModule.types);
    },
    editItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.types.indexOf(item);
      let itemId = this.types[index]._id;
      if (await this.$confirm("¿Realmente deseas eliminar este registro?")) {
        await this.$store.dispatch("typesModule/delete", itemId);
        this.types.splice(index, 1);
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
        let itemId = this.types[this.editedIndex]._id;
        try {
          await this.$store.dispatch("typesModule/update", {
            id: itemId,
            data: this.editedItem,
          });
          Object.assign(this.types[this.editedIndex], this.editedItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
      } else {
        //create item
        try {
          let newItem = await this.$store.dispatch(
            "typesModule/create",
            this.editedItem
          );
          this.types.push(newItem);
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