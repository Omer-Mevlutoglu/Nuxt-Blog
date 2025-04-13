<template>
  <footer class="site-footer">
    <div class="footer-container container">
      <!-- About Section -->
      <div class="footer-about">
        <h4 class="footer-title">{{ $t("footer.aboutTitle") }}</h4>
        <p class="footer-description">{{ $t("footer.aboutDescription") }}</p>
      </div>
      <!-- Navigation Section -->
      <div class="footer-nav">
        <h4 class="footer-title">{{ $t("footer.navigation") }}</h4>
        <nav>
          <NuxtLink :to="$localePath({ name: 'index' })">{{
            $t("header.home")
          }}</NuxtLink>
          <NuxtLink :to="$localePath('/news')">{{
            $t("header.blog")
          }}</NuxtLink>
          <NuxtLink to="/about">{{ $t("header.about") }}</NuxtLink>
        </nav>
      </div>
      <!-- Social Section -->
      <div class="footer-social">
        <h4 class="footer-title">{{ $t("footer.followUs") }}</h4>
        <div class="social-links">
          <NuxtLink to="https://facebook.com" target="_blank"
            >Facebook</NuxtLink
          >
          <NuxtLink to="https://twitter.com" target="_blank">Twitter</NuxtLink>
          <NuxtLink to="https://instagram.com" target="_blank"
            >Instagram</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>
          &copy; {{ new Date().getFullYear() }} NXT Blog. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No additional reactive data is needed here
</script>

<style scoped lang="scss">
@use "sass:color";

.site-footer {
  position: relative;
  width: 100%;
  background: linear-gradient(to bottom, #f8f9fa, #fff);
  border-top: 1px solid #e9ecef;
  z-index: 100;
  padding: 2rem 0 1rem;

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-about,
  .footer-nav,
  .footer-social {
    flex: 1;
    min-width: 250px;
  }

  .footer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2d3436;
  }

  .footer-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #636e72;
    margin-bottom: 1rem;
  }

  .footer-nav nav,
  .footer-social .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-nav a,
  .footer-social a {
    color: #636e72;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    padding: 0.25rem 0;

    &:hover {
      color: #2d3436;
      transform: translateX(5px);
    }
  }

  .footer-bottom {
    border-top: 1px solid #e9ecef;
    margin-top: 1rem;
    padding-top: 1rem;
    text-align: center;

    p {
      font-size: 0.85rem;
      color: #636e72;
    }
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      gap: 2rem;
    }

    .footer-about,
    .footer-nav,
    .footer-social {
      min-width: 100%;
      text-align: center;
    }

    .footer-nav nav,
    .footer-social .social-links {
      align-items: center;
    }

    .footer-nav a:hover,
    .footer-social a:hover {
      transform: translateX(0) scale(1.05);
    }
  }
}
</style>
