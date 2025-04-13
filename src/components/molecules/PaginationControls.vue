<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="$emit('prev')">
      {{ $t("button.prev") }}
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="$emit('next')">
      {{ $t("button.next") }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["prev", "next"]);

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  button {
    padding: 0.5rem 1rem;
    border: none;
    background: $color-primary;
    color: $color-white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: color.scale($color-primary, $lightness: -5%);
    }

    &:focus {
      outline: 2px solid color.scale($color-primary);
      outline-offset: 2px;
    }
  }

  span {
    font-size: 1rem;
    color: $color-text-primary;
    min-width: 120px;
    text-align: center;
  }
}
</style>
