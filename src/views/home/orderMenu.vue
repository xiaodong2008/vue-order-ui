<template>
  <div id="menu">
    <div class="block" v-for="list in $store.state.menu">
      <span class="title">
        {{ list.name }}
      </span>
      <a-list class="itemList">
        <a-list-item v-for="item in list.items" :key="item.id">
          <a-list-item-meta :title="item.name">
            <template #description>
              <span style="color: red">HKD {{ item.price }}</span>
            </template>
            <template #avatar v-if="item.img">
              <img :src="item.img" alt="img" class="foodImage">
            </template>
          </a-list-item-meta>
          <a-space>
            <a-button type="primary" v-if="item.count > 0" @click="item.count--" shape="circle">
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
    <a-modal v-model:visible="view">
      <template #title>
        加入購物車
      </template>
      <div class="foodInfo">
        <img :src="viewTarget.img" alt="img" class="foodImage">
        <div class="foodInfoText">
          <span class="foodName">{{ viewTarget.name }}</span>
          <span class="foodInfoTextContent">HKD {{ viewTarget.price }}</span>
        </div>
      </div>
      <template #footer>
        <div class="price" style="float: left">
          <span class="priceText">HKD {{ viewTarget.price }}</span>
        </div>
        <a-space>
          <a-button type="primary" v-if="viewTarget.count > 0" @click="viewTarget.count--" shape="circle">
            <template #icon>
              <MinusOutlined style="font-size: 11px"/>
            </template>
          </a-button>
          <a-button type="primary" @click="orderFood(viewTarget.id)" shape="round">
            {{ viewTarget.count > 0 ? viewTarget.count : "加入購物車" }}
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
import {MinusOutlined} from '@ant-design/icons-vue'

export default {
  name: "orderMenu",
  data() {
    return {
      view: false,
      viewTarget: null
    }
  },
  methods: {
    orderFood(foodid, add) {
      this.$store.commit("orderFood", foodid);
    },
    viewFood(foodid) {
      this.view = true;
      this.viewTarget = this.$store.getters.findFood(foodid);
    }
  },
  components: {
    MinusOutlined
  }
}
</script>

<style lang="less">
#menu {
  margin-top: 10px;
  display: block;

  .block {
    padding: 0 10px;

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      display: block;
      padding: 5px;
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
}

.foodInfo {
  .foodImage {
    // cut to 1:1
    width: 100%;
    object-fit: cover;
  }

  .foodInfoText {
    margin-top: 10px;
    display: flex;

    .foodName {
      font-size: 20px;
      font-weight: bold;
    }

    .foodInfoTextContent {
      font-size: 16px;
      margin-top: 8px;
      margin-left: 5px;
      color: red;
      font-weight: 600;
    }
  }
}

.price {
  .priceText {
    font-size: 16px;
    font-weight: 500;
    color: red;
  }
}
</style>