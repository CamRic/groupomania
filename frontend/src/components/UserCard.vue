<template>
  <q-card class="q-pa-xl q-ma-md groupomania-qcard">
    <h5 class="q-mt-none">{{ userStore.getUserName }}</h5>
    <q-form @submit="onSubmit" style="min-width: 270px">
      <q-input
        class="q-mb-md groupomania-qinput"
        borderless
        filled
        stack-label
        v-model="emailInput"
        label="Email"
        type="email"
      />
      <q-input
        class="q-mb-md groupomania-qinput"
        borderless
        filled
        stack-label
        v-model="firstNameInput"
        label="Prénom"
        type="text"
      />
      <q-input
        class="q-mb-md groupomania-qinput"
        borderless
        filled
        stack-label
        v-model="lastNameInput"
        label="Nom"
        type="text"
      />
      <q-input
        class="q-mb-md groupomania-qinput"
        borderless
        filled
        stack-label
        v-model="passwordInput"
        label="Mot de passe"
        type="password"
      />
      <!-- <q-input
        class="q-mb-md groupomania-qinput"
        borderless
        filled
        stack-label
        v-model="newPasswordInput"
        label="Vérification mot de passe"
        type="password"
      /> -->

      <div class="flex justify-between">
        <q-btn label="modifier" type="submit" color="primary" />
        <q-btn
          label="supprimer"
          @click="deleteSelf"
          color="negative"
          class="q-ml-xl"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { useUserStore } from "src/pinia/user.store";
import { api } from "src/boot/axios";
import { Cookies, Notify, useQuasar } from "quasar";

export default {
  name: "UserCard",

  data() {
    const $q = useQuasar();
    const userStore = useUserStore();
    var emailInput = "";
    var firstNameInput = "";
    var lastNameInput = "";
    var passwordInput = "";
    var newPasswordInput = "";
    return {
      $q,
      newPasswordInput,
      userStore,
      emailInput,
      firstNameInput,
      lastNameInput,
      passwordInput,
    };
  },

  created() {
    this.emailInput = this.userStore.getUserEmail;
    this.firstNameInput = this.userStore.getFirstName;
    this.lastNameInput = this.userStore.getLastName;
  },

  methods: {
    onSubmit(e) {
      // verif mdp

      api
        .put(
          "/user/" + this.userStore.getUserId,
          {
            email: this.emailInput,
            first_name: this.firstNameInput,
            last_name: this.lastNameInput,
            password: this.passwordInput,
          },
          { headers: { Authorization: "Bearer: " + Cookies.get("token") } }
        )
        .then(async (res) => {
          await this.userStore.resetData();
          await new Promise((r) => setTimeout(r, 2500));
          this.$forceUpdate();
        })
        .catch((err) => console.log(err));
    },
    async deleteSelf() {
      this.$q
        .dialog({
          message: "Voulez vous supprimer votre compte?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          await this.userStore.deleteUser();
          this.$q.notify({
            message: "Compte supprimé!",
            timeout: 2500,
          });
          this.userStore.disconnect;
          this.$router.replace("/login");
          console.log("user deleted");
        });
    },
  },
};
</script>
