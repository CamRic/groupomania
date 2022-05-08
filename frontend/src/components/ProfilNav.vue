<template>
  <q-btn-dropdown
    color="red-8"
    :label="userStore.getFirstName"
    class="header-dropdown"
    style="border-radius: 5px 5px 0px 0px"
  >
    <q-list>
      <router-link to="/user">
        <q-item>
          <q-item-section>
            <q-item-label>Mon profil</q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
      <router-link to="/newtopic">
        <q-item>
          <q-item-section>
            <q-item-label>Nouveau sujet</q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
      <router-link
        v-if="this.userStore.user_access_level === 'admin'"
        to="/admin"
      >
        <q-item>
          <q-item-section>
            <q-item-label>Admin</q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
      <router-link to="/login">
        <q-item>
          <q-item-section>
            <q-item-label @click="disconnectSelf">Deconnexion</q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { useUserStore } from "src/pinia/user.store";
import { Cookies, useQuasar } from "quasar";
import { Notify } from "quasar";

export default {
  name: "ProfilNav",

  data() {
    const $q = useQuasar();
    const userStore = useUserStore();
    const userRole = Cookies.get("user_role");
    return {
      $q,
      userRole,
      userStore,
    };
  },

  props: {
    UserName: String,
  },

  computed: {
    getFullName(data) {
      return this.userStore.getUserName;
    },
  },

  methods: {
    disconnectSelf() {
      this.userStore.disconnect();
      this.$q.notify({
        message: "Déconnecté!",
        timeout: 2500,
      });
    },
  },
};
</script>

<style lang="scss">
.header-dropdown {
  width: 150px;
  @media (max-width: 426px) {
    margin-bottom: 25px;
    overflow: hidden;
  }
}
</style>
