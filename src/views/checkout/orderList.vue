<template>
  <div id="orderList">
    <span class="title">
      <router-link to="/">
        <left-outlined style="margin-right: 5px"/>
      </router-link>
      購物車
      <a-button style="float: right" shape="round" danger @click="cleanCartConfirm = true">
        清空購物車
      </a-button>
      <a-modal v-model:visible="cleanCartConfirm" title="清空購物車" @ok="cleanCart" @cancel="cleanCartConfirm = false">
        <p>確定要清空購物車嗎？</p>
        <template #footer>
          <a-button @click="cleanCartConfirm = false">
            取消
          </a-button>
          <a-button type="primary" danger @click="cleanCart">
            確定
          </a-button>
        </template>
      </a-modal>
    </span>
    <a-list class="itemList" :pagination="{position: 'bottom', pageSize: 5, showQuickJumper: true, total: $store.getters.getAllFood.length}" :data-source="$store.getters.getAllFood">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.name">
            <template #description>
              <span style="color: red;display: block">HKD {{ $store.getters.calcPrice(item) }}</span>
              <span style="color: gray;display: block" v-for="custom in item.custom" :key="custom.id">
               - {{ custom.name }}
            </span>
            </template>
            <template #avatar v-if="item.img">
              <a-image :src="item.img" alt="img" class="foodImage" />
            </template>
          </a-list-item-meta>
          <a-space>
            <a-button type="primary" v-if="item.count > 0" @click="$store.commit('removeFood', [item.id])" shape="circle">
              <template #icon>
                <MinusOutlined style="font-size: 11px"/>
              </template>
            </a-button>
            <a-button type="primary" @click="$store.commit('removeFood', [item.id])" danger shape="round">
              从购物车中移除
            </a-button>
          </a-space>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import {LeftOutlined, MinusOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

export default {
  name: "orderList",
  data() {
    return {
      cleanCartConfirm: false
    };
  },
  methods: {
    cleanCart() {
      this.$store.commit('cleanCart');
      this.cleanCartConfirm = false;
      message.success("購物車已清空");
    }
  },
  components: {LeftOutlined, MinusOutlined}
}
</script>

<style lang="less">
#orderList {
  padding: 5px 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
    padding: 8px;
    border-bottom: 1px solid #ccc;
    display: block;
  }

  .itemList {
    margin-bottom: 10px;

    .foodImage {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 10px
    }
  }
}
</style>