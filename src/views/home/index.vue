<template>
  <div id="home">
    <Topbar/>
    <div class="fadeTopbar"></div>
    <orderMenu/>
  </div>
</template>

<script>
import Topbar from "./topbar.vue";
import orderMenu from "./orderMenu.vue";

export default {
  components: {orderMenu, Topbar}
}
</script>

<style lang="less" scoped>
.fadeTopbar {
  height: 50px;
}
</style>