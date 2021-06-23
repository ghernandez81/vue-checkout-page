<template>
  <article v-for="item in products" :key="item.id">
    <Product :item="item"></Product>
  </article>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Product from "@/modules/products/Product.vue";

@Options({
  components: {
    Product,
  },
})
export default class ProductsList extends Vue {
  get products() {
    return this.$store.state.products;
  }

  created() {
    this.$store.dispatch("fetchProducts");
  }
}
</script>
