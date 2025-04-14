<script setup lang="ts">
import { useArticlesStore } from "~/src/store/articles.store";

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

<template>
  <section class="hero-section">
    <div class="hero-grid container">
      <div v-if="articlesStore.loading" class="loader">Loading articles...</div>

      <div class="left-column">
        <CardLarge
          v-for="(article, index) in leftArticles"
          :key="index"
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
          v-for="(article, index) in rightArticles"
          :key="index"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  padding: 2rem 0;
  position: relative;

  /* Desktop screens: Above 1024px */
  .hero-grid {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr; // Three columns as originally provided
    gap: 1.5rem;
  }

  /* Middle screens: From 769px to 1024px */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    .hero-grid {
      display: grid;
      /* Two columns where left and middle appear side by side */
      grid-template-columns: 1fr 1fr;
      /* Define grid areas: left in the left column, middle in the right column on first row, then right spans across the second row */
      grid-template-areas:
        "left middle"
        "right right";
    }
    .hero-grid > .left-column {
      grid-area: left;
      /* Maintain column styling */
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .hero-grid > .middle-column {
      grid-area: middle;
    }
    .hero-grid > .right-column {
      grid-area: right;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  /* Mobile screens: 768px and below */
  @media screen and (max-width: 768px) {
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "left"
        "middle"
        "right";
    }
    .hero-grid > .left-column,
    .hero-grid > .middle-column,
    .hero-grid > .right-column {
      grid-area: auto; /* Let each occupy full width */
    }
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
}
</style>
