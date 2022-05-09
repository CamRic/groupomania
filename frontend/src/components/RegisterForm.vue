<template>
  <q-card class="flex column lognsign-card q-my-md q-pa-xl">
    <h5 class="q-my-none q-mb-md">Inscription</h5>
    <div class="form-container">
      <q-form @submit="onSubmit">
        <q-input
          class="q-mb-md"
          filled
          style="background-color: #ffffff; border-radius: 10px 10px 10px 10px"
          v-model="email"
          label="Votre adresse mail"
          type="email"
        />

        <q-input
          type="password"
          class="q-mb-md"
          v-model="password"
          filled
          style="background-color: #ffffff; border-radius: 10px 10px 10px 10px"
          label="Votre mot de passe"
        />

        <q-input
          type="text"
          class="q-mb-md"
          v-model="first_name"
          filled
          style="background-color: #ffffff; border-radius: 10px 10px 10px 10px"
          label="Votre prénom"
        />

        <q-input
          type="text"
          class="q-mb-md"
          v-model="last_name"
          filled
          style="background-color: #ffffff; border-radius: 10px 10px 10px 10px"
          label="Votre nom"
        />

        <div>
          <q-btn label="s'inscrire" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { Notify, useQuasar } from "quasar";

export default {
  name: "RegisterForm",

  components: {},

  data() {
    const $q = useQuasar();
    return {
      $q,
      password: "",
      email: "",
      first_name: "",
      last_name: "",
    };
  },

  methods: {
    onSubmit(e) {
      // check user input
      if (this.email.length < 6) {
        console.log("invalid email");
        return;
      }
      if (this.password.length < 4) {
        console.log("invalid password");
        return;
      }
      if (this.first_name.length < 2) {
        console.log("invalid name");
        return;
      }
      if (this.last_name.length < 1) {
        console.log("invalid name");
        return;
      }
      // send request
      api
        .post("http://localhost:3000/api/user/signup", {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        })
        .then((res) => {
          this.$q.notify({
            message: "Nouveau compte créé!",
            timeout: 2500,
            color: "positive",
            icon: "fa-solid fa-circle-check",
          });
          this.$emit("switchForm");
        })
        .catch((err) => {
          this.$q.notify({
            message: "Erreur: impossible de créer le compte.",
            timeout: 2500,
            color: "negative",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.lognsign-card {
  max-width: 450px;
  width: 100%;
  height: fit-content;
  background-color: $groupomania1;
  justify-content: center;
}
.form-container {
  height: auto;
  background-color: $groupomania1;
  > * {
    background-color: $groupomania1;
  }
}
</style>
