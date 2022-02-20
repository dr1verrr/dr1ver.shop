import throttle from 'lodash.throttle'
import { applyMiddleware, createStore } from 'redux'
import { loadState, saveState } from '../helpers/localStorage'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

const persistedState = loadState()
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart,
    })
  }, 3000)
)

export default store
