<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="creation-qcard-container">
      <h5>Nouveau Sujet</h5>
      <CreateTopic />
    </div>
  </q-page>
</template>
<script>
import CreateTopic from "src/components/CreateTopic.vue";

export default {
  name: "CreateTopicPage",

  components: {
    CreateTopic,
  },
};
</script>
<style lang="scss">
.creation-qcard-container {
  width: 80%;
}
</style>
