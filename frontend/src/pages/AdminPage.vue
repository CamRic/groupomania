<template>
  <q-page class="flex column items-center groupomania-qpage">
    <div class="q-mb-lg" style="width: 100%; max-width: 650px">
      <h5 class="q-my-sm">Page administrateur</h5>
      <UserList />
      <AdminTopicList />
    </div>
  </q-page>
</template>

<script>
import UserList from "../components/UserList.vue";
import AdminTopicList from "src/components/AdminTopicList.vue";

export default {
  name: "AdminPage",
  components: { /*TopicList,*/ UserList, AdminTopicList },
};
</script>

<style lang="scss"></style>
