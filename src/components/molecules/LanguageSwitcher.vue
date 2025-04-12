<template>
  <div class="language-switcher">
    <!-- Generate localized links for each available language -->
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="$switchLocalePath(loc.code)"
      :class="{ active: currentLocale === loc.code }"
    >
      {{ loc.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Auto-imported if enabled; otherwise import from '#imports'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { locales, locale, setLocale } = useI18n();
// Reactive current locale value
const currentLocale = locale;
</script>

<style scoped lang="scss">
@use "sass:color";

.language-switcher {
  display: flex;
  gap: 10px;

  a {
    padding: 5px 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
    color: $color-text-primary;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    text-decoration: none;

    &:hover {
      background-color: color.mix($color-primary, $color-white, 80%);
    }

    &.active {
      background-color: $color-primary;
      color: $color-white;
    }
  }
}

/* For screens smaller than 576px */
@media (max-width: 576px) {
  .language-switcher {
    gap: 5px;

    a {
      padding: 3px 7px; // Reduced padding for mobile screens
      font-size: 0.875rem; // Smaller font size for better fit
    }
  }
}
</style>
