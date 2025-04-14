<template>
  <article class="card card-small">
    <h4 class="small-title">{{ article.title }}</h4>
    <p class="small-summary">{{ article.description }}</p>
    <AppButton
      :to="article.path"
      :label="$t('button.read_more')"
      variant="default"
      class="small-link"
    />
    <div class="tag-list">
      <span v-for="(tag, index) in article.tags" :key="index" class="tag">
        {{ tag }}
      </span>
    </div>
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

  .tag-list {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;

    .tag {
      font-size: 0.65rem;
      background-color: rgba($color-primary, 0.08);
      color: $color-primary;
      padding: 0.15rem 0.4rem;
      border-radius: 9999px;
      text-transform: uppercase;
      font-weight: 500;
    }
  }

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
