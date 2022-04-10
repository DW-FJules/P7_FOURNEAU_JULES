import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Feeds from "@/views/Feeds.vue";
import Profile from "@/views/Profile.vue";
import store from "../store/index";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    props: true,
  },
  {
    name: "feeds",
    path: "/feeds",
    component: Feeds,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const user = await store.dispatch("init");
  if (user == null && to.name !== "home") {
    next({
      name: "home",
    });
  } else {
    next();
  }
});

export default router;
