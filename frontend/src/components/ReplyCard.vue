<template>
  <q-card class="reply-qcard q-my-md q-pa-md">
    <h5 class="q-my-sm">Répondre</h5>
    <q-separator />
    <q-form @submit="onSubmit">
      <q-input
        class="reply-qcard"
        borderless
        v-model="replyBody"
        type="textarea"
        placeholder="Ecrivez votre réponse ici"
      />
      <q-separator />
      <q-btn
        class="q-mt-md"
        type="submit"
        label="envoyer"
        color="blue-8"
      ></q-btn>
    </q-form>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { useUserStore } from "src/pinia/user.store";
import { Notify, useQuasar } from "quasar";
import { Cookies } from "quasar";

export default {
  name: "ReplyCard",

  props: {
    topicId: String,
  },

  data() {
    const userStore = useUserStore();
    var topicIdData = this.topicId;
    const $q = useQuasar();
    return {
      $q,
      replyBody: "",
      userStore,
      topicIdData,
    };
  },

  computed: {
    getUserId(data) {
      return this.userStore.getUserId;
    },
  },
  methods: {
    async onSubmit(e) {
      // check user input
      if (this.replyBody.length < 3) {
        console.log("user input invalid!");
        this.$q.notify({
          message: "Pas de message",
          timeout: 2000,
        });
        return;
      }
      await api
        .post(
          "http://localhost:3000/api/post",
          {
            topic_id: this.topicId,
            user_id: this.getUserId,
            body: this.replyBody,
          },
          {
            headers: { Authorization: "Bearer: " + Cookies.get("token") },
          }
        )
        .then((res) => {
          this.replyBody = "";
          this.$q.notify({
            spinner: true,
            message: "Envoi du message...",
            timeout: 2000,
            color: "info",
          });
          this.$emit("emitted");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss"></style>
