<template>
  <div id="topbar">
    <div class="left">
      <img class="logo" :src="config.shop.icon" alt="Logo" v-if="config.shop.icon">
      <span class="logo" v-else>{{ config.shop.name }}</span>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "topbar",
  data() {
    return {
      config: require("../../app/config.json")
    }
  }
}
</script>

<style lang="less" scoped>
#topbar {
  background-color: var(--theme-color);
  color: var(--theme-color-text);
  height: 50px;

  .left, .right {
    float: left;
    display: flex;
    align-items: center;
    height: 100%;

    > * {
      margin: 0 10px;
      padding: 0 10px;
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      user-select: none;
      cursor: pointer;
    }

    ~ .right {
      float: right;
    }
  }
}
</style>