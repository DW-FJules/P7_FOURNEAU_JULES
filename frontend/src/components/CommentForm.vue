<template>
  <form @submit.prevent="$emit('addComment', content)">
    <textarea
      class="text-field-text"
      placeholder="Ecrivez votre commentaire..."
      v-model="content"
    ></textarea>
    <button type="submit">ajouter commentaire</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      content: null,
    };
  },
};
</script>
