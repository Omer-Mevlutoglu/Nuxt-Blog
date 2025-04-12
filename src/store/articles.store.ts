import { defineStore } from "pinia";
import type { Article } from "../types/article";

export const useArticlesStore = defineStore("articles", {
    // initial state
  state: () => ({
    articles: [] as Article[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    sortedArticles: (state) => {
      return state.articles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  },

  actions: {
    async fetchArticles() {
      this.loading = true;
      try {
        const { locale } = useI18n();
        const currentLocale = locale.value;
        const result = await queryCollection("news")
          .where("locale", "=", currentLocale)
          .order("date", "DESC")
          .all();

        this.articles = result.map((item) => ({
          ...item,
          date: new Date(item.date).toISOString(),
        }));
      } catch (error: unknown) {
        this.error =
          error instanceof Error
            ? error.toString()
            : "An unknown error occurred";
      } finally {
        this.loading = false;
      }
    },
  },
});
