<template>
  <q-card
    class="create-topic-qcard q-my-md q-pa-lg align-center content-center"
  >
    <q-form @submit="onSubmit">
      <q-input label="Titre" type="text" v-model="topicTitle" class="q-mx-md" />
      <q-file
        class="q-mt-md"
        style="max-width: 300px; fixed-height: 61px"
        v-model="file"
        rounded
        standout
        use-chips
        label="Modifier image"
        accept=".jpg, image/*"
        @update:model-value="onImageUpdate"
      />
      <q-btn
        label="Supprimer Image"
        color="warning"
        class="q-mt-sm"
        v-if="imageUrl"
        @click="removeImage"
      />
      <div v-if="imageUrl" class="q-mt-sm" ref="topicImage">
        <img :src="imageUrl" alt="image du sujet" style="max-width: 100%" />
      </div>
      <q-separator class="q-mt-md" />
      <q-input
        class="q-mb-md"
        type="textarea"
        placeholder="Ecrivez votre message ici..."
        v-model="topicBody"
        borderless
      />
      <q-separator />
      <q-btn class="q-mt-md" type="submit" label="envoyer" />
    </q-form>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "src/pinia/user.store";
import { useTopicStore } from "src/pinia/topic.store";
import { Cookies, useQuasar } from "quasar";

export default {
  name: "ModifyTopic",

  data() {
    const topicStore = useTopicStore();
    const userStore = useUserStore();
    const $q = useQuasar;
    var file = null;
    const topicId = useRouter().currentRoute.value.params.id;
    return {
      topicId,
      topicStore,
      $q,
      file,
      topicTitle: "",
      topicBody: "",
      imageUrl: "",
      userStore,
    };
  },
  methods: {
    onSubmit(e) {
      // check user input
      if (this.topicTitle.length < 3 || this.topicBody.length < 3) {
        console.log("invalid input(s)");
        this.$q.notify({
          message: "Entrée(s) invalide(s)",
          timeout: 2000,
        });
        return;
      }

      let formData = new FormData();
      formData.append("topicBody", this.topicBody);
      formData.append("title", this.topicTitle);
      formData.append("file", this.file);

      api
        .put("/topic/" + this.topicId, formData, {
          "Content-Type": "multipart/form-data",
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then(async (topic) => {
          this.topicStore.retrieveTopicData(this.topicId);
          this.$q.notify({
            spinner: true,
            message: "Modification du sujet...",
            timeout: 1000,
            color: "info",
          });
          await new Promise((r) => setTimeout(r, 1500));
          this.$router.replace("/topic/" + this.topicId);
        })
        .catch((err) => {
          console.log("error updating topic");
          this.$q.notify({
            message: "Erreur lors de la modification du sujet",
            timeout: 2000,
          });
        });
    },

    removeImage(data) {
      this.file = null;
      this.imageUrl = "";
    },

    onImageUpdate(file) {
      this.$refs.topicImage.innerHTML = "";
      this.$refs.topicImage.innerText = "Image modifiée!";
    },
  },

  beforeMount() {
    api
      .get("/topic/" + useRouter().currentRoute.value.params.id, {
        headers: { Authorization: "Bearer: " + Cookies.get("token") },
      })
      .then((res) => {
        this.topicTitle = res.data.topic.title;
        this.topicBody = res.data.topic.body;
        this.file = res.data.topic.imageUrl;
        this.imageUrl = res.data.topic.imageUrl;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.create-topic-qcard {
  width: 100%;
}
</style>
