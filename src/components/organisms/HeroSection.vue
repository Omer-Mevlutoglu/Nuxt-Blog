<!-- components/organisms/HeroSection.vue -->
<template>
  <section class="hero-section container">
    <div class="hero-grid">
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

<script setup lang="ts">
const leftArticles = ref([
  {
    title: "Left Article 1",
    description: "This is a longer description for the first left article.",
    image: "/images/data.png",
    path: "/news/article-1",
  },
  {
    title: "Left Article 2",
    description: "Another description text goes here.",
    image: "/images/data.png",
    path: "/news/article-2",
  },
  {
    title: "Left Article 3",
    description: "Yet another article in the left column.",
    image: "/images/data.png",

    path: "/news/article-3",
  },
]);

const mainArticle = ref({
  title: "Main Feature: Helicopter Crash in NY",
  description: "Details about the accident, rescue updates, and more.",
  image: "/images/data.png",

  path: "/news/main-article",
});

const rightArticles = ref([
  {
    title: "Headline: Breaking News",
    description: "Short summary for the right column article.",
    path: "/news/article-4",
  },
  {
    title: "Headline: Market Crash",
    description: "Stock markets tumble after major announcements.",
    path: "/news/article-5",
  },
  {
    title: "Headline: Technology Updates",
    description: "Latest trends in the tech world.",
    path: "/news/article-6",
  },
]);
</script>

<style scoped lang="scss">
.hero-section {
  padding: 2rem 0;

  .hero-grid {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr; /* Adjust the ratio as needed */
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
      grid-template-columns: 1fr; /* Stack all columns on smaller screens */
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

  // Responsive layout
}
</style>
