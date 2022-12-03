<template>
  <div id="payment">
    <div class="main">
      <div class="route">
        <router-link to="/">
          <left-outlined style="margin-right: 5px"/>
        </router-link>
        購物車
      </div>
      <a-list class="itemList"
              :pagination="{position: 'bottom', pageSize: 5, showQuickJumper: true, total: $store.getters.getAllFood.length}"
              :data-source="$store.getters.getAllFood">
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
                <a-image :src="item.img" alt="img" class="foodImage"/>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <div class="payment-box">
        <div class="route">
          支付方式
        </div>
        <a-radio-group v-model:value="payment" class="payment">
          <a-radio :style="{display: 'flex', height: '30px', lineHeight: '30px'}"
                   v-for="(paymentName, key) in paymentMethod" :value="key + 1">
            {{ paymentName }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="fadeBottom"></div>
    <div id="bottom">
      <div class="count">
        <span class="text">支付方式: </span>
        <span class="payment">{{ payment === null ? "--" : paymentMethod[payment - 1] }}</span>
      </div>
      <div class="button">
          <a-button type="primary" shape="round" :disabled="!payment" @click="paymentEvent()">確認付款</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {LeftOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

export default {
  name: "index",
  data() {
    return {
      payment: null,
      paymentMethod: require("../../app/config.json").shop.payment
    };
  },
  methods: {
    paymentEvent() {
      this.$root.startLoading(() => {
        message.success("付款成功");
        this.$store.commit("cleanCart");
        this.$router.push("/");
      });
    }
  },
  components: {LeftOutlined}
}
</script>

<style lang="less">
#payment {
  .main {
    padding: 5px 10px;

    .route {
      font-size: 20px;
      font-weight: bold;
      padding: 8px;
      border-bottom: 1px solid #ccc;
      display: block;
    }

    .amount {
      font-size: 50px;
      font-weight: bold;
      padding: 8px;
      text-align: center;
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

    .payment-box {
      margin-bottom: 20px;

      .payment {
        margin: 10px 0;
      }
    }
  }

  #bottom {
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    width: 100%;
    background-color: var(--theme-color);
    color: var(--theme-color-text);
    padding: 20px;
    z-index: 10;

    .count {
      height: 100%;

      > span {
        display: block;
      }

      .text {
        font-size: 14px;
      }

      .payment {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .button {
      margin-left: auto;
    }
  }
}

.fadeBottom {
  height: 100px;
}
</style>