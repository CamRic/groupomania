<template>
  <q-card class="post-qcard q-my-md q-px-md q-py-sm bg-grey-2">
    <div class="post-qcard__header">
      <h6 class="q-my-sm q-pl-md">{{ author }}</h6>
    </div>
    <q-card class="post-qcard__body q-my-sm q-mx-md q-pa-md" bordered>
      {{ body }}
    </q-card>
    <div class="flex row justify-between items-center q-mx-md q-my-sm">
      <p class="q-my-sm">
        {{ createdAt.split("T").join(" ").substring(0, 19) }}
      </p>
      <q-icon
        v-if="userStore.getUserId === author_id"
        class="fa-solid fa-pen gr-icon q-ml-auto q-mr-md"
        color="blue-4"
        @click="modifySelf"
      />
      <q-icon
        v-if="
          userStore.getUserId === author_id || userStore.user_access_level === 'admin'
        "
        class="fa-solid fa-trash-can gr-icon"
        color="red-4"
        @click="deleteSelf"
      />
    </div>
  </q-card>
</template>
<script>
import { useUserStore } from "src/pinia/user.store";
import { api } from "src/boot/axios";
import { Cookies, useQuasar } from "quasar";
import { Notify } from "quasar";

export default {
  name: "PostCard",

  data() {
    const $q = useQuasar();
    const userStore = useUserStore();
    return {
      $q,
      userStore,
    };
  },

  props: {
    post_id: String,
    author: String,
    author_id: String,
    body: String,
    createdAt: String,
  },

  methods: {
    async deleteSelf(data) {
      this.$q
        .dialog({
          message: "Supprimer le message?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          await api.delete("/post/" + this.post_id, {
            headers: { Authorization: "Bearer: " + Cookies.get("token") },
          });
          this.$q.notify({
            spinner: true,
            message: "Suppression du message...",
            timeout: 1500,
            color: "warning",
          });
          this.$emit("deleted");
        });
    },
    async modifySelf() {
      this.$q
        .dialog({
          title: "Modifier la réponse",
          prompt: {
            model: "",
            isValid: (val) => val.length > 2,
            type: "textarea",
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          // send modify post request
          console.log(data);
          api
            .put(
              "/post/" + this.post_id,
              {
                body: data,
              },
              {
                headers: { Authorization: "Bearer: " + Cookies.get("token") },
              }
            )
            .then((res) => {
              this.$emit("deleted");
              this.$q.notify({
                spinner: true,
                message: "Envoi du message...",
                timeout: 2000,
                color: "info",
              });
            })
            .catch((err) => console.log(err));
        });
    },
  },
};
</script>
<style lang="scss">
.post-qcard {
  width: 100%;
}
.gr-icon:hover {
  cursor: pointer;
}
</style>
