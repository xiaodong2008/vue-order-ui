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
    <a-list class="itemList">
      <a-list-item v-for="item in getAllFood()" :key="item.id">
        <a-list-item-meta :title="item.name">
          <template #description>
            <span style="color: red">HKD {{ calcPrice(item) }}</span>
            <span style="color: gray" v-for="custom in item.custom" :key="custom.id">
              {{ custom.name }}: {{ custom.name }}
            </span>
          </template>
          <template #avatar v-if="item.img">
            <img :src="item.img" alt="img" class="foodImage">
          </template>
        </a-list-item-meta>
        <a-space>
          <a-button type="primary" v-if="item.count > 0" @click="$store.commit('removeFood', [item.id])" shape="circle">
            <template #icon>
              <MinusOutlined style="font-size: 11px"/>
            </template>
          </a-button>
          <a-button type="primary" @click="viewFood(item.id)" shape="round">
            {{ item.count > 0 ? item.count : "加入購物車" }}
          </a-button>
        </a-space>
      </a-list-item>
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
    getAllFood() {
      // get cart
      let cart = this.$store.state.cart;
      let foodList = []
      cart.forEach((item) => {
        // for item.count
        for (let i = 0; i < item.count; i++) {
          let newItem = JSON.parse(JSON.stringify(item));
          newItem.count = undefined;
          newItem.custom = item.custom[i];
          foodList.push(newItem);
        }
      })
      return foodList;
    },
    calcPrice(item) {
      console.log(item);
      let price = item.price;
      item.custom.forEach((item) => {
        price += item.price;
      })
      return price;
    },
    cleanCart() {
      this.$store.commit('cleanCart');
      this.cleanCartConfirm = false;
      message.success("購物車已清空");
    }
  },
  components: {LeftOutlined, MinusOutlined}
}
</script>

<style lang="less" scoped>
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