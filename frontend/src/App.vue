<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "./pinia/user.store";
import { useTopicStore } from "./pinia/topic.store";
import { api } from "./boot/axios";
import { Cookies } from "quasar";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "App",

  data() {
    const $q = useQuasar();
    const userStore = useUserStore();
    //userStore.retrieveConnection();
    const topicStore = useTopicStore();
    return {
      topicStore,
      userStore,
      $q,
    };
  },

  created() {
    if (Cookies.has("token")) {
      this.retrieveSession();
    } else {
      this.$router.push({ path: "/login" });
    }
  },

  methods: {
    async retrieveSession() {
      await api({
        method: "post",
        url: "http://localhost:3000/api/user/retrieve",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
        .then((res) => {
          this.userStore.loggedIn = true;
          this.userStore.user_email = res.data.user_email;
          this.userStore.user_id = res.data.user_id;
          this.userStore.user_first_name = res.data.user_firstName;
          this.userStore.user_last_name = res.data.user_lastName;
          this.userStore.user_access_level = res.data.user_role;
          return res;
        })
        .catch((err) => console.log(err));
    },
  },
});
</script>

<style lang="scss">
a {
  color: #000;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
.groupomania-header {
  background-color: $groupomania1;
}
.groupomania-qpage {
  background-color: $groupomania2;
  opacity: 0.9;
}
.groupomania-qcard {
  background-color: $groupomania1;
  max-width: 650px;
  width: 100%;
}
.groupomania-qinput {
  background-color: $groupomania2;
  border-radius: 10px 10px 10px 10px;
}
</style>
