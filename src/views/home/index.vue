<template>
  <div id="home">
    <orderMenu/>
    <div class="fadeBottom"></div>
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
.fadeBottom {
  height: 100px;
}
</style>