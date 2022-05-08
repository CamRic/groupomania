<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="flex align-center" style="width: 100%; max-width: 450px">
      <LoginForm v-if="loging" />
      <RegisterForm v-else @switchForm="changeForm" />
    </div>
    <a v-if="loging" @click="changeForm" class="q-ml-md">S'inscrire</a>
    <a v-else @click="changeForm" class="q-ml-md">Se connecter</a>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from "components/LoginForm.vue";
import RegisterForm from "components/RegisterForm.vue";

export default defineComponent({
  name: "LoginPage",

  components: {
    LoginForm,
    RegisterForm,
  },

  data() {
    var loging = true;
    return {
      loging,
    };
  },

  methods: {
    changeForm(data) {
      this.loging = !this.loging;
    },
  },
});
</script>

<style lang="scss">
.pink-bg {
  background-color: $groupomania2;
  width: 100%;
}
</style>
