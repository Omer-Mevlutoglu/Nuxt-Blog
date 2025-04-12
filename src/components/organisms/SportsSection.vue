<template>
  <section class="sports-news-section">
    <div class="container">
      <h2 class="section-title">{{ $t("sports.title") }}</h2>
      <div class="articles-list">
        <CardLarge
          v-for="(article, index) in sportsArticles"
          :key="index"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useArticlesStore } from "~/src/store/articles.store";

const articlesStore = useArticlesStore();
// Filter articles where tags contain "sport" (or "sports")
const sportsArticles = computed(() =>
  articlesStore.articles.filter(
    (article) =>
      article.tags.includes("sport") || article.tags.includes("sports")
  )
);
</script>

<style scoped lang="scss">
.sports-news-section {
  padding: 2rem 0;
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    text-align: left;
  }
  .articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}
</style>
