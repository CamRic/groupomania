<template>
  <q-card class="flex column lognsign-card q-my-md q-pa-xl">
    <h5 class="q-my-none q-mb-md">Connexion</h5>
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

        <div>
          <q-btn label="connexion" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script>
import { useUserStore } from "src/pinia/user.store.js";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";

export default {
  name: "LoginForm",

  components: {},

  data() {
    const $q = useQuasar();
    const userStore = useUserStore();
    return {
      $q,
      userStore,
      password: "",
      email: "",
    };
  },

  methods: {
    async onSubmit(e) {
      if (this.password.length === 0 || this.email.length === 0) {
        console.log("error email or password invalid"); // notif
        this.$q.notify({
          message: "Entrée(s) invalide(s)!",
          timeout: 2000,
          position: "center",
          color: "negative",
          icon: "fa-solid fa-triangle-exclamation",
        });
        return;
      }
      api
        .post("/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          var d = new Date();
          d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
          document.cookie =
            "token=" + response.data.token + ";expires=" + d.toUTCString();
          document.cookie =
            "user_role=" +
            response.data.user_role +
            ";expires=" +
            d.toUTCString();
          this.userStore.loggedIn = true;
          this.userStore.user_email = response.data.user_email;
          this.userStore.user_id = response.data.user_id;
          this.userStore.user_first_name = response.data.user_firstName;
          this.userStore.user_last_name = response.data.user_lastName;
          this.userStore.user_access_level = response.data.user_role;
          this.$router.push("/");
          Notify.create({
            message: "Bienvenue " + response.data.user_firstName + "!",
            timeout: 2500,
            position: "top",
            color: "positive",
          });
        })
        .catch((err) => {
          console.log(err);
          Notify.create({
            message: "Mot de passe ou email invalide",
            timeout: 2000,
            color: "negative",
            icon: "fa-solid fa-triangle-exclamation",
          });
        });
    },
  },
};
</script>
