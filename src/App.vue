<template>
  <v-app>
    <!--v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar-->

    <v-main class="bg_img">
      <!-- <FormFields/> -->
      <!-- <ListView/> -->
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//import HelloWorld from './components/HelloWorld';
// import FormFields from './components/formfields';
// import ListView from './components/listView';
// import TableView from './components/tableView';

import router from './router/router';

export default {
  name: 'App',
  router,
  components: {
    // FormFields,
    // ListView
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.bg_img {
  background-image: url('./assets/BG_Insurance.png');
}
</style>