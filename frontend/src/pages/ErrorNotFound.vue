<template>
  <div
    class="fullscreen bg-grpmn text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh; opacity: 0.4">404</div>

      <div class="text-h2" style="opacity: 0.4">
        Désolé, cette page n'existe pas et n'existera jamais...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red-4"
        unelevated
        to="/"
        label="Page d'Acceuil"
        no-caps
        style="opacity: 0.4; font-size: medium"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>

<style lang="scss">
.bg-grpmn {
  background-color: $groupomania1;
}
</style>
