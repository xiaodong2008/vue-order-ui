const lc = require('../app/config.json').localStorageName

function listenCart(store) {
  store.subscribe((mutation, state) => {
    if (state.cart.length > 0) {
      localStorage.setItem(`${lc}-cart`, JSON.stringify(state.cart))
      localStorage.setItem(`${lc}-menu`, JSON.stringify(state.menu))
    } else {
      localStorage.removeItem(`${lc}-cart`)
    }
  })
}

export {listenCart}