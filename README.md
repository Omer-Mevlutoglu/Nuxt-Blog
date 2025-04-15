# Nuxt Multilingual Blog

A modern, feature-rich blog platform built with Nuxt 3, TypeScript, and Vue 3, supporting multiple languages and offering a rich user experience.

## 🚀 Features

- **Multilingual Support** (English and Turkish)
- **Content Management** with Nuxt Content
- **Dynamic Routing** for articles and trending posts
- **Responsive Design** with SCSS
- **State Management** using Pinia
- **Component Architecture** following Atomic Design principles
- **SEO Optimized** with meta tags and dynamic head management
- **Image Optimization** with Nuxt Image
- **Performance Optimized** with lazy loading and dynamic imports
- **Testing Suite** with Vitest and Cypress

## 🛠️ Technologies

- Nuxt.js 3
- Vue.js 3
- TypeScript
- Pinia for state management
- SCSS for styling
- i18n for internationalization
- Vue 3 Carousel
- Cypress for E2E testing
- Vitest for unit testing

## 📋 Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Git

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
├── assets/            # SCSS files and other assets
├── content/          # Markdown content files
│   └── news/         # News articles in multiple languages
├── cypress/          # E2E tests
├── i18n/             # Internationalization files
├── pages/            # Application routes
├── public/           # Static files
└── src/
    ├── components/   # Vue components (Atomic Design)
    │   ├── atoms/
    │   ├── molecules/
    │   └── organisms/
    ├── composable/   # Vue composables
    ├── store/        # Pinia stores
    └── types/        # TypeScript types
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run cy:open
```

## 🌐 Internationalization

The blog supports multiple languages with URL prefix strategy:

- English: `/en/*`
- Turkish: `/tr/*`

Content is managed through markdown files in the `content/news/` directory with language-specific variants.

## 🔧 Configuration

- `nuxt.config.ts` - Main Nuxt configuration
- `content.config.ts` - Content module configuration
- `vitest.config.ts` - Testing configuration
- `cypress.config.ts` - E2E testing configuration

## 📱 Features Breakdown

### Content Management

- Markdown-based content with front matter
- Support for multiple languages
- Tag-based categorization
- Image optimization

### User Interface

- Responsive design
- Dynamic article loading
- Carousel for featured content
- Tag-based filtering
- Search functionality
- Pagination controls

### Performance

- Lazy loading of components
- Image optimization
- Brotli compression
- Component-level code splitting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
