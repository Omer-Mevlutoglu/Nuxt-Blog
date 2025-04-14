<script setup lang="ts">
import { usePostImage } from "~/src/composable/usePostImage";

const route = useRoute();
const id = parseInt(route.params.id as string);
const { getPostImage } = usePostImage();

const { data: post } = await useAsyncData("post", () =>
  $fetch(`https://dummyjson.com/posts/${id}`)
);

const postImage = computed(() => getPostImage(id));
if (post.value) {
  useHead({
    title: post.value.title,
    meta: [{ name: "description", content: post.value.body.substring(0, 160) }],
  });
}
</script>

<template>
  <div v-if="post" class="trending-detail container">
    <header class="post-header">
      <div class="meta-info">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-short-description">
          {{ post.body.substring(0, 150) }}...
        </p>
      </div>
    </header>

    <div class="post-content">
      <div class="post-image">
        <img :src="postImage" :alt="post.title" >
      </div>
      <div class="post-body">
        <p v-for="(para, index) in post.body.split('\n')" :key="index">
          {{ para }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class="not-found container">
    <p>Post not found.</p>
    <NuxtLink to="/trending" class="back-link">Go back to Trending</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.trending-detail {
  padding: 3rem 0;
  animation: fadeIn 0.6s ease-out;

  .post-header {
    text-align: left;
    margin-bottom: 2rem;
    .meta-info {
      background: #f7f7f7;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      .post-title {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: $color-text-primary;
      }
      .post-short-description {
        font-size: 1.1rem;
        color: $color-text-secondary;
      }
    }
  }

  .post-content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    @media (max-width: 768px) {
      flex-direction: column;
    }

    .post-image {
      flex: 1;
      max-width: 40%;
      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        object-fit: cover;
        transition: transform 0.3s ease;
        &:hover {
          transform: scale(1.02);
        }
      }
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }

    .post-body {
      flex: 2;
      font-size: 1rem;
      line-height: 1.8;
      color: $color-text-primary;
      animation: slideInRight 0.6s ease-out;
    }
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.not-found {
  text-align: center;
  padding: 3rem 0;
  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .back-link {
    color: $color-primary;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
