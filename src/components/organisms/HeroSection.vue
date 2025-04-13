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
    (article) => article.tags && (article.tags.includes("news") || article.tags.includes("haber"))
  )
);

// Partition articles for layout
const leftArticles = computed(() => newsArticles.value.slice(0, 2));
const mainArticle = computed(() => newsArticles.value[2] || null);
const rightArticles = computed(() => newsArticles.value.slice(2, 6));
</script>

<template>
  <section class="hero-section">
    <div class="hero-grid container">
      <!-- Loader overlay; always rendered but visible only when loading -->
      <div v-if="articlesStore.loading" class="loader">Loading articles...</div>

      <!-- Left Column: Large Article Cards -->
      <div class="left-column">
        <CardLarge
          v-for="(article, index) in leftArticles"
          :key="index"
          :article="article"
        />
      </div>

      <!-- Middle Column: Featured Hero Article -->
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
  position: relative; // Needed for the loader overlay positioning

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

  /* Loader styles: absolute overlay that doesn't unmount the component */
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
