<template>
  <div class="card">
    <router-link to="/feeds">home</router-link>
    <h1 class="card__title">Espace Perso</h1>
    <div class="first-name">{{ user.prenom }}</div>
    <div class="last-name">{{ user.nom }}</div>
    <div class="last-name">{{ user.email }}</div>
    <img :src="user.photo" />
    <button @click="logout()" class="button">Déconnexion</button>
    <div>
      <button @click="deleteProfile">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteProfile(){
      axios.delete(`/user/${this.user.id}`).then(() => {
        this.logout();
      })
    }
  },
};
</script>
<style>
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
</style>
>
