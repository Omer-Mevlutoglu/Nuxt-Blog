<!-- src/components/organisms/NewsSlider.vue -->
<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useArticlesStore } from "~/src/store/articles.store";

const articlesStore = useArticlesStore();
const { locale } = useI18n();

// Fetch articles on mount and when the locale changes.
onMounted(() => {
  articlesStore.fetchArticles();
});
watch(
  () => locale.value,
  () => {
    articlesStore.fetchArticles();
  }
);

// Filter articles that include an image.
const sliderArticles = computed(() =>
  articlesStore.articles.filter((article) => !!article.image)
);


const breakpoints = {
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  600: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  991: {
    itemsToShow: 3,
    snapAlign: "start",
  },
};
</script>

<template>
  <section class="news-slider-section">
    <div class="container">
      <h2 class="section-title">{{ $t("featured.title") }}</h2>
      <Carousel
        id="news-slider"
        :settings="{
          itemsToShow: 1,
          snapAlign: 'center',
        }"
        :breakpoints="breakpoints"
        :autoplay="1000"
        :pause-autoplay-on-hover="true"
        :wrap-around="true"
        navigation
        pagination
      >
        <Slide v-for="(article, index) in sliderArticles" :key="index">
          <SliderCard :article="article" />
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-slider-section {
  margin-top: 80px;
  padding: 2rem 0 4rem 0;

  .section-title {
    font-size: 1.75rem;
    text-align: left;
    margin-bottom: 1.5rem;
    color: $color-text-primary;
  }
  :deep(.carousel__slide) {
    padding: 0 8px;
  }
}
</style>
