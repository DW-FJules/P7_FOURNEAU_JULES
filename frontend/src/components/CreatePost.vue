<template>
  <div class="container">
    <div>
      <img class="aviIcon" />
      <h1 class="pseudo"></h1>
    </div>
    <form @submit.prevent enctype="multipart/form-data">
      <div>
        <input
          v-model="title"
          id="title"
          class="text-field-title"
          placeholder="Ecrivez un titre"
          type="text"
          required
        />
      </div>
      <div>
        <textarea
          v-model="content"
          id="content"
          class="text-field-text"
          placeholder="Ecrivez votre message..."
          required
        ></textarea>
      </div>
      <div class="send-text">
        <img />
        <button @click="createPost()" type="submit" class="btn-send">
          Envoyer
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      //image
    };
  },
  computed: {
    ...mapState({
      getTokenUserFromVuex: "tokenUserFromVueX",
      getUserIdFromVueX: "userIdFromVueX",
    }),
  },
  methods: {
    createPost() {
      try {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        this.$store.dispatch("createPost", {
          formData: formData,
          token: this.getTokenUserFromVuex,
        });
        this.title = "";
        this.content = "";
        //this.image_url= null;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 700px;
  height: auto;
  margin-top: 50px;
  padding: 52px 72px 56px 62px;
  border-radius: 79px;
  justify-content: center;
  background-color: #ab3535;
}
.text-field-title {
  width: 150px;
  height: 20px;
  position: relative;
  bottom: 50px;
  right: 175px;
  margin-top: 40px;
}
.text-field-text {
  width: 500px;
  height: 150px;
}
.aviIcon {
  width: 120px;
  height: 120px;
  border-radius: 108px;
  border: solid 1px white;
  position: relative;
  right: 230px;
  bottom: 20px;
  margin: 10px;
}
.pseudo {
  position: relative;
  bottom: 110px;
  right: 110px;
  color: white;
}
.btn-send {
  width: 100px;
  height: 50px;
  border-radius: 16px;
  margin: 20px;
  border: none;
}
</style>
