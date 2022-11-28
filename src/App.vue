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

export default {
  name: "App",
  components: {Topbar}
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