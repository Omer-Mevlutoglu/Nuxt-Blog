<template>
  <NuxtLink :to="to" class="read-more-button">
    <slot>Read more</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.read-more-button {
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
}
</style>
