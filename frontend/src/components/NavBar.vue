<template>
  <div class="nav-container">
    <img
      class="nav_logo"
      src="../assets/icon-left-font-monochrome-black.svg"
      alt="logo Groupomania"
    />
    <nav>
      <ul>
        <li>
          <router-link to="/Feeds">Accueil</router-link>
        </li>
        <li>
          <router-link to="/Profile">Mon profil</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-container {
  display: flex;
  justify-content: space-between;
}
.nav_logo {
  height: 50px;
  width: 150px;
}

a {
  text-decoration: none;
  color: black;
}
li {
  list-style: none;
}
</style>
