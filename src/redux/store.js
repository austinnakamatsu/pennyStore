import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './ProductsSlice'
import cartReducer from './CartSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    }
})

store.subscribe(() => {
    console.log("== store:", store.getState())
})

export default store
