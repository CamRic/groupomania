import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Cookies, Notify } from "quasar";

export const useUserStore = defineStore("user_store", {
  state: () => ({
    loggedIn: false,
    user_email: "",
    user_id: "",
    user_first_name: "",
    user_last_name: "",
    user_access_level: "",
  }),

  getters: {
    getUserId(state) {
      return state.user_id;
    },
    getUserEmail(state) {
      return state.user_email;
    },
    getFirstName(state) {
      return state.user_first_name;
    },
    getUserName(state) {
      return state.user_first_name + " " + state.user_last_name;
    },
    getLastName(state) {
      return state.user_last_name;
    },
    isLogged(state) {
      return state.loggedIn;
    },
    getUseRole(state) {
      return state.user_access_level;
    },
  },

  actions: {
    async userLogin(inEmail, inPassword) {
      api
        .post("/user/login", {
          email: inEmail,
          password: inPassword,
        })
        .then((response) => {
          var d = new Date();
          d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
          document.cookie =
            "token=" + response.data.token + ";expires=" + d.toUTCString();
          document.cookie =
            "user_role=" +
            response.data.user_role +
            ";expires=" +
            d.toUTCString();
          console.log(response);
          this.loggedIn = true;
          this.user_email = response.data.user_email;
          this.user_id = response.data.user_id;
          this.user_first_name = response.data.user_firstName;
          this.user_last_name = response.data.user_lastName;
          this.user_access_level = response.data.user_role;
          Notify.create({
            message: "Bienvenue " + response.data.user_firstName + "!",
            timeout: 2500,
            position: "top",
          });
          return true;
        })
        .catch((err) => {
          console.log(err);
          Notify.create({
            message: "Mot de passe ou email invalide",
            timeout: 2000,
          });
          return false;
        });
    },
    retrieveConnection() {
      api({
        method: "post",
        url: "http://localhost:3000/api/user/retrieve",
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
        .then((res) => {
          console.log(res);
          console.log(response);
          this.loggedIn = true;
          this.user_email = response.data.user_email;
          this.user_id = response.data.user_id;
          this.user_first_name = response.data.user_firstName;
          this.user_last_name = response.data.user_lastName;
          this.user_access_level = res.data.user_role;
        })
        .catch((err) => console.log(err));
    },
    getCookie(name) {
      // return document.cookie.split(";").some((c) => {
      //   return c.trim().startsWith(name + "=");
      // });
      let isOk = false
      document.cookie.split(";").some((c) => {
        if (c.trim().startsWith(name + "=") && !c.trim().endsWith("="))
          isOk = true
      })
      return isOk
    },
    deleteCookie(name) {
      document.cookie.split(";").some((c) => {
        if (c.trim().startsWith(name + "=")) {
          console.log('coookiee')
          document.cookie = name + "=" + ";expires=-1";
        }
      })

    },
    disconnect() {
      this.loggedIn = false;
      this.user_email = "";
      this.user_id = "";
      this.user_first_name = "";
      this.user_last_name = "";
      this.user_access_level = "";
      this.deleteCookie("token");
      this.deleteCookie("user_role");
    },
    async deleteUser(data) {
      const userID = this.user_id
      console.log('store id: ' + this.user_id, '|| funct id: ' + userID)
      await api
        .delete("/post/user/" + this.user_id, {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then(async () => {
          await api
            .delete("/topic/user/" + this.user_id, {
              headers: { Authorization: "Bearer: " + Cookies.get("token") },
            })
            .then(async () => {
              console.log('store id: ' + this.user_id, '|| funct id: ' + userID)
              await api
                .delete("/user/" + this.user_id, {
                  headers: { Authorization: "Bearer: " + Cookies.get("token") },
                })
                .then((row) => {
                  console.log("user deleted " + row);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      this.loggedIn = false;
    },
    async resetData(data) {
      api
        .get("/user/" + this.user_id, {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then((user) => {
          this.user_email = user.data.user.email;
          this.user_first_name = user.data.user.first_name;
          this.user_last_name = user.data.user.last_name;
          this.user_access_level = user.data.user_role;
        })
        .catch((err) => console.log(err));
    },
  },
});
