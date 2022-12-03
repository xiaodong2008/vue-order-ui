<template>
  <div id="bottom">
    <div class="count">
      <span class="text">總計: </span>
      <span class="price" style="color: red">HKD {{ $store.getters.getTotal }}</span>
    </div>
    <div class="button">
      <router-link to="/payment">
        <a-button type="primary" shape="round" :disabled="!$store.getters.getTotal">前往付款</a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom"
}
</script>

<style lang="less" scoped>
#bottom {
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  background-color: var(--theme-color);
  color: var(--theme-color-text);
  padding: 20px;
  z-index: 10;

  .count {
    height: 100%;

    > span {
      display: block;
    }

    .text {
      font-size: 14px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .button {
    margin-left: auto;
  }
}
</style>