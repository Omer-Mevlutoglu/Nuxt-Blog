<!-- components/molecules/CardHero.vue -->
<template>
  <article class="card card-hero">
    <img
      v-if="article.image"
      :src="article.image"
      :alt="article.title"
      class="hero-img"
    >
    <div class="hero-content">
      <h2 class="hero-title">{{ article.title }}</h2>
      <p class="hero-description">{{ article.description }}</p>
      <NuxtLink :to="article.path" class="hero-link">Read more</NuxtLink>
    </div>
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
.card-hero {
  display: flex;
  flex-direction: column;
  .hero-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  .hero-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .hero-description {
    font-size: 1rem;
    color: $color-text-secondary;
    margin-bottom: 1rem;
  }
  .hero-link {
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
