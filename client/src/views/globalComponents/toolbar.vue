<template>
  <v-app-bar dark app color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5">Fixtec</span>
    <v-spacer></v-spacer>
    <v-menu v-if="$store.state.authModule.user" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">Opciones</v-btn>
      </template>
      <v-list>
        <v-list-item :to="option.to" v-for="(option, index) in options" :key="index">
          <v-list-item-title>{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu v-if="$store.state.authModule.user" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-badge color="red">
            <template v-slot:badge>{{$store.state.stockAlert.length}}</template>
            <v-icon>mdi-email</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list v-for="(alertMessage,i) in $store.state.stockAlert" :key="i">
        <v-list-item>
          Tu producto {{alertMessage.productName}} está por agortarse. (
          <strong>Stock:</strong>
          {{alertMessage.stock}})
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-if="!$store.state.authModule.user" dark outlined :to="{name:'login'}">Iniciar Sesión</v-btn>
    <v-menu v-if="$store.state.authModule.user" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text color="white" dark v-on="on">
          {{user}}
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { title: "Vista tipos", to: { name: "type" } },
        { title: "Vista marcas", to: { name: "brand" } },
        { title: "Vista calidades", to: { name: "qualities" } },
        { title: "Vista colores", to: { name: "colors" } },
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.toolbar.drawerIcon;
      },
      set(newValue) {
        this.$store.state.toolbar.drawerIcon = newValue;
      },
    },
    user() {
      return this.$store.state.authModule.user.email;
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("authModule/logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log("algo salio mal en logout:", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>