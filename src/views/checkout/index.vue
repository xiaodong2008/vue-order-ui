<template>
  <div id="checkout">
    <OrderList/>
  </div>
</template>

<script>
import OrderList from "./orderList.vue";

export default {
  name: "index",
  components: {OrderList}
}
</script>

<style lang="less" scoped>

</style>