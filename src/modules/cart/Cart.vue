<template>
  <div class="cart">
    <h4 class="cart__user-name">Welcome back {{ userName }}</h4>
    <p class="cart__greeting">Nice to see you again</p>
    <button class="cart__btn">Pay ${{ total }}</button>
    <hr />
    <h3 class="cart__your-cart">Your cart</h3>
    <ul class="cart__list">
      <li class="cart__list-item" v-for="item in cartItems" :key="item.id">
        <img class="cart_thumbnail" :src="getImageSrc(item.image)" />
        <span class="cart__list-item-container">
          <p class="cart__list-item-title">{{ item.title }}</p>
          <p class="cart__list-item-more-info">
            Size {{ item.selectedSize }} - {{ item.selectedFabric }}
          </p>
          <span class="cart__list-item-button-container">
            <span class="cart__list-item-button-inner-container"
              ><button
                class="cart__list-item-button-decrement"
                @click="decrement(item)"
              ></button>
              <span class="cart__list-item-count">{{ item.count }}</span>
              <button
                class="cart__list-item-button-increment"
                @click="increment(item)"
              ></button>
            </span>
            <span class="cart__list-item-price">$ {{ item.price }}</span>
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CartModel } from "@/store";
@Options({
  props: {
    userName: String,
  },
})
export default class Cart extends Vue {
  get total(): number {
    return this.$store.getters.totalPrice;
  }

  get cartItems(): CartModel[] {
    return this.$store.state.cart;
  }
  getImageSrc(src: string): string {
    return require("@/assets/" + src);
  }
  decrement(product: CartModel): void {
    if (product.count !== 0) {
      product.count--;
    }
    this.$store.commit("updatePrice", product);
  }
  increment(product: CartModel): void {
    product.count++;
    this.$store.commit("updatePrice", product);
  }
}
</script>

<style scoped lang="scss">
.cart {
  border-radius: 5px;
  background-color: #fff;
  padding: 20px;
  hr {
    border-top: 1px solid #f0f1f5;
  }
}
.cart__user-name {
  margin: 0;
  font-size: 1.2rem;
  padding: 0 0 7px 0;
  color: #1f3447;
}
.cart__greeting {
  font-size: 0.9rem;
  color: #8f92a3;
}
.cart__btn {
  background: #6028ff;
  text-transform: uppercase;
  color: #fff;
  padding: 13px 20px;
  border: 0;
  font-weight: bold;
  border-radius: 5px;
  width: 100%;
  margin: 20px 0 10px 0;
}
.cart__your-cart {
  text-align: left;
}
.cart_thumbnail {
  width: 70px;
}
.cart__list-item {
  display: flex;
  margin-bottom: 10px;
}
.cart__list-item-title {
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}

.cart__list-item-container {
  padding-left: 5px;
  flex-grow: 1;
}

.cart__list-item-more-info {
  text-align: left;
  font-size: 0.8rem;
  color: #738ba1;
}
.cart__list-item-button-decrement,
.cart__list-item-button-increment {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: #1f3447;
}
.cart__list-item-button-increment::before {
  content: "+";
}
.cart__list-item-button-decrement::before {
  content: "-";
}
.cart__list-item-button-container {
  display: flex;
}
.cart__list-item-price {
  margin-left: auto;
  font-weight: bold;
}
</style>
