<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="creation-qcard-container">
      <h5>Nouveau Sujet</h5>
      <CreateTopic />
    </div>
  </q-page>
</template>
<script>
import CreateTopic from "src/components/CreateTopic.vue";
import { Cookies } from "quasar";
import { useUserStore } from "src/pinia/user.store";

export default {
  name: "CreateTopicPage",

  components: {
    CreateTopic,
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
