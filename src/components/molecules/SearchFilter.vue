<!-- src/components/molecules/SearchFilter.vue -->
<template>
    <div class="search-filter">
      <input v-model="localSearch" type="text" placeholder="Search articles..." @input="updateSearch" >
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits(['update:modelValue']);
  
  const localSearch = ref(props.modelValue);
  
  function updateSearch() {
    emit('update:modelValue', localSearch.value);
  }
  </script>
  
  <style scoped lang="scss">
  .search-filter {
    flex-grow: 1;
    input {
      width: 100%;
      max-width: 300px;
      padding: 0.5rem 1rem;
      border: 1px solid $color-border;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      &:focus {
        outline: none;
        border-color: $color-primary;
      }
    }
  }
  </style>
  