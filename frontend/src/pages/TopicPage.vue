<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <TopicView :topicId="topicId" />
  </q-page>
</template>

<script>
import { useRouter } from "vue-router";
import { useTopicStore } from "src/pinia/topic.store";
import TopicView from "src/components/TopicView.vue";
import { Cookies } from "quasar";
import { useUserStore } from "src/pinia/user.store";

export default {
  name: "TopicPage",

  components: { TopicView },

  data() {
    const topicStore = useTopicStore();
    const topicId = useRouter().currentRoute.value.params.id;
    const userStore = useUserStore()

    return {
      topicStore,
      topicId,
      userStore
    };
  },

  created() {
    console.log(Cookies.has('token'))
    if (!this.userStore.getCookie('token')) {
          this.$router.push({ path: "/login" });
    }
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
