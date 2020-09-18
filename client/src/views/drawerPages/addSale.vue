<template>
  <custom-card title="Realizar venta" icon="mdi-plus">
    <template v-slot:content>
      <v-container>
        <v-alert prominent type="error" v-show="historyMode">
          <v-col
            class="grow"
          >Aviso: Estás en el modo de ventas históricas, por lo que las ventas que registres no modificarán tu stock actual.</v-col>
        </v-alert>

        <v-row align="center" dense>
          <p class="body-1 font-weight-bold d-inline mx-3">Fecha:</p>
          <v-col cols="12" sm="12" md="3">
            <v-text-field
              outlined
              dense
              v-model="date"
              prepend-icon="event"
              type="date"
              class="date-width"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              v-model="selectedCommerce"
              :items="commerce"
              label="Selecciona el negocio"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <!-- <v-switch
            class="mb-5"
            v-model="historyMode"
            :label="'Modo histórico: '+(historyMode?'Activo':'Inactivo')"
          ></v-switch>-->
        </v-row>
        <v-dialog
          v-model="dialogServices"
          width="1200"
          v-if="selectedCommerce=='SOFTWARE' || selectedCommerce=='HARDWARE'"
        >
          <template v-slot:activator="{ on:dialogServices }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-on="{ ...tooltip, ...dialogServices }"
                  tile
                  color="primary"
                  class="my-3 mr-3"
                >
                  <v-icon left>search</v-icon>Agregar servicio
                </v-btn>
              </template>
              <span>Listado de servicios</span>
            </v-tooltip>
          </template>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Servicios</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <services @add-service="addService" :selectButton="true"></services>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">De acuerdo</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" width="1200" v-else>
          <template v-slot:activator="{ on:dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn v-on="{ ...tooltip, ...dialog }" tile color="primary" class="my-3 mr-3">
                  <v-icon left>search</v-icon>Agregar producto
                </v-btn>
              </template>
              <span>Inventario</span>
            </v-tooltip>
          </template>
          <v-card>
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Productos</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <products @add-product="addSale" :selectButton="true"></products>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">De acuerdo</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn outlined color="primary" :to="{name:'salesHistory'}">
          <v-icon left>mdi-format-list-checks</v-icon>Ver historial
        </v-btn>
        <!-- service table -->
        <v-simple-table v-if="selectedCommerce=='SOFTWARE' || selectedCommerce=='HARDWARE'">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <span>Tipo</span>
                </th>
                <th class="text-left">
                  <span>Servicio</span>
                </th>
                <th class="text-left">
                  <span>Costo</span>
                </th>
                <th class="text-left">
                  <span>Precio de servicio</span>
                </th>
                <th class="text-left">
                  <span>Datos del celular</span>
                </th>
                <th class="text-left">
                  <span>Descripción</span>
                </th>
                <!-- <th class="text-left">
                  <span>Descripción</span>
                </th>-->
                <th class="text-left">
                  <span>Eliminar servicio</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(service,salesServicesIndex) in salesServices"
                :key="'a'+salesServicesIndex"
              >
                <td>{{service.serviceDetails.typeId?service.serviceDetails.typeId.name:'Sin tipo'}}</td>
                <td>{{service.serviceDetails.name}}</td>
                <td>
                  <p class="perdida mb-0">S/. {{service.cost.value}}</p>
                  <v-btn
                    color="info"
                    dark
                    small
                    @click.stop="selectedSalesServicesIndex=salesServicesIndex;dialogServiceCost = true;"
                  >Detalle</v-btn>
                </td>
                <td>
                  <v-text-field
                    class="inputs-width"
                    prefix="S/."
                    v-model="service.salePrice"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <ul>
                    <li>
                      <v-text-field
                        class="inputs-width"
                        v-model="service.repairedItem.itemModel"
                        type="text"
                        hide-details
                        placeholder="Modelo"
                      ></v-text-field>
                    </li>
                    <li>
                      <v-text-field
                        class="inputs-width"
                        v-model="service.repairedItem.itemBrand"
                        type="text"
                        hide-details
                        placeholder="Marca"
                      ></v-text-field>
                    </li>
                    <li>
                      <v-text-field
                        class="inputs-width"
                        v-model="service.repairedItem.itemType"
                        type="text"
                        hide-details
                        placeholder="Tipo"
                      ></v-text-field>
                    </li>
                  </ul>
                </td>
                <td>
                  <v-textarea
                    class="mt-2"
                    outlined
                    placeholder="Descripción"
                    v-model="service.description"
                  ></v-textarea>
                </td>
                <td>
                  <v-btn small color="error" @click="deleteService(salesServicesIndex)">Eliminar</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!-- product table -->
        <v-simple-table v-else>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <span>Tipo</span>
                </th>
                <th class="text-left">
                  <span>Producto</span>
                </th>
                <th class="text-left">
                  <span>Marca</span>
                </th>
                <th class="text-left">
                  <span>Cantidad</span>
                </th>
                <th class="text-left">
                  <span>Precio de compra</span>
                </th>
                <th class="text-left">
                  <span>Precio de venta</span>
                </th>
                <!-- <th class="text-left">
                  <span>Descripción</span>
                </th>-->
                <th class="text-left">
                  <span>Subtotal</span>
                </th>
                <th class="text-left">
                  <span>Eliminar producto</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product,salesIndex) in sales" :key="'a'+salesIndex">
                <td>{{product.productDetails.typeId?product.productDetails.typeId.name:'Sin tipo'}}</td>
                <td>{{product.productDetails.name}}</td>
                <td>{{product.productDetails.brandId?product.productDetails.brandId.name:'Sin Marca'}}</td>
                <td>
                  <v-text-field
                    class="inputs-width"
                    suffix="unidades"
                    v-model="product.qty"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <v-btn
                    color="error"
                    outlined
                    small
                    v-if="!editPurchasePrice"
                    @click="editPurchasePrice=true;"
                  >Editar</v-btn>
                  <v-text-field
                    v-else
                    class="inputs-width"
                    prefix="S/."
                    v-model="product.purchasePrice"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    class="inputs-width"
                    prefix="S/."
                    v-model="product.salePrice"
                    type="number"
                  ></v-text-field>
                </td>
                <td>S/.{{(product.salePrice*product.qty).toFixed(2)}}</td>
                <td>
                  <v-btn small color="error" @click="deleteSale(salesIndex)">Eliminar</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert
          v-if="selectedCommerce=='SOFTWARE' || selectedCommerce=='HARDWARE'"
          class="my-5"
          v-show="salesServices.length==0"
          type="warning"
          text
        >Aún no agregaste servicios a esta venta</v-alert>
        <v-alert
          v-else
          class="my-5"
          v-show="sales.length==0"
          type="warning"
          text
        >Aún no agregaste productos a esta venta</v-alert>
        <v-row justify="end" class="mr-3 mb-3">
          <v-card dark outlined color="info" class="pa-3">
            <strong class="text--white">Total:</strong>
            &nbsp;
            <span class="total">S/.{{getTotal}}</span>
          </v-card>
        </v-row>
        <v-btn
          v-if="selectedCommerce=='SOFTWARE' || selectedCommerce=='HARDWARE'"
          :loading="loadingButton"
          color="success"
          @click="saveSaleService(salesServices,date,selectedCommerce)"
        >Terminar venta de servicio</v-btn>
        <v-btn
          v-else
          :loading="loadingButton"
          color="success"
          @click="saveSale(sales,date,selectedCommerce)"
        >Terminar venta</v-btn>
      </v-container>
      <!-- cost details -->
      <v-dialog v-model="dialogServiceCost" width="500" v-if="selectedSalesServicesIndex!==null">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Detalles del costo del servicio</v-toolbar-title>
          </v-toolbar>
          <v-container class="pa-3">
            <v-row>
              <v-col cols="12" sm="12">
                <span class="body-1 font-weight-bold">Costo (productos)</span>
                <v-dialog v-model="dialogCostProduct" width="1200">
                  <template v-slot:activator="{ on:dialogCostProduct }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          v-on="{ ...tooltip, ...dialogCostProduct }"
                          color="primary"
                          small
                          class="ml-3"
                        >
                          <v-icon left>search</v-icon>Agregar
                        </v-btn>
                      </template>
                      <span>Listado de productos</span>
                    </v-tooltip>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark>
                      <v-toolbar-title>Productos</v-toolbar-title>
                    </v-toolbar>
                    <v-container>
                      <products @add-product="addServiceCost" :selectButton="true"></products>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialogCostProduct = false">De acuerdo</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-simple-table class="custom-table mt-3">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <span>Tipo</span>
                        </th>
                        <th class="text-left">
                          <span>Producto</span>
                        </th>
                        <th class="text-left">
                          <span>Marca</span>
                        </th>
                        <th class="text-left">
                          <span>Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(costProductId,costProductIndex) in salesServices[selectedSalesServicesIndex].cost.products"
                        :key="costProductIndex+costProductId"
                      >
                        <td>{{($store.getters["productsModule/productById"](costProductId)).typeId?($store.getters["productsModule/productById"](costProductId)).typeId.name:"Sin tipo"}}</td>
                        <td>{{($store.getters["productsModule/productById"](costProductId)).name}}</td>
                        <td>{{($store.getters["productsModule/productById"](costProductId)).brandId?($store.getters["productsModule/productById"](costProductId)).brandId.name:"Sin marca"}}</td>
                        <td>
                          <v-btn
                            color="error"
                            x-small
                            @click="deleteCostProduct(costProductIndex,$store.getters['productsModule/productById'](costProductId))"
                          >Eliminar</v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col cols="12" sm="12">
                <p class="body-1 font-weight-bold">Costo total del servicio</p>
                <v-text-field
                  outlined
                  dense
                  prefix="S/."
                  v-model="salesServices[selectedSalesServicesIndex].cost.value"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogServiceCost = false">Listo</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </custom-card>
</template>

<script>
import services from "@/views/drawerPages/services.vue";
import products from "@/views/drawerPages/products.vue";
import formatISO from "date-fns/formatISO";
export default {
  components: {
    services,
    products,
  },
  data() {
    return {
      dialogCostProduct: null,
      dialogServiceCost: null,
      dialog: null,
      dialogServices: null,
      selectedCommerce: "",
      editPurchasePrice: false,
      historyMode: false,
      selectedSalesServicesIndex: null,
      selectedProduct: null,
      date: formatISO(new Date(), { representation: "date" }),
      menu: false,
      sales: [],
      salesServices: [],
      total: 0,
      productsLoading: false,
      servicesLoading: false,
      loadingButton: false,
    };
  },
  methods: {
    deleteCostProduct(costProductIndex, product) {
      this.salesServices[this.selectedSalesServicesIndex].cost.products.splice(
        costProductIndex,
        1
      );
      //update total cost
      this.salesServices[this.selectedSalesServicesIndex].cost.value =
        parseFloat(
          this.salesServices[this.selectedSalesServicesIndex].cost.value
        ) - product.purchasePrice;
    },
    deleteSale(salesIndex) {
      this.sales.splice(salesIndex, 1);
    },
    deleteService(salesServicesIndex) {
      this.salesServices.splice(salesServicesIndex, 1);
    },
    addSale(product) {
      if (product) {
        this.sales.push({
          productDetails: product,
          productId: product._id,
          qty: 1,
          purchasePrice: product.purchasePrice,
          salePrice: product.price,
          history: this.historyMode,
        });
        //close dialog
        this.dialog = false;
      }
    },
    addServiceCost(product) {
      //close dialog
      this.dialogCostProduct = false;
      //add service cost
      if (product.stock === 0)
        return this.$store.commit(
          "errorModule/error",
          "Ese producto no tiene stock 0"
        );
      this.salesServices[this.selectedSalesServicesIndex].cost.products.push(
        product._id
      );
      //update total cost
      this.salesServices[this.selectedSalesServicesIndex].cost.value =
        parseFloat(
          this.salesServices[this.selectedSalesServicesIndex].cost.value
        ) + product.purchasePrice;
    },
    addService(service) {
      if (service) {
        this.salesServices.push({
          serviceId: service._id,
          serviceDetails: service,
          cost: { products: [], value: 0 },
          salePrice: service.price,
          repairedItem: { itemModel: "", itemType: "", itemBrand: "" },
          description: "",
          history: this.historyMode,
        });
        //close dialog
        this.dialogServices = false;
      }
    },
    async saveSale(products, date, commerce) {
      this.loadingButton = true;
      products = this.$deepCopy(products);
      //delete unnecesary info
      for (const product of products) {
        delete product["productDetails"];
      }
      //validate if historyMode, set history mode to products
      if (this.historyMode) {
        for (const product of products) {
          product.history = true;
        }
      } else {
        for (const product of products) {
          product.history = false;
        }
      }
      try {
        date = new Date(date);
        date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
        await this.$store.dispatch("salesModule/create", {
          history: this.historyMode,
          products,
          date: date,
          commerce,
        });
        for (const product of products) {
          if (!product.history) {
            this.$store.commit("productsModule/updateStock", {
              productId: product.productId,
              qty: -product.qty,
            });
          }
        }
        this.sales = [];
      } finally {
        this.loadingButton = false;
      }
    },
    async saveSaleService(services, date, commerce) {
      this.loadingButton = true;
      services = this.$deepCopy(services);
      //delete unnecesary info
      for (const service of services) {
        delete service["serviceDetails"];
      }
      //validate if historyMode, set history mode to services
      if (this.historyMode) {
        for (const service of services) {
          service.history = true;
        }
      } else {
        for (const service of services) {
          service.history = false;
        }
      }
      try {
        date = new Date(date);
        date = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
        await this.$store.dispatch("salesServicesModule/create", {
          history: this.historyMode,
          services,
          date: date,
          commerce,
        });
        for (const service of services) {
          for (const product of service.cost.products) {
            this.$store.commit("productsModule/updateStock", {
              productId: product,
              qty: -1,
            });
          }
        }
        this.salesServices = [];
        this.selectedSalesServicesIndex = null;
      } finally {
        this.loadingButton = false;
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.productsModule.products;
    },
    services() {
      return this.$store.state.servicesModule.services;
    },
    getTotal() {
      return this.selectedCommerce === "SOFTWARE" ||
        this.selectedCommerce === "HARDWARE"
        ? this.salesServices
            .reduce((a, b) => a + parseFloat(b.salePrice), 0)
            .toFixed(2)
        : this.sales.reduce((a, b) => a + b.salePrice * b.qty, 0).toFixed(2);
    },
    commerce() {
      return this.$store.state.commerce;
    },
  },
};
</script>

<style lang="scss" scoped>
.total {
  font-size: 24px;
}
.search-field {
  display: inline-block;
  width: 300px;
}
.inputs-width {
  max-width: 150px;
}
</style>