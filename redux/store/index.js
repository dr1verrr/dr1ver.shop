import { applyMiddleware, createStore } from 'redux'
import storeSynchronize from 'redux-localstore'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

storeSynchronize(store)
