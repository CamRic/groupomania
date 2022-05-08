<template>
  <div class="topic-list-container">
    <q-table
      :rows="rows"
      :columns="columns"
      :row-key="(row) => row.topic_id"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      @row-click="goToTopicPage"
      style="border-radius: 0px 0px 25px 25px"
    >
    </q-table>
  </div>
</template>

<script>
import { useUserStore } from "../pinia/user.store";
import { useTopicStore } from "src/pinia/topic.store";
import { api } from "src/boot/axios";
import { Cookies } from "quasar";

const columns = [
  {
    name: "sujet",
    required: true,
    label: "Sujet",
    align: "left",
    field: (row) => row.sujet,
  },
  {
    name: "auteur",
    required: true,
    label: "Auteur",
    align: "left",
    field: (row) => row.auteur,
  },
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => row.date,
  },
];

export default {
  name: "TopicList",

  data() {
    const userStore = useUserStore();
    const topicStore = useTopicStore();
    var topicList = [];
    var rows = [];
    return {
      userStore,
      columns,
      rows,
      topicStore,
      topicList,
      pagination: { rowsPerPage: 10 },
    };
  },

  created(data) {
    api
      .get("http://localhost:3000/api/topic", {
        headers: { Authorization: "Bearer: " + Cookies.get("token") },
      })
      .then((topics) => {
        this.topicList = topics.data.topics;
        for (let i = 0; i < this.topicList.length; i++) {
          api
            .get(
              "http://localhost:3000/api/user/" + this.topicList[i].user_id,
              {
                headers: { Authorization: "Bearer: " + Cookies.get("token") },
              }
            )
            .then((user) => {
              var userName =
                user.data.user.first_name + " " + user.data.user.last_name;
              this.rows.push({
                sujet: this.topicList[i].title,
                auteur: userName,
                messages: this.topicList[i].replies.replies.length,
                date: this.topicList[i].createdAt
                  .split("T")
                  .join(" ")
                  .substring(0, 19),
                topic_id: this.topicList[i].topic_id,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    async goToTopicPage(evt, row, index) {
      //await this.topicStore.retrieveTopicData(row.topic_id);
      this.$router.push({
        path: "/topic/" + row.topic_id,
        query: { author: row.auteur },
      });
    },
  },
};
</script>

<style lang="scss"></style>
