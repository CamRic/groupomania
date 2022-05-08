<template>
  <q-header
    elevated
    class="flex row groupomania-header"
    style="justify-content: center"
  >
    <q-toolbar class="groupomania-header__toolbar" style="">
      <router-link to="/">
        <q-img
          src="../assets/icon-left-font-monochrome-white.png"
          width="270px"
          height="100px"
        />
      </router-link>

      <ProfilNav
        v-show="userStore.isLogged"
        :UserName="userStore.getFirstName"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import ProfilNav from "../components/ProfilNav.vue";
import { useUserStore } from "src/pinia/user.store";

export default {
  name: "HeaderComponent",

  components: {
    ProfilNav,
  },

  data() {
    const userStore = useUserStore();
    return {
      userStore,
      showDrawer: true,
      currUrl: this.$route,
    };
  },

  computed() {
    return {
      changeDrawer(data) {
        this.showDrawer = !this.showDrawer;
      },
    };
  },

  methods: {
    emitLeftDrawerOpen(data) {
      this.$emit("showLeftDrawer", !this.showDrawer);
    },
  },
};
</script>

<style lang="scss">
.groupomania-header {
  &__toolbar {
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 90%;
    // @media (max-width: 425px) {
    //   justify-content: space-between;
    //   width: 100%;
    // }
  }
}
</style>
