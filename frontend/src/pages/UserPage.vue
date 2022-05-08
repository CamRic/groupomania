<template>
  <q-page class="flex column flex-start content-center groupomania-qpage">
    <div class="flex align-center">
      <UserCard />
    </div>
  </q-page>
</template>

<script>
import UserCard from "../components/UserCard.vue";

export default {
  name: "UserPage",

  components: {
    UserCard,
  },
};
</script>
