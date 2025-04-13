<script setup lang="ts">
import { useRoute } from "vue-router";

// Get the dynamic slug from the route
const route = useRoute();
const slug = route.params.slug as string;

// Fetch the article with the matching slug from the "news" collection.
const { data: article } = await useAsyncData("article", () =>
  queryCollection("news").where("slug", "=", slug).first()
);

// Update page metadata for SEO once the article is fetched.
if (article.value) {
  useHead({
    title: article.value.title,
    meta: [
      { name: "description", content: article.value.description },
      // You can add more meta tags as needed
    ],
  });
}
</script>

<template>
  <div v-if="article" class="article-page container">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <p class="article-description">{{ article.description }}</p>
      <!-- Display image if provided -->
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="article-image"
      >
    </header>
    <section class="article-content">
      <!-- TODO FIND A WAY TO GET AND DISPLAY THE CONTENT FROM ARTICLES -->
      <ContentRenderer :value="article" />
    </section>
  </div>
  <div v-else class="not-found container">
    <p>{{ $t("errors.article_not_found") }}</p>
    <NuxtLink to="/blog">{{ $t("button.go_back") }}</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.article-page {
  padding: 2rem 0;
  .article-header {
    margin-bottom: 2rem;
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .article-description {
      font-size: 1.1rem;
      color: $color-text-secondary;
      margin-bottom: 1rem;
    }
    .article-image {
      width: 50%;
      border-radius: 10px;
      margin-bottom: 1rem;
      object-fit: cover;
    }
  }
  .article-content {
    font-size: 1rem;
    line-height: 1.6;
    color: $color-text-primary;
  }
}

.not-found {
  text-align: center;
  padding: 2rem 0;
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
}
</style>
