import { applyMiddleware, createStore } from 'redux'
import { loadState, saveState } from '../helpers/localStorage'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import throttle from '../helpers/throttle'

const persistedState = loadState()
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

store.subscribe(
  throttle(() => {
    saveState({
      cart: { cartData: store.getState().cart.cartData },
    })
  }, 1500)
)

export default store
