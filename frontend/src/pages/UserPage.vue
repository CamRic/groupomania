<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="flex align-center">
      <UserCard />
    </div>
  </q-page>
</template>

<script>
import UserCard from "../components/UserCard.vue";
import { Cookies } from "quasar";
import { useUserStore } from "src/pinia/user.store";

export default {
  name: "UserPage",

  components: {
    UserCard,
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
