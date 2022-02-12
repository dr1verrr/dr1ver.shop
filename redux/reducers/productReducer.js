import { PRODUCT_UPDATE } from '../types'

//const [selected, setSelected] = useState('')
//const [count, setCount] = useState(1)
//const [price] = useState(product.price)
//const [optionPrice, setOptionPrice] = useState(0)

const initialState = { selected: '', count: 0, price: 0, optionPrice: 0 }

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default productReducer
