<script setup lang="ts">
import { useTrendingStore } from "~/src/store/trending.store";
import { useDebounce } from "@vueuse/core";
const CardLarge = defineAsyncComponent(
  () => import("~/src/components/molecules/CardLarge.vue")
);
const SearchFilter = defineAsyncComponent(
  () => import("~/src/components/molecules/SearchFilter.vue")
);
const TagFilter = defineAsyncComponent(
  () => import("~/src/components/molecules/TagFilter.vue")
);
const PaginationControls = defineAsyncComponent(
  () => import("~/src/components/molecules/PaginationControls.vue")
);
useHead({
  title: "Trending Articles - My Nuxt Blog",
  meta: [
    {
      name: "description",
      content:
        "Explore the latest trending articles on My Nuxt Blog. Stay updated with top news, sports insights, and featured stories.",
    },
    {
      name: "keywords",
      content: "trending, articles, blog, news, sports, featured",
    },
    { property: "og:title", content: "Trending Articles - My Nuxt Blog" },
    {
      property: "og:description",
      content:
        "Discover the most popular trending articles on My Nuxt Blog. Get the latest updates on news, sports, and more.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/lefr-1.webp" },
    { property: "og:url", content: "http://localhost:3000/en/trending" },
    { property: "og:site_name", content: "My Nuxt Blog" },
    { property: "og:locale", content: "en_US" },
  ],
});

const trendingStore = useTrendingStore();

if (!trendingStore.trendingArticles.length && !trendingStore.loading) {
  trendingStore.fetchTrendingArticles();
}

const selectedTag = ref("All");
const searchTerm = ref("");
const debouncedSearchTerm = useDebounce(searchTerm, 300);

const availableTags = computed(() => {
  const tagsSet = new Set<string>();
  trendingStore.trendingArticles.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });
  return ["All", ...Array.from(tagsSet)];
});
const filteredArticles = computed(() => {
  let articles = trendingStore.trendingArticles;
  if (selectedTag.value && selectedTag.value !== "All") {
    articles = articles.filter((article) =>
      article.tags?.includes(selectedTag.value)
    );
  }
  if (debouncedSearchTerm.value?.trim()) {
    const term = debouncedSearchTerm.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term) ||
        article.body.toLowerCase().includes(term)
    );
  }
  return articles;
});

const getSequentialImage = (index: number) => {
  const imageCount = 9;
  const imageIndex = (index % imageCount) + 1;
  return `/images/${imageIndex}.webp`;
};

const currentPage = ref(1);
const pageSize = ref(4);
const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / pageSize.value)
);
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredArticles.value
    .slice(start, start + pageSize.value)
    .map((article, index) => ({
      ...article,
      image: getSequentialImage(start + index),
    }));
});

watch([selectedTag, searchTerm], () => {
  currentPage.value = 1;
});
const slideDirection = ref("");
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    slideDirection.value = "slide-left";
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    slideDirection.value = "slide-right";
    currentPage.value--;
  }
};
watch(currentPage, () => {
  setTimeout(() => {
    slideDirection.value = "";
  }, 500); // Match this with CSS transition duration
});
</script>

<template>
  <div class="trending-page container">
    <h1 class="section-title">{{ $t("trending.title") }}</h1>

    <div class="filter-section">
      <SearchFilter
        v-model="searchTerm"
        :placeholder="$t('trending.search_placeholder')"
      />
      <TagFilter
        v-model="selectedTag"
        :tags="availableTags"
        @update:selected-tag="selectedTag = $event"
      />
    </div>

    <div v-if="status === 'pending'" class="loading-indicator">
      <span class="loader" />
    </div>

    <div v-else-if="error" class="error-message">
      {{ $t("errors.loading_failed") }}
      <button @click="refresh">{{ $t("button.try_again") }}</button>
    </div>
    <div v-else>
      <div v-if="filteredArticles.length === 0" class="no-results">
        {{ $t("trending.no_results") }}
      </div>
      <div v-else class="articles-grid" :class="slideDirection">
        <CardLarge
          v-for="article in paginatedArticles"
          :key="article.id"
          :article="{
            ...article,
            description: article.body.substring(0, 60) + '.....',
            path: `/trending/${article.id}`,
            image: article.image,
          }"
          :variant="'primary'"
        />
      </div>

      <PaginationControls
        v-if="filteredArticles.length > pageSize"
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.trending-page {
  padding: 2rem 0;
  min-height: 80vh;
  animation: fadeIn 0.6s ease-out;

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: $color-text-primary;
    opacity: 1;
  }

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 1;
  }

  .loading-indicator {
    text-align: center;
    padding: 3rem;

    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #f3f3f3;
      border-radius: 50%;
      border-top: 5px solid $color-primary;
      animation: spin 1s linear infinite;
      display: inline-block;
    }
  }

  .error-message {
    text-align: center;
    padding: 2rem;
    color: #dc3545;

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: $color-primary;
      border: none;
      color: $color-white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: color.scale($color-primary, $lightness: -10%);
        transform: translateY(-2px);
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: $color-text-secondary;
    font-size: 1.2rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    opacity: 1;
    transition: all 0.5s ease-out;

    &.slide-left {
      animation: slideLeft 0.5s ease-out;
    }

    &.slide-right {
      animation: slideRight 0.5s ease-out;
    }
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(-10%);
    opacity: 0;
  }
  51% {
    transform: translateX(10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(10%);
    opacity: 0;
  }
  51% {
    transform: translateX(-10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
/* Responsive adjustments */
@media (max-width: $breakpoint-md) {
  .trending-page {
    padding: 2rem 1rem;

    .section-title {
      font-size: 2rem;
    }

    .articles-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  }
}
</style>
