<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="creation-qcard-container">
      <h5>Modifier Sujet</h5>
      <ModifyTopic />
    </div>
  </q-page>
</template>

<script>
import ModifyTopic from "../components/ModifyTopic.vue";
export default {
  name: "ModifyTopicPage",

  components: {
    ModifyTopic,
  },
};
</script>

<style lang="scss">
.creation-qcard-container {
  width: 80%;
}
</style>
