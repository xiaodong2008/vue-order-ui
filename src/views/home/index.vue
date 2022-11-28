<template>
  <div id="home">
    <Topbar/>
    <div class="fadeTopbar"></div>
    <orderMenu/>
    <Bottom/>
  </div>
</template>

<script>
import Topbar from "./topbar.vue";
import orderMenu from "./orderMenu.vue";
import Bottom from "./bottom.vue";

export default {
  components: {Bottom, orderMenu, Topbar}
}
</script>

<style lang="less" scoped>
.fadeTopbar {
  height: 50px;
}
</style>