import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './ProductsSlice'
import cartReducer from './CartSlice'
import uiReducer from './uiSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        ui: uiReducer,
    }
})

store.subscribe(() => {
    console.log("== store:", store.getState())
})

export default store
