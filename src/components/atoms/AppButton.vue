<template>
  <NuxtLink :to="to" :class="['app-button', variantClass]">
    <!-- If a label prop is provided, display it; otherwise, use the default slot -->
    <span v-if="label">{{ label }}</span>
    <slot v-else />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  to: string;
  label?: string;
  variant?: "primary" | "secondary" | "default";
}>();

// Determine the variant class; default to "primary" if not specified.
const variantClass = computed(() => {
  return props.variant ? `app-button--${props.variant}` : "app-button--primary";
});
</script>

<style scoped lang="scss">
@use "sass:color";
.app-button {
  font-weight: bold;
  border-radius: 4px;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &.app-button--primary {
    background-color: $color-primary;
    padding: 5px 5px;
    color: $color-white;
    width: 50%;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 15px;
    &:hover {
      background-color: color.scale($color-primary, $lightness: 10%);
      text-decoration: none;
    }
  }

  &.app-button--secondary {
    background-color: $color-white;
    padding: 5px 5px;
    color: $color-primary;
    border: 1px solid $color-primary;
    &:hover {
      background-color: color.scale($color-primary, $lightness: 90%);
    }
  }

  &.app-button--default {
    background-color: transparent;
    color: $color-text-primary;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
