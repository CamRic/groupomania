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
    // userStore.$onAction(({ disconnect, userStore, args, after, onError }) => {
    //   if (!this.userStore.isLogged) return;
    //   after((result) => {
    //     console.log("disconnected");
    //     this.$router.push("/login");
    //   });
    //   onError((error) => {
    //     console.log(error);
    //   });
    // }, true);
    // userStore.$subscribe(
    //   (mutation, state) => {
    //     console.log("mutation", mutation);
    //     console.log("state", state);
    //   },
    //   { detached: true }
    //);
    return {
      userStore,
    };
  },
};
</script>
