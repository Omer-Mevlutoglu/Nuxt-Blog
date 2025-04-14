import { defineStore } from "pinia";

interface Article {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export const useTrendingStore = defineStore("trending", {
  state: () => ({
    trendingArticles: [] as Article[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTrendingArticles() {
      this.loading = true;
      try {
        const trendingEndpoint = "https://dummyjson.com/posts";
        interface ApiResponse {
          posts: Article[];
        }
        const { data: response } = await useFetch<ApiResponse>(
          trendingEndpoint,
          {
            default: () => ({ posts: [] }),
          }
        );
        this.trendingArticles = response.value?.posts || [];
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
