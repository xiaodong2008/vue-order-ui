<template>
  <div id="bottom">
    <div class="count">
      <span class="text">總計: </span>
      <span class="price" style="color: red">HKD {{ $store.getters.getTotal }}</span>
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
  bottom: 0;
  width: 100%;
  background-color: var(--theme-color);
  color: var(--theme-color-text);
  padding: 10px;

  .count {
    float: left;
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
}
</style>