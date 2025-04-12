<template>
  <article class="card card-small">
    <h4 class="small-title">{{ article.title }}</h4>
    <p class="small-summary">{{ article.description }}</p>
    <!-- Dynamic translation for the button label -->
    <AppButton
      :to="article.path"
      :label="$t('button.read_more')"
      variant="default"
      class="small-link"
    />
  </article>
</template>

<script setup lang="ts">
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.card-small {
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  .small-title {
    font-weight: 700;
    transition: text-decoration 0.3s ease;
  }

  .small-summary {
    font-size: 0.85rem;
    color: $color-text-secondary;
    transition: text-decoration 0.3s ease;
  }

  .small-link {
    font-weight: bold;
    transition: text-decoration 0.3s ease;
  }

  &:hover {
    .small-link {
      text-decoration: underline;
    }
  }
}
</style>
