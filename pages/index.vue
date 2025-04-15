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
    { property: "og:image", content: "/favicon.ico" },
    { property: "og:url", content: "https://nuxt-blog-phi-rose.vercel.app/en" },
    { property: "og:site_name", content: "My Nuxt Blog" },
    { property: "og:locale", content: "en_US" },
    // Twitter Card tags:
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Home - My Nuxt Blog" },
    { name: "twitter:description", content: "Explore a world of news and updates on My Nuxt Blog." },
    { name: "twitter:image", content: "/favicon.ico" },
  ],
  link: [
    // Canonical URL:
    { rel: "canonical", href: "https://nuxt-blog-phi-rose.vercel.app/en" },
    // Alternate language links (if you have multiple languages):
    { rel: "alternate", hreflang: "en", href: "https://nuxt-blog-phi-rose.vercel.app/en" },
    { rel: "alternate", hreflang: "tr", href: "https://nuxt-blog-phi-rose.vercel.app/tr" },
  ],
  script: [
    // Example: Structured data using JSON-LD
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://nuxt-blog-phi-rose.vercel.app/en",
        "name": "My Nuxt Blog",
        "publisher": {
          "@type": "Organization",
          "name": "My Nuxt Blog",
          "logo": {
            "@type": "ImageObject",
            "url": "https://nuxt-blog-phi-rose.vercel.app/favicon.ico"
          }
        }
      })
    }
  ]
});

// Dynamically importing components to reduce initial bundle size
const HeroSection = defineAsyncComponent(() =>
  import("~/src/components/organisms/HeroSection.vue")
);
const SportsSection = defineAsyncComponent(() =>
  import("~/src/components/organisms/SportsSection.vue")
);
const FeaturedSlider = defineAsyncComponent(() =>
  import("~/src/components/organisms/FeaturedSlider.vue")
);
</script>
