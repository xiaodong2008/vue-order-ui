import {createStore} from 'vuex'

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
    orderFood(state, foodid) {
      // found in cart
      let found = state.cart.find((item) => item.id === foodid);
      if (found) {
        found.count++;
      } else {
        // not found in cart
        // found menu from getters
        let food = this.getters.findFood(foodid);
        food.count = 1;
        state.cart.push(food);
      }
      console.log(state.cart);
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
    }
  }
})

export default store