<template>
  <body>
    <form action="">
      <div class="last-name-container">
        <label for="last-name">Nom</label>
        <input type="text" autocomplete="off" id="last-name" />
        <span></span>
        <!--Plusieurs textes à injecter -> JS -->
      </div>
      <div class="first-name-container">
        <label for="first-name">Prénom</label>
        <input type="text" autocomplete="off" id="first-name" />
        <span></span>
      </div>
      <!--Plusieurs textes à injecter -> JS -->

      <div class="email-container">
        <label for="email">Email</label>
        <input type="text" autocomplete="off" id="email" />
        <span>Email incorrect</span>
        <!--Seule réponse proposée-->
      </div>

      <div class="password-container">
        <label for="password">Mot de passe</label>
        <input type="password" autocomplete="off" id="password" />
        <p id="progress-bar"></p>
        <span></span>
      </div>

      <div class="confirm-container">
        <label for="confirm">Confirmer mot de passe</label>
        <input type="password" autocomplete="off" id="confirm" />
        <span></span>
      </div>

      <input type="submit" value="Valider" />
    </form>
  </body>
</template>

<style scoped src="../assets/form.css"></style>
