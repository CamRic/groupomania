<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";

export default defineComponent({
  name: "LoginLayout",
  components: { HeaderComponent },
});
</script>
