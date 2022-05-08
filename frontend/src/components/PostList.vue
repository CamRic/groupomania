<template>
  <div>
    <q-card>
      <div class="list__header flex row justify-between">
        <h6 class="q-my-sm">Liste des réponses</h6>
        <q-btn label="supprimer" @click="deletePost" />
      </div>
      <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="post_id"
        selection="multiple"
        v-model:selected="selected"
      />
    </q-card>
  </div>
</template>
<script>
const columns = [
  {
    name: "author",
    label: "Auteur",
    align: "left",
    field: (row) => row.author,
  },
  {
    name: "post_id",
    label: "ID",
    align: "left",
    field: (row) => row.post_id,
  },
];

import { api } from "src/boot/axios";
import { Cookies } from "quasar";

export default {
  name: "PostList",

  data() {
    var postList = [];
    var rows = [];
    return {
      postList,
      selected: [],
      columns,
      rows,
    };
  },
  created(data) {
    api
      .get("/post", {
        headers: { Authorization: "Bearer: " + Cookies.get("token") },
      })
      .then((posts) => {
        this.postList = posts.data.posts;
        for (let post of this.postList) {
          api
            .get("/user/" + post.user_id)
            .then((user) => {
              this.rows.push({
                author:
                  user.data.user.first_name + " " + user.data.user.last_name,
                post_id: post.post_id,
              });
            })
            .catch();
        }
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="scss"></style>
