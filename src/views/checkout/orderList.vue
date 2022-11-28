<template>
  <div id="orderList">
    <span class="title">
      購物車
    </span>
    <a-list>
      <a-list-item v-for="item in getAllFood" :key="item.id">
        <a-list-item-meta :title="item.name">
          <template #description>
            <span style="color: red">HKD {{ item.price }}</span>
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
export default {
  name: "orderList",
  methods: {
    getAllFood() {
      // get cart
      let cart = this.$store.state.cart;
      let foodList = []
      for (let i = 0; i < cart.length; i++) {

        foodList.push(food);
      }
    },
  },
}
</script>

<style lang="less" scoped>
#orderList {
  padding: 5px 10px;

  .title {
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: block;
  }
}
</style>