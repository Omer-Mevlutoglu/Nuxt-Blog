<template>
  <article class="card card-small">
    <h4 class="small-title">{{ article.title }}</h4>
    <p class="small-summary">{{ article.description }}</p>
    <NuxtLink :to="article.path" class="small-link">Read more</NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.card-small {
  margin-bottom: 1rem;
  .small-title {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .small-summary {
    font-size: 0.85rem;
    color: $color-text-secondary;
  }
  .small-link {
    display: inline-block;
    margin-top: 0.25rem;
    font-size: 0.85rem;
    color: $color-text-primary;
  }
}
</style>
