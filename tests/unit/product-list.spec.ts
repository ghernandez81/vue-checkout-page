import { shallowMount } from "@vue/test-utils";
import ProductsList from "@/modules/products/ProductsList.vue";
import store from "@/store";

describe("ProductsList", () => {
  it("should have an article element", () => {
    const wrapper = shallowMount(ProductsList, {
      global: { plugins: [store] },
    });
    expect(wrapper.find("article")).toBeDefined();
  });
});
