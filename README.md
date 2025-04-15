# Nuxt Multilingual Blog

A modern, feature-rich blog platform built with Nuxt 3, TypeScript, and Vue 3, supporting multiple languages and offering a rich user experience.

---

## 🚀 Live Demo

Check out the live demo of the blog at:  
[https://nuxt-blog-phi-rose.vercel.app/en](https://nuxt-blog-phi-rose.vercel.app/en)


## 🚀 Features

- **Multilingual Support:**  
  Supports multiple languages (English and Turkish) using URL prefixes (e.g., `/en/*` and `/tr/*`).

- **Content Management:**  
  Leverages Nuxt Content to manage Markdown-based blog posts with rich front matter (tags, images, slugs, etc.) and dynamic content rendering.

- **Dynamic Routing:**  
  Implements dynamic routes for articles via `[slug].vue` and trending posts via `[id].vue`.

- **Responsive Design:**  
  Uses SCSS and CSS Grid/Flexbox to provide a responsive layout that adjusts for large, medium, and mobile screens.

- **State Management:**  
  Centralized state management with Pinia for managing articles and trending content.

- **SEO Optimization:**  
  Uses `useHead` to dynamically set page titles and meta tags, along with optimized image handling with Nuxt Image.

- **Performance Optimization:**  
  Utilizes lazy loading, dynamic imports, code splitting, and image optimization to minimize JS payload and main thread work.

- **Testing Suite:**  
  Supports end-to-end testing with Cypress and unit testing with Vitest (plus @nuxt/test-utils).

---

## 🛠️ Technologies

- **Nuxt.js 3** – The core framework for building our application  
- **Vue 3** – Component-based UI construction with Composition API  
- **TypeScript** – Ensures type safety and maintainability  
- **Pinia** – State management  
- **SCSS** – Styling and animations  
- **Nuxt Content** – Markdown-based content management  
- **Vue I18n** – Internationalization support  
- **VueUse** – Composition utilities  
- **Nuxt Image** – Image optimization  
- **Cypress** – End-to-end testing  
- **Vitest** – Unit testing  
- **@nuxt/test-utils** – Nuxt-specific testing utilities  

---

## 📋 Prerequisites

- **Node.js:** Latest LTS version (v16 or newer recommended)  
- **Package Manager:** npm, yarn, or pnpm  
- **Git:** For version control  

---

## 🚦 Getting Started

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd blog
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview the Production Build**

   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── assets/            # SCSS files and other assets
├── content/           # Markdown content files (blog posts, articles)
│   └── news/          # News articles in multiple languages
├── cypress/           # End-to-end tests using Cypress
├── i18n/              # Localization files (e.g., en.json, tr.json)
├── pages/             # Application routes (including dynamic routes)
├── public/            # Static files (robots.txt, sitemap.xml, .htaccess, humans.txt, favicons)
└── src/
    ├── components/    # Vue components organized by atoms, molecules, organisms, templates
    ├── composable/    # Vue composables
    ├── store/         # Pinia stores for state management
    └── types/         # TypeScript types
```

---

## 🧪 Testing

### Unit Testing with Vitest

- **Setup:**  
  Ensure you have the following dev dependencies installed: `vitest`, `@vue/test-utils`, `happy-dom`, and optionally `@vitejs/plugin-vue`.

- **Configuration:**  
  Create a `vitest.config.ts` file (if not already present) using:

  ```ts
  // vitest.config.ts
  import { defineVitestConfig } from '@nuxt/test-utils/config'
  export default defineVitestConfig({
    test: {
      environment: 'nuxt',
    }
  })
  ```

- **Run Unit Tests:**

  ```bash
  npm run test
  ```

### End-to-End Testing with Cypress

- **Run E2E Tests:**

  ```bash
  npm run cy:open
  ```

- **Testing Strategy:**  
  Write tests covering key user flows such as:
  - Navigating to various pages (Home, Blog, Article detail)
  - Changing the language via the language switcher
  - Filtering articles by tag and searching for articles
  - Submitting forms (if applicable)
  
Refer to the [Nuxt Test Utils documentation](https://nuxt.com/docs/getting-started/testing) for more details.

---

## 🌐 Internationalization

- **URL Strategy:**  
  URL paths include language prefixes (e.g., `/en/*`, `/tr/*`).
  
- **Setup:**  
  Localization files are stored in the `locales/` folder, and the i18n module is configured in `nuxt.config.ts`.  
  To add new languages, simply update the locales array and add corresponding JSON files.

---

## 🔧 Configuration

- **Nuxt Config:**  
  Configure your application's Nuxt settings in `nuxt.config.ts`, including global CSS, plugins, modules, and i18n options.

- **Content Config:**  
  Use `content.config.ts` to define your Nuxt Content schema and processing rules.

- **Testing Config:**  
  Configure Vitest and Cypress in `vitest.config.ts` and `cypress.config.ts` respectively.

- **Static Assets:**  
  Place your `robots.txt`, `sitemap.xml`, `.htaccess`, `humans.txt`, and favicon files in the `public/` folder.

---

## ⚡ Performance Optimization

- **Lazy Loading & Dynamic Imports:**  
  Use lazy loading (e.g., `Suspense` and `defineAsyncComponent`) to reduce the initial JS bundle size and delay loading of non-critical components.

- **Image Optimization:**  
  Leverage Nuxt Image module for optimized images. Use lazy-loading attributes on images.

- **Code Splitting:**  
  Use dynamic imports for heavy components, such as sliders or modals, to improve the Time to Interactive.

- **Minimizing Main-Thread Work:**  
  Optimize scripts, avoid heavy reactivity where not needed, and offload computations with computed properties.

- **Brotli & Compression:**  
  Enable Brotli or gzip compression on your server to reduce payload sizes.

---

## 🚀 Deployment

- **Deployment Options:**  
  The app can be deployed to any hosting provider that supports Node.js. Popular options include Vercel, Netlify, and AWS.
  
- **Environment Variables:**  
  Configure any necessary environment variables for API endpoints and i18n in a `.env` file.

---

## 🤝 Contributing

1. **Fork the Repository**
2. **Create a Feature Branch:** `git checkout -b feature/AmazingFeature`
3. **Commit Your Changes:** `git commit -m 'Add some AmazingFeature'`
4. **Push to Your Branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

Please follow the code style guidelines and add/update tests as necessary.


