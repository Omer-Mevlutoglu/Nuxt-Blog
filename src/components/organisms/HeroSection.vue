<script setup lang="ts">
import { useArticlesStore } from "~/src/store/articles.store";
// Get the articles store instance
const articlesStore = useArticlesStore();

// Fetch articles when the component mounts
articlesStore.fetchArticles();

// Partition the articles for layout
const leftArticles = computed(() => articlesStore.articles.slice(0, 2));
const mainArticle = computed(() => articlesStore.articles[2] || null);
const rightArticles = computed(() => articlesStore.articles.slice(3, 6));
</script>

<template>
  <section class="hero-section">
    <div class="hero-grid container">
      <!-- Left Column: Large Article Cards -->
      <div class="left-column">
        <CardLarge
          v-for="(article, index) in leftArticles"
          :key="index"
          :article="article"
        />
      </div>

      <!-- Middle Column: Hero Article -->
      <div class="middle-column">
        <CardHero v-if="mainArticle" :article="mainArticle" />
      </div>

      <!-- Right Column: Small Article Cards -->
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

  .hero-grid {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    gap: 1.5rem;

    .left-column,
    .right-column {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .left-column,
    .right-column {
      flex-direction: row;
      gap: 0.5rem;
    }
    .left-column {
      flex-wrap: wrap;
    }
  }
}
</style>
