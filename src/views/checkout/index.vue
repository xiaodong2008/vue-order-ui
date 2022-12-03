<template>
  <div id="checkout">
    <OrderList/>
    <div class="fadeBottom"></div>
    <Bottom/>
  </div>
</template>

<script>
import OrderList from "./orderList.vue";
import Bottom from "./bottom.vue";

export default {
  name: "index",
  components: {Bottom, OrderList}
}
</script>

<style lang="less" scoped>
.fadeBottom {
  height: 100px;
}
</style>