<template>
  <div id="menu">
    <div class="block" v-for="(list, key) in $store.state.menu" :id="`foodItem_${key+1}`">
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
              <a-image :src="item.img" alt="img" class="foodImage"/>
            </template>
          </a-list-item-meta>
          <a-space>
            <a-button type="primary" v-if="$store.getters.findCart(item.id) > 0" @click="$store.commit('removeFood', [item.id])"
                      shape="circle">
              <template #icon>
                <MinusOutlined style="font-size: 11px"/>
              </template>
            </a-button>
            <a-button type="primary" @click="viewFood(item.id)" shape="round">
              {{ $store.getters.findCart(item.id) > 0 ? $store.getters.findCart(item.id) : "加入購物車" }}
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
        </div>
      </div>
      <div class="custom">
        <div class="type" v-for="type in viewCustom">
          <span class="typeTitle">{{ type.name }}</span>
          <a-button :type="option.checked ? `primary` : undefined" v-for="option in type.items" :key="option.id"
                    :value="option.id" shape="round" class="typeItem" @click="option.checked = !option.checked">
            {{ option.name }}
            <span class="customPrice">
            {{ option.price ? `&nbsp;\$${option.price}` : "" }}
            </span>
          </a-button>
        </div>
      </div>
      <template #footer>
        <div class="price" style="float: left">
          <span class="priceText">HKD {{ getPrice() }}</span>
        </div>
        <a-space>
          <a-button type="primary" v-if="$store.getters.findCart(viewTarget.id) > 0" @click="$store.commit('removeFood', [viewTarget.id])"
                    shape="circle">
            <template #icon>
              <MinusOutlined style="font-size: 11px"/>
            </template>
          </a-button>
          <a-button type="primary" @click="orderFood(viewTarget.id)" shape="round">
            {{ $store.getters.findCart(viewTarget.id) > 0 ?
              $store.getters.findCart(viewTarget.id) : "加入購物車" }}
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
      viewTarget: null,
      viewCustom: []
    }
  },
  methods: {
    orderFood(foodid) {
      console.log(this.$store.state.cart);
      let viewCustom = JSON.parse(JSON.stringify(this.viewCustom));
      this.$store.commit("orderFood", [foodid, viewCustom]);
      this.$forceUpdate()
    },
    viewFood(foodid) {
      this.view = true;
      this.viewTarget = this.$store.getters.findFood(foodid);
      this.viewTarget = JSON.parse(JSON.stringify(this.viewTarget));
      const childList = this.$store.getters.findType(foodid).superChild || [];
      // get all viewCustom[].items
      this.viewCustom.child?.forEach(type => {
        type.items.forEach(item => {
          item.checked = item.default || false;
        })
      });
      // merge this.viewTarget.child and childList
      // get all viewTarget.child
      this.viewTarget.child?.forEach(type => {
        childList.push(type);
        type.items.forEach(item => {
          item.checked = item.default || false;
        })
      })
      // deep copy
      this.viewCustom = JSON.parse(JSON.stringify(childList));
      console.log(this.viewCustom);
    },
    getPrice() {
      let price = this.viewTarget.price;
      this.viewCustom.forEach(type => {
        type.items.forEach(item => {
          if (item.checked) {
            price += item.price;
          }
        })
      });
      return price;
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
  margin-bottom: 100px;

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
  }
}

.custom {
  margin-top: 10px;

  .type {
    margin-bottom: 10px;

    .typeTitle {
      border-bottom: 1px solid #ccc;
      color: #ccc;
      font-size: 16px;
      padding: 4px;
      display: block;
      margin-bottom: 8px;
      user-select: none;
    }

    .typeItem {
      margin-right: 8px;
      margin-bottom: 8px;
    }

    .customPrice {
      color: #ccc;
      font-size: 12px;
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