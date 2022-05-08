<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <TopicView :topicId="topicId" />
  </q-page>
</template>

<script>
import { useRouter } from "vue-router";
import { useTopicStore } from "src/pinia/topic.store";
import TopicView from "src/components/TopicView.vue";

export default {
  name: "TopicPage",

  components: { TopicView },

  data() {
    const topicStore = useTopicStore();
    const topicId = useRouter().currentRoute.value.params.id;

    return {
      topicStore,
      topicId,
    };
  },

  created() {
    this.topicStore.retrieveTopicData(this.topicId);
  },

  watch: {
    $route(to, from) {
      this.topicStore.$reset;
    },
  },
};
</script>

<style lang="scss"></style>
