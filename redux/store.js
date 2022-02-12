import throttle from 'lodash.throttle'
import { createStore } from 'redux'
import { loadState, saveState } from '../helpers/localStorage'
import rootReducer from './reducers/rootReducer'

const persistedState = loadState()
const store = createStore(rootReducer, persistedState)

store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart,
    })
  }, 3000)
)

export default store
