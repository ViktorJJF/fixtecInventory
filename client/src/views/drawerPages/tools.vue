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
          :items="filteredTools"
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
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">Agregar inversión</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <v-icon color="primary" class="mr-1">mdi-update</v-icon>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-container fluid class="pa-5">
                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <span class="font-weight-bold">Fecha:</span>
                            <v-text-field
                              outlined
                              dense
                              hide-details
                              v-model="date"
                              prepend-icon="event"
                              type="date"
                              class="date-width"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <span class="font-weight-bold">Nombre</span>
                            <v-text-field
                              dense
                              hide-details
                              outlined
                              v-model="editedItem.name"
                              placeholder="Nombre de la inversión"
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
                              v-model="editedItem.toolsTypeId"
                              :items="toolsTypes"
                              item-value="_id"
                              outlined
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <span class="font-weight-bold">Cantidad</span>
                            <v-text-field
                              suffix="unidades"
                              dense
                              hide-details
                              outlined
                              v-model="editedItem.stock"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <span class="font-weight-bold">Costo</span>
                            <v-text-field
                              prefix="S/."
                              dense
                              hide-details
                              outlined
                              v-model="editedItem.purchasePrice"
                              type="number"
                            ></v-text-field>
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
                        </v-row>
                      </v-container>
                      <v-card-actions rd-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn outlined color="error" text @click="close">Cancelar</v-btn>
                        <v-btn :loading="loadingButton" color="success" @click="save">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
                    :items="toolsTypes"
                    item-text="name"
                    item-value="_id"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <span class="font-weight-bold">Total de inversión:</span>
                  <h1>S/{{totalInvestment}}</h1>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.date="{item}">{{item.date | formatDate}}</template>
          <template
            v-slot:item.toolsTypeId="{ item }"
          >{{item.toolsTypeId?item.toolsTypeId.name:'Sin tipo'}}</template>
          <template v-slot:item.action="{ item }">
            <v-btn class="mr-3" small color="secondary" @click="editItem(item)">Editar</v-btn>
            <v-btn small color="error" @click="deleteItem(item)">Eliminar</v-btn>
          </template>
          <template v-slot:no-data>
            <v-alert type="error" :value="true">Aún no cuentas con inversiones</v-alert>
          </template>
          <!-- <template v-slot:item.createdAt="{ item }">{{item.createdAt | formatDate}}</template>
          <template v-slot:item.status="{item}">
            <v-chip v-if="item.status" color="success">Activo</v-chip>
            <v-chip v-else color="error">Inactivo</v-chip>
          </template>-->
        </v-data-table>
        <v-col cols="12" sm="12">
          <span>
            <strong>Mostrando:</strong>
            {{$store.state.itemsPerPage>tools.length?tools.length:$store.state.itemsPerPage}} de {{tools.length}} registros
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
import { format, formatISO } from "date-fns";
import Tools from "../../classes/Tools";
export default {
  components: {},
  filters: {
    formatDate: function (value) {
      if (!value) return "Sin fecha";
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  data: () => ({
    date: formatISO(new Date(), { representation: "date" }),
    page: 1,
    pageCount: 0,
    selectedType: null,
    loadingButton: false,
    validateError: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "Fecha",
        align: "left",
        sortable: false,
        value: "date",
      },
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
        value: "stock",
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
        value: "toolsTypeId",
      },
      {
        text: "Descripción",
        align: "left",
        sortable: true,
        value: "description",
      },
      { text: "Acciones", value: "action", sortable: false },
    ],
    tools: [],
    toolsTypes: [],
    editedIndex: -1,
    editedItem: Tools(),
    defaultItem: Tools(),
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva inversión" : "Editar inversión";
    },
    filteredTools() {
      return this.selectedType
        ? this.tools.filter((tool) =>
            tool.toolsTypeId ? tool.toolsTypeId._id === this.selectedType : null
          )
        : this.tools;
    },
    totalInvestment() {
      return this.filteredTools
        .reduce((a, b) => a + b.purchasePrice * b.stock, 0)
        .toFixed(2);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async mounted() {
    this.$store.dispatch("loadingModule/showLoading");
    await this.initialize();
    this.$store.dispatch("loadingModule/showLoading", false);
  },

  methods: {
    async initialize() {
      await this.$store.dispatch("toolsModule/list");
      await this.$store.dispatch("toolsTypesModule/list");
      this.tools = this.$deepCopy(this.$store.state.toolsModule.tools);
      this.toolsTypes = this.$deepCopy(
        this.$store.state.toolsTypesModule.toolsTypes
      );
    },
    editItem(item) {
      this.editedIndex = this.tools.indexOf(item);
      //format date
      if (item.date)
        this.date = formatISO(new Date(item.date), { representation: "date" });
      else this.date = null;
      //assign edited item
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.tools.indexOf(item);
      let itemId = this.tools[index]._id;
      if (await this.$confirm("¿Realmente deseas eliminar este registro?")) {
        await this.$store.dispatch("toolsModule/delete", itemId);
        this.tools.splice(index, 1);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.date = formatISO(new Date(), { representation: "date" });
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      //fix date
      this.editedItem.date = new Date(this.date);
      this.editedItem.date = new Date(
        this.editedItem.date.getTime() -
          this.editedItem.date.getTimezoneOffset() * -60000
      );
      //begin
      this.loadingButton = true;
      if (this.editedIndex > -1) {
        let itemId = this.tools[this.editedIndex]._id;
        try {
          let updatedItem = await this.$store.dispatch("toolsModule/update", {
            id: itemId,
            data: this.editedItem,
          });
          Object.assign(this.tools[this.editedIndex], updatedItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
      } else {
        //create item
        try {
          let newItem = await this.$store.dispatch(
            "toolsModule/create",
            this.editedItem
          );
          this.tools.push(newItem);
          this.close();
        } finally {
          this.loadingButton = false;
        }
      }
    },
    showAllTypes() {
      this.selectedType = null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>