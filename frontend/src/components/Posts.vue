<template>
  <div class="container">
    <form>
      <img class="aviIcon" />
      <div>
        <div></div>
        <h2></h2>
        <p></p>
      </div>
    </form>
    <div>
      <textarea
        class="text-field-text"
        placeholder="Ecrivez votre commentaire..."
      ></textarea>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState({
      getTokenUserIdFromVueX: "tokenUserFromVueX",
      emailUserFromVueX: "",
      pseudoUserFromVueX: "",
    }),
  },
  methods: {},
};
</script>

<style scoped>
.container {
  width: 700px;
  height: auto;
  padding: 52px 72px 56px 62px;
  margin-top: 50px;
  border-radius: 79px;
  justify-content: center;
  background-color: #ab3535;
}
.aviIcon {
  width: 120px;
  height: 120px;
  border-radius: 108px;
  border: solid 1px white;
  position: relative;
  right: 230px;
  margin: 10px;
  bottom: 20px;
}
.text-field-text {
  width: 500px;
  height: 150px;
}
</style>
