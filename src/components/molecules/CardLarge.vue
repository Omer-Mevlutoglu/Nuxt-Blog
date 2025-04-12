<template>
  <article class="card card-large">
    <div class="image-wrapper">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="card-img"
      >
      <div class="image-overlay" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-description">{{ article.description }}</p>
      <!-- Dynamic translation for the button label -->
      <AppButton
        :to="article.path"
        :label="$t('button.read_more')"
        variant="default"
        class="card-link"
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
.card-large {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;

  .image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    margin-bottom: 0.5rem;

    .card-img {
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
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
    }
  }

  .card-content {
    padding: 1rem;
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
    transition: text-decoration 0.3s ease;
  }

  &:hover {
 
    .image-overlay {
      background: rgba(0, 0, 0, 0.2);
    }
    .card-link {
      text-decoration: underline;
    }
  }
}
</style>
