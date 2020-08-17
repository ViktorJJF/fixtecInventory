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
        <v-dialog v-model="dialog" width="1200">
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
        <!-- service search -->
        <!-- <v-autocomplete
          v-if="selectedCommerce=='SOFTWARE' || selectedCommerce=='HARDWARE'"
          @keyup.enter="addSale(selectedProduct)"
          placeholder="Escribe el nombre del servicio"
          @change="addSale(selectedProduct)"
          class="search-field mr-3"
          v-model="selectedProduct"
          :items="services"
          item-text="name"
          item-value="_id"
          :return-object="true"
          dense
          outlined
        ></v-autocomplete>-->
        <!-- products search -->
        <!-- <v-autocomplete
          v-else
          @keyup.enter="addSale(selectedProduct)"
          placeholder="Escribe el nombre del producto"
          @change="addSale(selectedProduct)"
          class="search-field mr-3"
          v-model="selectedProduct"
          :items="products"
          item-text="name"
          item-value="_id"
          :return-object="true"
          dense
          outlined
        ></v-autocomplete>-->
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
              <tr v-for="(product,salesIndex) in sales" :key="'a'+salesIndex">
                <td>{{product.productDetails.typeId?product.productDetails.typeId.name:'Sin tipo'}}</td>
                <td>{{product.productDetails.name}}</td>
                <td>
                  <v-text-field
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
                    v-model="product.purchasePrice"
                    type="number"
                  ></v-text-field>
                </td>
                <td>
                  <ul>
                    <li>
                      Modelo:
                      <v-text-field
                        class="inputs-width"
                        v-model="product.purchasePrice"
                        type="text"
                      ></v-text-field>
                    </li>
                    <li>
                      Marca:
                      <v-text-field
                        class="inputs-width"
                        v-model="product.purchasePrice"
                        type="text"
                      ></v-text-field>
                    </li>
                  </ul>
                </td>
                <td>
                  <v-textarea outlined placeholder="Descripción"></v-textarea>
                </td>
                <td>
                  <v-btn small color="error" @click="deleteSale(salesIndex)">Eliminar</v-btn>
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
          v-show="sales.length==0"
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
          :loading="loadingButton"
          color="success"
          @click="saveSale(sales,date,selectedCommerce)"
        >Terminar venta</v-btn>
      </v-container>
    </template>
  </custom-card>
</template>

<script>
import products from "@/views/drawerPages/products.vue";
import formatISO from "date-fns/formatISO";
export default {
  components: {
    products,
  },
  data() {
    return {
      dialog: null,
      selectedCommerce: "",
      editPurchasePrice: false,
      historyMode: false,
      selectedProduct: null,
      date: formatISO(new Date(), { representation: "date" }),
      menu: false,
      sales: [],
      total: 0,
      productsLoading: false,
      servicesLoading: false,
      loadingButton: false,
    };
  },
  methods: {
    deleteSale(salesIndex) {
      this.sales.splice(salesIndex, 1);
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
  },
  computed: {
    products() {
      return this.$store.state.productsModule.products;
    },
    services() {
      return this.$store.state.servicesModule.services;
    },
    getTotal() {
      return this.sales.reduce((a, b) => a + b.salePrice * b.qty, 0).toFixed(2);
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