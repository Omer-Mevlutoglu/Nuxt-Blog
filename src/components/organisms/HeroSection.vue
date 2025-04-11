<script setup lang="ts">
const { data: news } = await useAsyncData("news", () => {
  return queryCollection("news").all();
});
const leftArticles = computed(() => news.value?.slice(0, 3) ?? []);
const mainArticle = computed(() => news.value?.[3] || null);
const rightArticles = computed(() => news.value?.slice(4) ?? []);
</script>

<template>
  <section class="hero-section">
    <div class="hero-grid container">
      <!-- Left Column: 3 Large Articles -->
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

      <!-- Right Column: Smaller Articles -->
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
      gap: 1rem;
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
