<template>
    <article class="card card-large">
      <!-- Image could be optional; adapt as needed -->
      <img v-if="article.image" :src="article.image" :alt="article.title" class="card-img" >
      <div class="card-content">
        <h3 class="card-title">{{ article.title }}</h3>
        <p class="card-description">{{ article.description }}</p>
        <NuxtLink :to="article.path" class="card-link">Read more</NuxtLink>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  defineProps({
    article: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped lang="scss">
  .card-large {
    display: flex;
    flex-direction: column;
    .card-img {
      width: 100%;
      height: auto;
      object-fit: cover;
      margin-bottom: 0.5rem;
    }
    .card-title {
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
    }
    .card-description {
      font-size: 0.95rem;
      color: $color-text-secondary;
    }
    .card-link {
      margin-top: 0.5rem;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  </style>
  