import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers:{
        addToCart(state, action) {
            const { product, quantity } = action.payload
            state.push({product, quantity})
        },
        removeFromCart(state, action){
            const index = state.findIndex(item => item.product.id === action.payload.productId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        clearCart(state){
            return []
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

export function selectCartItems (state){
    return state.cart
} 