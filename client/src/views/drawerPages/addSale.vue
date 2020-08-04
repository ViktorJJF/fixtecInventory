<template>
  <custom-card title="Realizar venta" icon="mdi-plus">
    <template v-slot:content>
      <v-container>
        <v-alert prominent type="error" v-show="historyMode">
          <v-col
            class="grow"
          >Aviso: Estás en el modo de ventas históricas, por lo que las ventas que registres no modificarán tu stock actual.</v-col>
        </v-alert>
        <v-row align="center">
          <p class="body-1 font-weight-bold d-inline mx-3">Fecha:</p>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="date-width"
                v-model="date"
                persistent-hint
                prepend-inner-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
          </v-menu>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="items" label="Selecciona el negocio" outlined dense></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-switch
            v-model="historyMode"
            :label="'Modo histórico: '+(historyMode?'Activo':'Inactivo')"
          ></v-switch>
        </v-row>
        <v-btn tile color="primary" class="my-3">
          <v-icon left>search</v-icon>Búsqueda
        </v-btn>
        <v-autocomplete
          @keyup.enter="addSale(selectedProduct)"
          placeholder="Escribe el nombre del producto"
          :loading="productsLoading"
          @click="productsList"
          @change="addSale(selectedProduct)"
          class="search-field mr-3"
          v-model="selectedProduct"
          :items="products"
          item-text="name"
          item-value="_id"
          :return-object="true"
          dense
          outlined
        >
          <template v-slot:no-data>
            <v-container fluid class="text-center" v-if="productsLoading">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-container>
          </template>
        </v-autocomplete>
        <v-btn outlined color="primary" :to="{name:'salesHistory'}">
          <v-icon left>mdi-format-list-checks</v-icon>Ver historial
        </v-btn>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <span>Producto</span>
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
                <th class="text-left">
                  <span>Descripción</span>
                </th>
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
                <td>{{product.productDetails.name}}</td>
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
                <td>
                  <v-textarea
                    name="input-7-1"
                    label="Default style"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    hint="Hint text"
                  ></v-textarea>
                </td>
                <td>S/.{{product.salePrice*product.qty}}</td>
                <td>
                  <v-btn small color="error" @click="deleteSale(salesIndex)">Eliminar</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert
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
        <v-btn :loading="loadingButton" color="success" @click="saveSale(sales,date)">Terminar venta</v-btn>
      </v-container>
    </template>
  </custom-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "VENTA DE ACCESORIOS",
        "VENTA DE REPUESTOS",
        "SOFTWARE",
        "HARDWARE",
      ],
      editPurchasePrice: false,
      historyMode: false,
      selectedProduct: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      sales: [],
      total: 0,
      productsLoading: false,
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
      }
    },
    async saveSale(products, date) {
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
      //set hour
      let currentDate = new Date();
      let currentDay = currentDate.getDate();
      let currentHours = currentDate.getHours();
      let currentMinutes = currentDate.getMinutes();
      let currentSeconds = currentDate.getSeconds();
      let saleDate = new Date(date);
      saleDate = new Date(saleDate.setDate(currentDay));
      saleDate = new Date(saleDate.setHours(currentHours));
      saleDate = new Date(saleDate.setMinutes(currentMinutes));
      saleDate = new Date(saleDate.setSeconds(currentSeconds));
      //create sale
      try {
        await this.$store.dispatch("salesModule/create", {
          products,
          date: saleDate,
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
    async productsList() {
      if (this.products.length === 0) {
        this.productsLoading = true;
        try {
          await this.$store.dispatch("productsModule/list");
        } finally {
          this.productsLoading = false;
        }
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.productsModule.products;
    },
    getTotal() {
      return this.sales.reduce((a, b) => a + b.salePrice * b.qty, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.total {
  font-size: 24px;
}
.date-width {
  max-width: 300px;
}
.search-field {
  display: inline-block;
  width: 300px;
}
.inputs-width {
  max-width: 150px;
}
</style>