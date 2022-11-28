import {createStore} from 'vuex'
import {message} from "ant-design-vue";

let menu = require("../app/menu.json").menu
// give id
let id = 1
menu.forEach(item => {
  item.items.forEach(item => {
    item.id = id++
  })
})

const store = createStore({
  state: {
    "menu": menu,
    "cart": []
  },
  mutations: {
    orderFood(state, [foodid, custom]) {
      // found in cart
      let found = state.cart.find((item) => item.id === foodid);
      if (found) {
        found.count++;
        found.custom.push(custom)
      } else {
        // not found in cart
        // found menu from getters
        let food = this.getters.findFood(foodid);
        food.count = 1;
        food.custom = [custom];
        state.cart.push(food);
      }
      // === 彩蛋，可删除 ===
      if (this.getters.getTotal > 1000) {
        if (this.getters.getTotal > 1500) {
          let output = ""
          // for 1500-1400 / 100 round up
          for (let i = 0; i < Math.ceil((this.getters.getTotal - 1500) / 100); i++) {
            if (output.length < 20)
            output += "6"
          }
          message.warn(output)
        } else
          message.warn("兄弟你们公司团建吗？")
      }
      // === 彩蛋，可删除 ===
    },
    removeFood(state, [foodid, key]) {
      let found = state.cart.find((item) => item.id === foodid);
      if (found) {
        found.count--;
        if (key)
          found.custom.splice(key, 1)
        else
          found.custom.pop()
      }
    }
  },
  actions: {},
  getters: {
    findFood(state) {
      // found in menu
      return (foodid) => {
        return state.menu.map((item) => item.items).flat().find((item) => item.id === foodid);
      }
    },
    foodCount(state) {
      // found in cart.count
      return state.cart.map((item) => item.count).reduce((a, b) => a + b, 0);
    },
    findType(state) {
      return (foodid) => {
        // return state.menu.name
        return state.menu.find((item) => item.items.find((item) => item.id === foodid));
      }
    },
    getTotal(state) {
      let price = 0;
      state.cart.forEach((food) => {
        price += food.price * food.count;
        food.custom.forEach((item) => {
          item.forEach((type) => {
            type.items.forEach((custom) => {
              if (custom.checked) {
                price += custom.price;
              }
            })
          })
        })
      })
      return price;
    }
  }
})

export default store