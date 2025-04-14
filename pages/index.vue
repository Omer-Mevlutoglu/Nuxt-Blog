<template>
  <div class="home">
    <Suspense>
      <template #default>
        <HeroSection />
      </template>
      <template #fallback>
        <div>Loading hero section...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SportsSection />
      </template>
      <template #fallback>
        <div>Loading sports section...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <FeaturedSlider />
      </template>
      <template #fallback>
        <div>Loading featured slider...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
useHead({
  title: "Home - My Nuxt Blog",
  meta: [
    {
      name: "description",
      content:
        "Welcome to My Nuxt Blog - your source for the latest news, sports updates, and featured articles.",
    },
    {
      name: "keywords",
      content: "Nuxt, Blog, News, Sports, Articles, Featured",
    },
    { property: "og:title", content: "Home - My Nuxt Blog" },
    {
      property: "og:description",
      content:
        "Explore a world of news and updates on My Nuxt Blog, featuring the latest in sports and featured stories.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/lefr-1.webp" },
    { property: "og:url", content: "http://localhost:3000/en" },
  ],
});

// Dynamically importing components to reduce initial bundle size
const HeroSection = defineAsyncComponent(
  () => import("~/src/components/organisms/HeroSection.vue")
);
const SportsSection = defineAsyncComponent(
  () => import("~/src/components/organisms/SportsSection.vue")
);
const FeaturedSlider = defineAsyncComponent(
  () => import("~/src/components/organisms/FeaturedSlider.vue")
);
</script>
