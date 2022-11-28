<template>
  <div id="home">
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
</style>