import { GET_USERNAME } from '../types'

const initialState = {}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return action.payload

    default:
      return state
  }
}
