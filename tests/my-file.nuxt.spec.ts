import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BlogHeader from "../src/components/organisms/BlogHeader.vue";

const NuxtLink = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
};

const mockI18n = {
  locale: 'en',
  t: (key: string) => key, 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLocalePath = (route: any) => `/${route.name || route}`;

describe("BlogHeader", () => {
  const mountOptions = {
    global: {
      components: {
        NuxtLink
      },
      mocks: {
        $t: mockI18n.t,
        $localePath: mockLocalePath
      }
    }
  };

  it("renders properly", () => {
    const wrapper = mount(BlogHeader, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays logo text", () => {
    const wrapper = mount(BlogHeader, mountOptions);
    expect(wrapper.find(".logo").text()).toBe("NXT");
  });

  it("contains navigation links", () => {
    const wrapper = mount(BlogHeader, mountOptions);
    const navLinks = wrapper.findAll("nav a");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("has language switcher component", () => {
    const wrapper = mount(BlogHeader, mountOptions);
    expect(wrapper.find(".language-switcher").exists()).toBe(true);
  });
});