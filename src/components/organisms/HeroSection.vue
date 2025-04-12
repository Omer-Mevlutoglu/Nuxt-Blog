<script setup lang="ts">
const { locale } = useI18n();
const currentLocale = locale.value; // The current locale, e.g., 'en' or 'tr'

// Fetch articles from the "news" collection with a filter on the 'locale' field.
const { data: news } = await useAsyncData("newsArticles", () =>
  queryCollection("news")
    .where("locale", "=", currentLocale)
    .order("date", "DESC")
    .all()
);

// Partition articles for the hero section layout:
const leftArticles = computed(() => news.value?.slice(0, 2) ?? []);
const mainArticle = computed(() => news.value?.[2] || null);
const rightArticles = computed(() => news.value?.slice(3) ?? []);
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

      <!-- Middle Column: Main Hero Article -->
      <div class="middle-column">
        <CardHero v-if="mainArticle" :article="mainArticle" />
      </div>

      <!-- Right Column: Smaller Article Cards -->
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
