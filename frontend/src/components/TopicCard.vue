<template>
  <q-card class="topicBody-qcard q-my-md q-pa-lg bg-grey-2">
    <div class="topicBody-qcard__header">
      <h5 class="q-my-sm q-pl-lg">Sujet: {{ title }}</h5>
      <h6 class="q-my-sm q-pl-lg">Auteur: {{ author }}</h6>
      <p class="q-my-sm q-pl-lg">Le {{ creationDate }}</p>
    </div>
    <q-card
      class="topicBody-qcard__img flex center justify-center q-my-sm q-mx-auto q-pa-sm"
      v-if="imageUrl"
      style="width: fit-content; height: fit-content"
      bordered
    >
      <img :src="imageUrl" class="topic-img" alt="image du sujet" />
    </q-card>
    <q-card class="topicBody-qcard__body q-pa-lg wrap" bordered>
      {{ body }}
    </q-card>
  </q-card>
</template>
<script>
import { useUserStore } from "src/pinia/user.store";
export default {
  name: "TopicCard",
  data() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  props: {
    title: String,
    author: String,
    authorId: String,
    creationDate: String,
    body: String,
    imageUrl: String,
  },
};
</script>
<style lang="scss">
.topic-img {
  max-width: 100%;
}
</style>
