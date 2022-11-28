<template>
  <div id="home">
    <div class="fadeTopbar"></div>
    <orderMenu/>
    <Bottom/>
  </div>
</template>

<script>
import orderMenu from "./orderMenu.vue";
import Bottom from "./bottom.vue";

export default {
  components: {Bottom, orderMenu}
}
</script>

<style lang="less" scoped>
.fadeTopbar {
  height: 50px;
}
</style>