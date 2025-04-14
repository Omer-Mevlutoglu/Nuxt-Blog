<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const slug = route.params.slug as string;
const { data: article } = await useAsyncData("article", () =>
  queryCollection("news")
    .where("slug", "=", slug)
    .where("locale", "=", locale.value)
    .first()
);

if (article.value) {
  useHead({
    title: article.value.title,
    meta: [{ name: "description", content: article.value.description }],
    link: [{ rel: "canonical", href: `/${article.value.slug}` }],
  });
}
</script>

<template>
  <div v-if="article" class="article-page container">
    <header class="article-header">
      <div class="article-meta">
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
      <h1 class="title">{{ article.title }}</h1>
      <p class="article-description">{{ article.description }}</p>
    </header>

    <div class="article-image-wrapper">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="article-image"
      >
    </div>

    <section class="article-content">
      <!-- Render the article's full content -->
      <ContentRenderer :value="article.meta.body as Record<string, any>" />
    </section>
  </div>
  <div v-else class="not-found container">
    <p>{{ $t("errors.article_not_found") }}</p>
    <NuxtLink to="/blog" class="back-link">{{ $t("button.go_back") }}</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";
.article-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease-out;

  .article-header {
    text-align: center;
    margin-bottom: 2rem;

    .article-meta {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      color: $color-text-secondary;

      .article-tags {
        display: flex;
        gap: 0.5rem;

        .tag {
          padding: 0.2rem 0.8rem;
          background-color: color.scale($color-primary, $lightness: 90%);
          border-radius: 9999px;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 0.7rem;
          color: $color-primary;
        }
      }
    }

    .title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: $color-text-primary;
      transform: translateY(20px);
      opacity: 0;
      animation: slideUp 0.6s ease-out forwards;
      animation-delay: 0.2s;
    }

    .article-description {
      font-size: 1.2rem;
      line-height: 1.6;
      color: $color-text-secondary;
      max-width: 600px;
      margin: 0 auto;
      transform: translateY(20px);
      opacity: 0;
      animation: slideUp 0.6s ease-out forwards;
      animation-delay: 0.4s;
    }
  }

  .article-image-wrapper {
    width: 100%;
    margin: 2rem auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.6s ease-out forwards;
    animation-delay: 0.6s;

    .article-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .article-content {
    font-size: 1rem;
    line-height: 1.6;
    color: $color-text-primary;
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.6s ease-out forwards;
    animation-delay: 0.8s;

    h2 {
      font-size: 1.8rem;
      margin: 2rem 0 1rem;
      color: $color-text-primary;
    }

    p {
      margin-bottom: 1.5rem;
    }

    a {
      color: $color-primary;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s ease;

      &:hover {
        border-color: $color-primary;
      }
    }
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

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
