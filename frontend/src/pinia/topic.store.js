import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Cookies } from "quasar";

export const useTopicStore = defineStore("topic_store", {
  state: () => ({
    isLoaded: false,
    topicObject: {},
    creatorFullName: "",
    topicPosts: [],
  }),

  getters: {
    getLoadedState(data) {
      return this.isLoaded;
    },
    getTopic(data) {
      return this.topicObject;
    },
    getTopicId(data) {
      return this.topicObject.topic_id;
    },
    getTopicCreatorId(data) {
      return this.topicObject.user_id;
    },
    getTopicCreatorName(data) {
      return this.creatorFullName;
    },
    getTopicLastUpdate(data) {
      return this.topicObject.updatedAt;
    },
    getTopicCreationDate(data) {
      return this.topicObject.createdAt;
    },
    getTopicTitle(data) {
      return this.topicObject.title;
    },
    getTopicBody(data) {
      return this.topicObject.body;
    },
    getTopicPostList(data) {
      return this.topicPosts;
    },
    getTopicImageUrl(data) {
      return this.topicObject.imageUrl;
    },
  },

  actions: {
    // récupérer les réponses d'un topic
    reloadTopicPostsList(topic_id, data) {
      this.topicPosts = null;
      api
        .get("/post/topic/" + topic_id, {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then((res) => {
          this.topicPosts = res.data.posts;
          for (let post of this.topicPosts) {
            api
              .get("/user/" + post.user_id, {
                headers: { Authorization: "Bearer: " + Cookies.get("token") },
              })
              .then((user) => {
                console.log(user);
                post["author"] =
                  user.data.user.first_name + " " + user.data.user.last_name;
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
    // données du topic
    async retrieveTopicData(topic_id, data) {
      this.isLoaded = false;
      this.topicObject = {};
      this.creatorFullName = "";
      this.topicPosts = [];
      // getting topic data from db
      const response = await api.get(
        "http://localhost:3000/api/topic/" + topic_id,
        {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        }
      );
      let obj = response.data.topic;
      obj["createdAt"] = obj["createdAt"].split("T").join(" ").substring(0, 19);
      this.topicObject = { ...obj };

      // getting user name from db
      const response2 = await api.get(
        "http://localhost:3000/api/user/" + this.topicObject.user_id,
        {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        }
      );
      this.creatorFullName =
        response2.data.user.first_name + " " + response2.data.user.last_name;

      // getting posts datas
      api
        .get("/post/topic/" + topic_id, {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then((res) => {
          this.topicPosts = res.data.posts;
          for (let post of this.topicPosts) {
            api
              .get("/user/" + post.user_id, {
                headers: { Authorization: "Bearer: " + Cookies.get("token") },
              })
              .then((user) => {
                console.log(user);
                post["author"] =
                  user.data.user.first_name + " " + user.data.user.last_name;
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
      this.isLoaded = true;
      return this.topicObject;
    },
    async deleteTopic(topic_id) {
      api
        .delete("/topic/" + topic_id, {
          headers: { Authorization: "Bearer " + Cookies.get("token") },
        })
        .then((res1) => console.log("topic deleted"))
        .catch((err) => console.log(err));
    },
  },
});
