<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="creation-qcard-container">
      <h5>Modifier Sujet</h5>
      <ModifyTopic />
    </div>
  </q-page>
</template>

<script>
import ModifyTopic from "../components/ModifyTopic.vue";
import { Cookies } from "quasar";
import { useUserStore } from "src/pinia/user.store";

export default {
  name: "ModifyTopicPage",

  components: {
    ModifyTopic,
  },

  data() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },

  created() {
    if (!this.userStore.getCookie('token')) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
.creation-qcard-container {
  width: 80%;
}
</style>
