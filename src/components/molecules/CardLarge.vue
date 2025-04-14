<template>
  <article class="card card-large">
    <div class="image-wrapper">
      <NuxtImg 
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="card-img"
        loading="lazy"
        preload 
      >
      <div class="image-overlay" />
    </nuxtimg></div>
    <div class="card-content">
      <div class="tag-list">
        <span v-for="(tag, index) in article.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-description">{{ article.description }}</p>
      <AppButton
        :to="article.path"
        :label="$t('button.read_more')"
        :variant="variant"
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
  variant: {
    type: String,
    default: "default",
  },
});
</script>

<style scoped lang="scss">
.card-large {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 480px;
  width: 100%;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    margin-bottom: 0.5rem;
    
    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem 0.5rem 0 0;
      transition: transform 0.3s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      border-radius: 0.5rem 0.5rem 0 0;
      transition: background-color 0.3s ease;
    }
  }
  
  .card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    
    .tag-list {
      margin-bottom: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      
      .tag {
        font-size: 0.7rem;
        background-color: rgba($color-primary, 0.1);
        color: $color-primary;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
    
    .card-title {
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
    
    .card-description {
      font-size: 0.88rem;
      color: $color-text-secondary;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
      line-height: 1.5;
    }
    
    .card-link {
      margin-top: auto;
      font-weight: bold;
      transition: text-decoration 0.3s ease;
    }
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    
    .card-img {
      transform: scale(1.05);
    }
    
    .image-overlay {
      background: rgba(0, 0, 0, 0.2);
    }
    
    .card-link {
      text-decoration: underline;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .card-large {
    height: 460px;
    
    .image-wrapper {
      height: 200px;
    }
  }
}

@media (max-width: 768px) {
  .card-large {
    height: 440px;
    
    .image-wrapper {
      height: 180px;
    }
    
    .card-content {
      .card-title {
        font-size: 1rem;
      }
      
      .card-description {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
