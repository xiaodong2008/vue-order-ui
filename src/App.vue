<template>
  <a-config-provider :autoInsertSpaceInButton="false">
    <a-spin :spinning="loading" size="large" tip="免密支付中...">
      <Topbar/>
      <div class="fadeTopbar"></div>
      <router-view v-slot="{ Component }" :style="{'overflow-y':!loading || 'hidden'}">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </a-spin>
  </a-config-provider>
</template>

<script>
import Topbar from "./components/topbar.vue";
import restoreMsg from "./function/restoreMsg.js";
import {message} from "ant-design-vue";
const lc = require('./app/config.json').localStorageName

export default {
  name: "App",
  data() {
    return {
      loading: false,
    }
  },
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
  },
  methods: {
    startLoading(callback) {
      this.loading = true;
      // rand 4000~6000
      setTimeout(() => {
        this.loading = false;
        callback();
      }, Math.floor(Math.random() * 2000) + 4000);
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

body > #app .ant-spin {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100vh;
  margin: auto;
  user-select: none;
}
</style>