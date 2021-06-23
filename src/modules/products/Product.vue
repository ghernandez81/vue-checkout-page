<template>
  <div class="product">
    <img class="product__image" :src="imageSrc" />
    <div class="product__right-block">
      <div class="product__container-title">
        <p class="product__title">{{ item?.title }}</p>
        <span class="product__price">${{ item.price }}</span>
      </div>
      <div class="product__descriptions">
        {{ item.descriptions }}
      </div>
      <div class="product__options-container product--size">
        <label>Size</label>
        <div class="product__options-container-button">
          <template v-for="(size, index) in item.sizes" :key="size">
            <button
              :class="{ '--is-clicked': selectedSizeIndex === index }"
              @click="onSizeChange(size, index)"
            >
              {{ size }}
            </button>
          </template>
        </div>
      </div>
      <div class="product__options-container product--fabrics">
        <label>Fabric</label>
        <div class="product__options-container-button">
          <button
            v-for="(fabric, index) in item.fabrics"
            :key="fabric"
            :class="{ '--is-clicked': selectedFabricIndex === index }"
            @click="onFabricChange(fabric, index)"
          >
            {{ fabric }}
          </button>
        </div>
      </div>
      <div class="product__add-to-cart-btn-container">
        <button class="product__add-to-cart-btn" @click="onAddToCart(item)">
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

interface ProductModel {
  id: string;
  price: string;
  title: string;
  descriptions: string;
  sizes: number[];
  fabrics: string[];
  image: string;
}

@Options({
  props: {
    item: Object,
  },
})
export default class Product extends Vue {
  item: any;
  size!: number;
  fabric!: string;
  selectedFabricIndex: number | null = null;
  selectedSizeIndex: number | null = null;
  isClicked!: boolean;

  get imageSrc(): string {
    return require(`@/assets/${this.item.image}`);
  }
  onSizeChange(size: number, index: number): void {
    this.selectedSizeIndex = index;
    this.size = size;

    this.$store.commit("updateCartAfterAdding", {
      id: this.item.id,
      field: "selectedSize",
      value: this.size,
    });
  }

  onFabricChange(fabric: string, index: number): void {
    this.selectedFabricIndex = index;
    this.fabric = fabric;
    this.$store.commit("updateCartAfterAdding", {
      id: this.item.id,
      field: "selectedFabric",
      value: this.fabric,
    });
  }

  //probably this would need to be his own component
  onAddToCart(product: ProductModel): void {
    debugger;
    this.$store.commit("pushProductToCart", {
      ...product,
      selectedFabric: product.fabrics[this.selectedFabricIndex || 0],
      selectedSize: product.sizes[this.selectedSizeIndex || 0],
    });
  }
}
</script>

<style scoped lang="scss">
.product {
  padding: 20px;
  border-radius: 5px;

  background: #fff;
  display: flex;
  margin-bottom: 20px;
}

.product__right-block {
  padding: 0 20px;
  width: 420px;
}
.product__title {
  font-size: 1.2rem;
  font-weight: bold;
}
.product__container-title {
  display: flex;
}
.product__title {
  margin: 0;
}
.product__price {
  margin-left: auto;
  font-weight: bold;
  color: #6028ff;
}
.product__descriptions {
  text-align: left;
  font-size: 0.9rem;
  color: #738ba1;
  margin: 20px 0 60px 0;
}
.product__options-container {
  display: flex;
  margin-bottom: 5px;
  label {
    font-size: 1rem;
  }
  button {
    margin-left: 5px;
    padding: 8px;
    border: 0;
    background-color: #f0f1f5;
    color: #1f3447;

    &.--is-clicked {
      background-color: #1f3447;
      color: #fff;
    }
  }
  .product__options-container-button {
    margin-left: auto;
  }
}

.product__add-to-cart-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
.product__add-to-cart-btn {
  background: #6028ff;
  text-transform: uppercase;
  color: #fff;
  padding: 13px 20px;
  border: 0;
  font-weight: bold;
  border-radius: 5px;
  width: 136px;
}
</style>
