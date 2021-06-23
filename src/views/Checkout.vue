<template>
  <div class="wrapper">
    <header class="header-container">
      <div class="header-container__first-row">
        <img
          class="header-container_logo"
          :src="require('@/assets/allbirds-logo.svg')"
          alt=""
        />
        <a class="header-container__link" href="https://allbirds.com"
          >Visit allbirds.com</a
        >
      </div>
      <h1 class="header-container__title">Jenny's outfit</h1>
      <h2 class="header-container__description">
        Dress like your idole with this super bundle and be the star you always
        wanted to be.
      </h2>
    </header>
    <main>
      <section>
        <ProductsList></ProductsList>
      </section>
      <aside>
        <Cart :userName="'Gabe'"></Cart>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProductsList from "@/modules/products/ProductsList.vue";
import Cart from "@/modules/cart/Cart.vue";
@Options({
  components: {
    ProductsList,
    Cart,
  },
})
export default class Checkout extends Vue {}
</script>
<style scoped lang="scss">
.wrapper {
  //padding-top: 320px;
  background: #e5e5e5 url("~@/assets/background.jpg") no-repeat center top;
}

header {
  margin: 0;
  padding: 0;
  width: 1180px;
  margin: 0 auto;
}
main {
  width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 66% auto;
  column-gap: 20px;
}
.header-container__first-row {
  padding-top: 30px;
  display: flex;
}
.header-container__title {
  text-align: left;
  font-size: 4rem;
  font-weight: bold;
  color: #1f3447;
}

.header-container__description {
  text-align: left;
  font-size: 1.1rem;
  color: #1f3447;
  max-width: 400px;
}

.header-container__link {
  margin-left: auto;
  &,
  &:hover {
    color: #1f3447;
  }
  font-size: 0.8rem;
  text-decoration: none;
}
.header-container_logo {
  width: 100px;
}
</style>
