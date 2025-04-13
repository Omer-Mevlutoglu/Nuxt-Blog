<template>
  <div class="tag-filter">
    <button
      v-for="(tag, index) in tags"
      :key="index"
      :class="{ active: tag === selectedTag }"
      @click="$emit('update:selectedTag', tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["update:selectedTag"]);

defineProps({
  tags: {
    type: Array as () => string[],
    required: true,
  },
  selectedTag: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    background: #f0f0f0;
    border-radius: 20px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8rem;
    transition: all 0.3s ease;

    &.active {
      background: $color-primary;
      color: $color-white;
    }

    &:hover {
      background: color.scale(#f0f0f0, $lightness: -5%);
    }

    &:focus {
      outline: 2px solid color.scale($color-primary);
      outline-offset: 2px;
    }
  }
}
</style>
