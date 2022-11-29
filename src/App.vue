<template>
  <a-config-provider :autoInsertSpaceInButton="false">
    <Topbar/>
    <div class="fadeTopbar"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script>
import Topbar from "./components/topbar.vue";
import restoreMsg from "./function/restoreMsg.js";
import {message} from "ant-design-vue";
const lc = require('./app/config.json').localStorageName

export default {
  name: "App",
  components: {Topbar},
  mounted() {
    // check localStorage to see if there is a cart
    if (localStorage.getItem(`${lc}-cart`)) {
      if (localStorage.getItem(`${lc}-menu`) !== JSON.stringify(this.$store.state.menu)) {
        message.warning("菜单已更新，請重新選購");
      } else {
        this.$store.commit("setCart", JSON.parse(localStorage.getItem(`${lc}-cart`)));
        restoreMsg();
      }
    }
  }
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadeTopbar {
  height: 50px;
}
</style>