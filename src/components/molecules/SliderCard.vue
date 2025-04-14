<template>
  <article class="slider-card">
    <div class="post-img">
      <NuxtImg
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        preload
        loading="lazy">
        <!-- Keep the link overlay (without an icon) -->
        <NuxtLink :to="article.path" class="over-layer" />
      </NuxtImg>
    </div>
    <div class="post-content">
      <div class="tag-area">
        <!-- Display the first tag instead of the date -->
        <span v-if="article.tags && article.tags.length" class="post-tag">
          {{ article.tags[0] }}
        </span>
      </div>
      <h3 class="post-title">
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
      </h3>
      <p class="post-description">{{ article.description }}</p>
      <AppButton
        :to="article.path"
        :label="$t('button.read_more')"
        variant="primary"
        class="read-more"
      />
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
.slider-card {
  background: #fff;
  margin: 20px 15px;
  border-radius: 15px;
  box-shadow: 0px 14px 22px -9px #bbcbd8;
  transition: transform 0.3s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 450px; // Fixed overall height

  .post-img {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    margin: -12px 15px 8px 15px;
    height: 200px; // Fixed image area height

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s linear;
    }
    &:hover img {
      transform: scale(1.1);
    }
    .over-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: linear-gradient(
        -45deg,
        rgba(6, 190, 244, 0.75) 0%,
        rgba(45, 112, 253, 0.6) 100%
      );
      transition: opacity 0.5s linear;
    }
    &:hover .over-layer {
      opacity: 1;
    }
  }

  .post-content {
    background: #fff;
    padding: 1rem 20px;
    border-radius: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* Fixed height for content area to ensure consistent card height */
    height: calc(
      450px - 200px - 20px
    ); // Subtract image area height and extra spacing

    .tag-area {
      margin-bottom: 0.5rem;

      .post-tag {
        font-size: 0.7rem;
        background-color: rgba($color-primary, 0.1);
        color: $color-primary;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        text-transform: uppercase;
        font-weight: 500;
      }
    }

    .post-title a {
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;
      transition: color 0.3s ease;
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .post-title a:hover {
      color: #3498db;
    }

    .post-description {
      font-size: 14px;
      color: #808080;
      margin-bottom: 25px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      /* Fixed maximum height for description area; adjust as needed */
      max-height: 60px;
    }

    .read-more {
      padding: 7px 20px;
      font-size: 12px;
      color: #fff;
      box-shadow: 0px 10px 20px -10px #1376c5;
      border-radius: 25px;
      text-transform: uppercase;
      transition: background 0.3s ease;
      align-self: flex-end;
    }
    .read-more:hover {
      background: #3498db;
      cursor: pointer;
    }
  }
}
</style>
