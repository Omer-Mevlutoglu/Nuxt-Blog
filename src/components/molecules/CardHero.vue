<template>
  <article class="card card-hero">
    <div class="hero-img-wrapper">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="hero-img"
      >
      <div class="image-overlay" />
    </div>
    <div class="hero-content">
      <!-- Tag list for the hero card -->
      <div class="tag-list">
        <span v-for="(tag, index) in article.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
      <h2 class="hero-title">{{ article.title }}</h2>
      <p class="hero-description">{{ article.description }}</p>
      <AppButton
        :to="article.path"
        :label="$t('button.read_more')"
        variant="default"
        class="hero-link"
      />
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
  cursor: pointer;
  transition: all 0.3s ease;

  .hero-img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    margin-bottom: 1rem;

    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
      transition: transform 0.3s ease;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      transition: background-color 0.3s ease;
    }
  }

  .hero-content {
    padding: 1rem;

    .tag-list {
      margin-bottom: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;

      .tag {
        font-size: 0.7rem;
        background-color: rgba($color-primary, 0.1);  // use your primary color variable with transparency
        color: $color-primary;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }

  .hero-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }

  .hero-description {
    font-size: 1rem;
    color: $color-text-secondary;
    margin-bottom: 0.8rem;
  }

  .hero-link {
    font-weight: bold;
    transition: text-decoration 0.3s ease;
  }

  &:hover {
    .image-overlay {
      background: rgba(0, 0, 0, 0.2);
    }
    .hero-link {
      text-decoration: underline;
    }
  }
}
</style>
