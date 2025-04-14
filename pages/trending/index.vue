<script setup lang="ts">
const trendingEndpoint = "https://dummyjson.com/posts";

const { data, status, error, refresh } = await useFetch(trendingEndpoint, {
  default: () => ({ posts: [] }),
});

const trendingArticles = computed(() => data.value?.posts || []);

const selectedTag = ref("All");
const searchTerm = ref("");

const availableTags = computed(() => {
  const tagsSet = new Set<string>();
  trendingArticles.value.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });
  return ["All", ...Array.from(tagsSet)];
});

const filteredArticles = computed(() => {
  let articles = trendingArticles.value;

  if (selectedTag.value && selectedTag.value !== "All") {
    articles = articles.filter((article) =>
      article.tags?.includes(selectedTag.value)
    );
  }

  if (searchTerm.value?.trim()) {
    const term = searchTerm.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.body.toLowerCase().includes(term)
    );
  }

  return articles;
});

const getRandomImage = () => {
  const imageCount = 9;
  const randomIndex = Math.floor(Math.random() * imageCount) + 1;
  return `/images/trending/${randomIndex}.webp`;
};
// Pagination settings.
const currentPage = ref(1);
const pageSize = ref(8);
const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / pageSize.value)
);
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredArticles.value
    .slice(start, start + pageSize.value)
    .map((article) => ({
      ...article,
      image: getRandomImage(),
    }));
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

      <div v-else class="articles-grid">
        <CardLarge
          v-for="article in paginatedArticles"
          :key="article.id"
          :article="{
            ...article,
            description: article.body.substring(0, 150) + '...',
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
  padding: 4rem 0;
  min-height: 80vh;
  animation: fadeIn 0.6s ease-out;

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: $color-text-primary;
    transform: translateY(20px);
    opacity: 0;
    animation: slideDown 0.6s ease-out forwards;
  }

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    transform: translateY(20px);
    opacity: 0;
    animation: slideDown 0.6s ease-out forwards 0.2s;
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
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.6s ease-out forwards 0.4s;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
