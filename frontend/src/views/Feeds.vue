<template>
  <div>
    <nav-bar></nav-bar>
    <form @submit.prevent="addPost">
      <input
        type="text"
        v-model="content"
        placeholder="Postez quelque chose ici..."
      />
      <input type="file" @change="uploadFile" />
      <button type="submit">Ajouter</button>
    </form>
    <div class="feed">
      <p @click="sortByDate">Trier par les plus récents</p>
      <div class="container" v-for="post in posts" :key="post.id">
        <div class="post-container">
          <div v-if="user.id === post.authorId || user.role === 'admin'">
            <button @click="deletePost(post.id)">supprimer</button>
          </div>
          <div class="author-id">
            {{ post.user.prenom }} {{ post.user.nom }}
          </div>
          <div class="post-content">
            <!-- doit contenir le post -->
            {{ post.content }}
          </div>
          <img :src="post.imageUrl" v-if="post.imageUrl" />
          <div>Fait le {{ post.date }}</div>
        </div>

        <comment-form @addComment="addComment($event, post.id)"></comment-form>
        <div v-for="comment in post.comments" :key="comment.id">
          <div>{{ comment.content }} par {{ comment.username }} <button v-if="user.id === comment.authorId || user.role === 'admin'" @click="deleteComment(comment)">supprimer</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import CommentForm from "../components/CommentForm.vue";
import { DateTime } from "luxon";
export default {
  name: "Feeds",
  components: {
    NavBar,
    CommentForm,
  },
  data() {
    return {
      posts: [],
      content: "",
      file: null,
    };
  },
  mounted() {
    axios.get("/post/feeds").then((res_post) => {
      res_post.data.forEach((post) => {
        post.date = DateTime.fromISO(post.date).toFormat("dd/MM/yyyy HH:mm")
        axios.get(`/user/${post.authorId}`).then((res_user) => {
          axios.get("/comment/"+post.id).then((res_comment) => {
            this.posts.push({
              ...post,
              user: res_user.data,
              comments: res_comment.data
            })
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    sortByDate(){
      this.posts.sort((postA, postB) => {
        return new Date(postA.date).valueOf() - new Date(postB.date).valueOf()
      });
      this.posts.reverse();
    },
    deleteComment(comment){
      axios.delete(`/comment/${comment.id}`).then(() => {
        for(let i = 0; i < this.posts.length; i++){
          if(this.posts[i].id === comment.postId){
            this.posts[i].comments = this.posts[i].comments.filter((comment_existed) => {
              return comment_existed.id !== comment.id;
            });
            break;
          }
        }
      })
    },
    addPost() {
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append(
        "post",
        JSON.stringify({
          authorId: this.user.id,
          content: this.content,
        })
      );
      axios
        .post("/post", formData)
        .then((res) => {

          this.posts.push({
            ...res.data,
            user: this.user,
            comments: []
            });
          this.sortByDate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadFile(event) {
      this.file = event.target.files[0];
    },
    deletePost(postId){
      axios.delete(`/post/${postId}`).then(() => {
        this.posts = this.posts.filter((post) => {
          return post.id !== postId;
        });
      })
      .catch((error) => {
        console.log(error);
      });
    },
    addComment(content, postId) {
      axios
        .post("/comment", {
          authorId: this.user.id,
          postId: postId,
          content: content,
          username: `${this.user.prenom} ${this.user.nom}`,
        })
        .then((res) => {
          for (let i = 0; this.posts.length; i++) {
            if (this.posts[i].id === postId) {
              this.posts[i].comments.push(res.data);
              break;
            }
          }
        });
    },
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
};
</script>

<style scoped>
.feed {
  width: 1000px;
  height: auto;
  padding: 52px 72px 56px 62px;
  margin-top: 50px;
  border-radius: 20px;
  justify-content: center;
  background-color: #b4aeae;
}
.container {
  width: 700px;
  height: auto;
  padding: 52px 72px 56px 62px;
  margin-top: 50px;
  border-radius: 20px;
  justify-content: center;
  background-color: #c9c5c5;
}
img {
  width: 200px;
}
input {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  min-height: 100px;
  color: black;
}
form {
  display: flex;
  background-color: grey;
}
</style>
