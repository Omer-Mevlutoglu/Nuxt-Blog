<template>
  <section class="hero-section">
    <div class="hero-grid container">
      <div v-if="articlesStore.loading" class="loader">Loading articles...</div>

      <div class="left-column">
        <CardLarge
          v-for="article in leftArticles"
          :key="article.id"
          :article="{
            ...article,
            description: article.description.substring(0, 60) + '.....',
          }"
        />
      </div>

      <div class="middle-column">
        <CardHero v-if="mainArticle" :article="mainArticle" />
      </div>

      <div class="right-column">
        <CardSmall
          v-for="article in rightArticles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useArticlesStore } from "~/src/store/articles.store";
import { useI18n } from "#imports";

// Access the articles store and locale.
const articlesStore = useArticlesStore();
const { locale } = useI18n();

onMounted(() => {
  articlesStore.fetchArticles();
});

watch(
  () => locale.value,
  () => {
    articlesStore.fetchArticles();
  }
);

const newsArticles = computed(() =>
  articlesStore.articles.filter(
    (article) =>
      article.tags &&
      (article.tags.includes("news") || article.tags.includes("haber"))
  )
);

const leftArticles = computed(() => newsArticles.value.slice(0, 2));
const mainArticle = computed(() => newsArticles.value[2] || null);
const rightArticles = computed(() => newsArticles.value.slice(2, 6));
</script>

<style scoped lang="scss">
.hero-section {
  padding: 2rem 0;
  position: relative;
  
  .hero-grid {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr; 
    gap: 1.5rem;
  }
  
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.8);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    color: $color-text-secondary;
    z-index: 10;
  }
  
  /* Medium screens: left & middle full width, right below */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    .hero-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "left middle"
        "right right";
    }
    .hero-grid > .left-column {
      grid-area: left;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .hero-grid > .middle-column {
      grid-area: middle;
    }
    .hero-grid > .right-column {
      grid-area: right;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  /* Mobile screens: each column full width */
  @media screen and (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "left"
        "middle"
        "right";
    }
    .hero-grid > .left-column,
    .hero-grid > .middle-column,
    .hero-grid > .right-column {
      grid-area: auto;
    }
  }
}
</style>
