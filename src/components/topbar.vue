<template>
  <div id="topbar">
    <div class="left">
      <menu-unfold-outlined class="icon" @click="openDraw"/>
      <a-drawer :width="280" title="分類" :visible="drawerVisible" @close="drawerVisible = !1" :closable="false"
                placement="left">
        <a-menu mode="inline">
          <a-sub-menu>
            <template #title>
              食物分類
            </template>
            <a-menu-item key="1">
              <span>拉麵</span>
            </a-menu-item>
            <a-menu-item key="2">
              <span>小食</span>
            </a-menu-item>
            <a-menu-item key="3">
              <span>飲品</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-drawer>
      <img class="logo" :src="config.shop.icon" alt="Logo" v-if="config.shop.icon">
      <span class="logo" v-else>{{ config.shop.name }}</span>
    </div>
    <div class="right">
      <a-badge :count="$store.getters.foodCount">
        <shopping-cart-outlined class="icon"/>
      </a-badge>
    </div>
  </div>
</template>

<script>
import {MenuUnfoldOutlined, ShoppingCartOutlined} from '@ant-design/icons-vue'

export default {
  name: "topbar",
  data() {
    return {
      config: require("../app/config.json"),
      drawerVisible: false
    }
  },
  methods: {
    openDraw() {
      this.drawerVisible = !0
    }
  },
  components: {
    MenuUnfoldOutlined,
    ShoppingCartOutlined
  }
}
</script>

<style lang="less" scoped>
#topbar {
  background-color: var(--theme-color);
  color: var(--theme-color-text);
  height: 50px;
  position: fixed;
  width: 100%;

  .left, .right {
    float: left;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 20px;

    &.left > * {
      margin-left: 8px;
      padding: 0 4px;
    }

    &.right > * {
      margin-right: 8px;
      padding: 0 4px;
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      user-select: none;
      margin-bottom: 4px;
    }

    .icon {
      font-size: 20px;
      color: var(--theme-color-text);
      cursor: pointer;
    }

    ~ .right {
      float: right;
    }
  }
}
</style>