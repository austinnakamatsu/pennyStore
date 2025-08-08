import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers:{
        addToCart(state, action) {
            const { product, quantity } = action.payload
            const existItem = state.find(item => item.product.id === product.id)
            const qty = Number(quantity) // ensure int to add properly
            if (existItem){
                existItem.quantity += qty
            } else{
                state.push({product, quantity: qty})
            }
        },
        removeFromCart(state, action){
            const index = state.findIndex(item => item.product.id === action.payload.productId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        clearCart(){
            return []
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

export function selectCartItems (state){
    return state.cart
} 