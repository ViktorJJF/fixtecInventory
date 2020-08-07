<template>
  <custom-card title="Realizar compra" icon="mdi-plus">
    <template v-slot:content>
      <v-container>
        <v-alert prominent type="error" v-show="historyMode">
          <v-col
            class="grow"
          >Aviso: Estás en el modo de compras históricas, por lo que las compras que registres no modificarán tu stock actual.</v-col>
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
          <v-switch
            class="mb-5"
            v-model="historyMode"
            :label="'Modo histórico: '+(historyMode?'Activo':'Inactivo')"
          ></v-switch>
        </v-row>
        <v-btn tile color="primary" class="my-3">
          <v-icon left>search</v-icon>Búsqueda
        </v-btn>
        <v-autocomplete
          @keyup.enter="addPurchase(selectedProduct)"
          placeholder="Escribe el nombre del producto"
          :loading="productsLoading"
          @click="productsList"
          @change="addPurchase(selectedProduct)"
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
        <v-btn outlined color="primary" :to="{name:'historyPurchase'}">
          <v-icon left>mdi-format-list-checks</v-icon>Ver historial
        </v-btn>
        <v-simple-table>
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
                  <span>Cantidad</span>
                </th>
                <th class="text-left">
                  <span>Precio de compra</span>
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
              <tr v-for="(product,purchasesIndex) in purchases" :key="'a'+purchasesIndex">
                <td>{{product.productDetails.typeId?product.productDetails.typeId.name:'Sin tipo'}}</td>
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
                  <v-text-field
                    class="inputs-width"
                    prefix="S/."
                    v-model="product.purchasePrice"
                    type="number"
                  ></v-text-field>
                </td>
                <!-- <td>
                  <v-textarea
                    name="input-7-1"
                    label="Default style"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    hint="Hint text"
                  ></v-textarea>
                </td>-->
                <td>S/.{{product.purchasePrice*product.qty}}</td>
                <td>
                  <v-btn small color="error" @click="deletePurchase(purchasesIndex)">Eliminar</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert
          class="my-5"
          v-show="purchases.length==0"
          type="warning"
          text
        >Aún no agregaste productos a esta compra</v-alert>
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
          @click="savePurchase(purchases,date,selectedCommerce)"
        >Terminar compra</v-btn>
      </v-container>
    </template>
  </custom-card>
</template>

<script>
export default {
  data() {
    return {
      commerce: [
        "VENTA DE ACCESORIOS",
        "VENTA DE REPUESTOS",
        "SOFTWARE",
        "HARDWARE",
        "CELULARES",
      ],
      selectedCommerce: "",
      historyMode: false,
      selectedProduct: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      purchases: [],
      total: 0,
      productsLoading: false,
      loadingButton: false,
    };
  },
  methods: {
    deletePurchase(purchasesIndex) {
      this.purchases.splice(purchasesIndex, 1);
    },
    addPurchase(product) {
      if (product) {
        this.purchases.push({
          productDetails: product,
          productId: product._id,
          qty: 1,
          purchasePrice: product.purchasePrice,
          history: this.historyMode,
        });
      }
    },
    async savePurchase(products, date, commerce) {
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
        await this.$store.dispatch("purchasesModule/create", {
          products,
          date: date,
          commerce,
        });
        for (const product of products) {
          if (!product.history) {
            this.$store.commit("productsModule/updateStock", {
              productId: product.productId,
              qty: +product.qty,
            });
          }
        }
        this.purchases = [];
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
      return this.purchases.reduce((a, b) => a + b.purchasePrice * b.qty, 0);
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