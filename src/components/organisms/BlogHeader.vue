<script setup lang="ts">
import { defineAsyncComponent } from "vue";
// Load LanguageSwitcher asynchronously if it's heavy or rarely used on first paint.
const LanguageSwitcher = defineAsyncComponent(
  () => import("~/src/components/molecules/LanguageSwitcher.vue")
);
</script>

<template>
  <header class="blog-header">
    <div class="container header-container">
      <!-- Logo -->
      <div class="logo">
        <NuxtLink :to="$localePath({ name: 'index' })">NXT</NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <NuxtLink :to="$localePath({ name: 'index' })">{{
          $t("header.home")
        }}</NuxtLink>
        <NuxtLink :to="$localePath('/news')">{{ $t("header.blog") }}</NuxtLink>
        <NuxtLink :to="$localePath('/trending')">{{
          $t("header.trending")
        }}</NuxtLink>
      </nav>

      <!-- Language Switcher loaded asynchronously -->
      <div class="language-switcher">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.blog-header {
  background-color: $color-white;
  border-bottom: 1px solid $color-border;
  padding: $header-padding;
  width: 100%;
  box-sizing: border-box;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .logo {
    font-size: $font-size-logo;
    font-weight: $font-weight-logo;

    a {
      text-decoration: none;
      color: $color-text-primary;
    }
  }

  .nav-menu {
    display: flex;
    gap: $nav-gap;
    flex-wrap: wrap;

    a {
      text-decoration: none;
      color: $color-text-secondary;
      transition: color 0.3s;
      white-space: nowrap;

      &:hover {
        color: $color-text-hover;
        /* Hint the browser to optimize hover animations */
        will-change: color;
      }
    }
  }
}
</style>
