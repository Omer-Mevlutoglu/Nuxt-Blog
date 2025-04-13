<!-- src/components/organisms/ArticlesList.vue -->
<template>
  <div class="articles-list">
    <CardLarge
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  articles: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>
