<script setup lang="ts">
import { useArticlesStore } from "~/src/store/articles.store";

useHead({
  title: "News Articles - My Nuxt Blog",
  meta: [
    {
      name: "description",
      content:
        "Discover the latest news, updates, and insights on My Nuxt Blog. Stay informed with our curated selection of news articles and trending topics.",
    },
    {
      name: "keywords",
      content: "news, articles, blog, updates, trending, insights",
    },
    { property: "og:title", content: "News Articles - My Nuxt Blog" },
    {
      property: "og:description",
      content:
        "Stay informed with our latest news and updates on My Nuxt Blog, featuring a curated selection of articles on trending topics.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/lefr-1.webp" },
    { property: "og:url", content: "http://localhost:3000/en/news" },
    { property: "og:site_name", content: "My Nuxt Blog" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "tr_TR" },
  ],
});

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

// Tag filter and search state.
const selectedTag = ref("All");
const searchTerm = ref("");

const availableTags = computed(() => {
  const tagsSet = new Set<string>();
  articlesStore.articles.forEach((article) => {
    if (article.tags && article.tags.length) {
      article.tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return ["All", ...Array.from(tagsSet)];
});

const filteredArticles = computed(() => {
  let articles = articlesStore.articles;
  if (selectedTag.value !== "All") {
    articles = articles.filter((article) =>
      article.tags.includes(selectedTag.value)
    );
  }
  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term)
    );
  }
  return articles;
});

const newsArticles = computed(() =>
  filteredArticles.value.filter(
    (article) =>
      article.tags &&
      (article.tags.includes("news") ||
        article.tags.includes("haber") ||
        article.tags.includes("sport") ||
        article.tags.includes("spor"))
  )
);

const currentPage = ref(1);
const pageSize = ref(4);
const totalPages = computed(() =>
  Math.ceil(newsArticles.value.length / pageSize.value)
);
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return newsArticles.value.slice(start, start + pageSize.value);
});

watch([selectedTag, searchTerm], () => {
  currentPage.value = 1;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<template>
  <section class="blog-page container">
    <div class="container">
      <h2 class="section-title">{{ $t("header.title") }}</h2>
      <div class="filter-section">
        <TagFilter
          :tags="availableTags"
          :selected-tag="selectedTag"
          @update:selected-tag="selectedTag = $event"
        />
        <SearchFilter v-model="searchTerm" />
      </div>

      <ArticlesList :articles="paginatedArticles" />

      <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.blog-page {
  padding: 2rem 0;

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    text-align: left;
  }
}
</style>
