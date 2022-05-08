<template>
  <div>
    <q-card class="q-mb-md" style="width: 100%; max-width: 650px">
      <div class="list__header flex row justify-between q-pa-md">
        <h6 class="q-my-sm">Liste des utilisateurs</h6>
        <q-btn label="supprimer" color="red" @click="deleteUser" />
      </div>
      <q-separator size="2px" />
      <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="user_id"
        selection="multiple"
        v-model:selected="selected"
      />
    </q-card>
  </div>
</template>
<script>
const columns = [
  {
    name: "prenom",
    label: "Prénom",
    align: "left",
    field: (row) => row.prenom,
  },
  {
    name: "nom",
    label: "Nom",
    align: "left",
    field: (row) => row.nom,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: (row) => row.email,
  },
];

import { api } from "src/boot/axios";
import { Cookies, useQuasar } from "quasar";
import { Dialog } from "quasar";

export default {
  name: "UserList",

  data() {
    const $q = useQuasar();
    var userList = [];
    var rows = [];
    return {
      $q,
      userList,
      selected: [],
      columns,
      rows,
    };
  },

  created(data) {
    api
      .get("/user", {
        headers: { Authorization: "Bearer: " + Cookies.get("token") },
      })
      .then((users) => {
        this.userList = users.data.users;
        for (let user of this.userList) {
          this.rows.push({
            prenom: user.first_name,
            nom: user.last_name,
            email: user.email,
            user_id: user.user_id,
          });
        }
      })
      .catch((err) => console.log(err));
  },

  methods: {
    async deleteUser(data) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Suppression des utilisateurs sélectionnés?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          for (let user of this.selected) {
            await api.delete("/user/" + user.user_id, {
              headers: { Authorization: "Bearer: " + Cookies.get("token") },
            });
          }
          this.refreshData();
        });
    },
    async refreshData(data) {
      this.rows = [];
      this.userList = [];
      api
        .get("/user", {
          headers: { Authorization: "Bearer: " + Cookies.get("token") },
        })
        .then((users) => {
          this.userList = users.data.users;
          for (let user of this.userList) {
            this.rows.push({
              prenom: user.first_name,
              nom: user.last_name,
              email: user.email,
              user_id: user.user_id,
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss"></style>
