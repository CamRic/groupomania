<template>
  <q-layout view="hHh lpr lFf">
    <HeaderComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUserStore } from "../pinia/user.store.js";
import HeaderComponent from "components/HeaderComponent.vue";

export default {
  name: "MainLayout",

  components: {
    HeaderComponent,
  },

  data() {
    var userStore = useUserStore();
    return {
      userStore,
    };
  },
};
</script>
