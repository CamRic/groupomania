<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="index-components-container q-my-md">
      <div class="topic-carousel-container">
        <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="white"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          padding
          arrows
          height="75px"
          width="300px"
          class="text-white shadow-1 rounded-borders topic-carousel"
          style="border-radius: 25px 25px 0px 0px"
        >
          <q-carousel-slide name="latest" class="text-center">
            <div class="q-mt-md text-center">Les derniers sujets</div>
          </q-carousel-slide>
          <q-carousel-slide name="user">
            <div class="q-mt-md text-center">Mes sujets</div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="topic-list-container">
        <TopicList v-if="slide === 'latest'" />
        <UserTopicList v-if="slide === 'user'" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "src/pinia/user.store";
import { ref } from "vue";
import TopicList from "src/components/TopicList.vue";
import UserTopicList from "src/components/UserTopicList.vue";

export default defineComponent({
  name: "IndexPage",

  data() {
    var topicsCategory = "recent";
    const userStore = useUserStore();
    return {
      userStore,
      topicsCategory,
      slide: ref("latest"),
    };
  },

  components: { TopicList, UserTopicList },
});
</script>

<style lang="scss">
.index-components-container {
  max-width: 650px;
  width: 100%;
}
.topic-carousel {
  background-color: $groupomania3;
}
.topic-carousel-container {
  width: 100%;
}
</style>
