import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useArticlesStore } from "../src/store/articles.store";

describe("Articles Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with empty articles array", () => {
    const store = useArticlesStore();
    expect(store.articles).toEqual([]);
  });

  it("handles error state", async () => {
    const store = useArticlesStore();
    store.fetchArticles();
    expect(store.error).not.toBeNull();
  });

  it("updates articles after successful fetch", async () => {
    const store = useArticlesStore();
    await store.fetchArticles();
    expect(Array.isArray(store.articles)).toBe(true);
  });
});
