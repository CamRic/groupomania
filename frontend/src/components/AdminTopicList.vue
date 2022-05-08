<template>
  <div>
    <q-card style="width: 100%; max-width: 650px">
      <div class="list__header flex row justify-between q-pa-md">
        <h6 class="q-my-sm">Liste des sujets</h6>
        <q-btn label="supprimer" color="red" @click="deleteTopic" />
      </div>
      <q-separator size="2px" />
      <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="topic_id"
        selection="multiple"
        v-model:selected="selected"
      />
    </q-card>
  </div>
</template>
<script>
const columns = [
  {
    name: "sujet",
    label: "Sujet",
    align: "left",
    field: (row) => row.sujet,
  },
  {
    name: "author",
    label: "Auteur",
    align: "left",
    field: (row) => row.author,
  },
  {
    name: "topic_id",
    label: "ID",
    align: "left",
    field: (row) => row.topic_id,
  },
];

import { api } from "src/boot/axios";
import { Cookies, useQuasar } from "quasar";
import { Dialog } from "quasar";

export default {
  name: "AdminTopicList",

  data() {
    const $q = useQuasar;
    var topicList = [];
    var rows = [];
    return {
      $q,
      topicList,
      selected: [],
      columns,
      rows,
    };
  },
  created(data) {
    api
      .get("/topic", {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((topics) => {
        this.topicList = topics.data.topics;
        for (let topic of this.topicList) {
          api
            .get("/user/" + topic.user_id, {
              headers: { Authorization: "Bearer: " + Cookies.get("token") },
            })
            .then((user) => {
              this.rows.push({
                sujet: topic.title,
                author:
                  user.data.user.first_name + " " + user.data.user.last_name,
                topic_id: topic.topic_id,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },

  methods: {
    async deleteTopic(data) {
      this.$q
        .dialog({
          title: "Confirmation:",
          message: "Supprimer les sujets sélectionnés?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          for (let topic of this.selected) {
            const top = await api.delete("/topic/" + topic.topic_id, {
              headers: { Authorization: "Bearer: " + Cookies.get("token") },
            });
          }
          this.refreshData();
        });
    },
    async refreshData(data) {
      this.rows = [];
      this.topicList = [];
      this.selected = [];
      api
        .get("/topic", {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then((topics) => {
          this.topicList = topics.data.topics;
          for (let topic of this.topicList) {
            api
              .get("/user/" + topic.user_id, {
                headers: { Authorization: "Bearer: " + Cookies.get("token") },
              })
              .then((user) => {
                this.rows.push({
                  sujet: topic.title,
                  author:
                    user.data.user.first_name + " " + user.data.user.last_name,
                  topic_id: topic.topic_id,
                });
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss"></style>
