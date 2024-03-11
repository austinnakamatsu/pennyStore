import { createSlice } from '@reduxjs/toolkit'

const allProductsSlice = createSlice({
    name: "allProducts",
    initialState: [],
    reducers: {
        setProducts(state, action) {
            return action.payload
        },
        decreaseStock (state, action) {
            const { productId, quantity } = action.payload;
            const product = state.find(p => p.id === productId);
            if (product){
                product.inStock -= quantity;
            }
        },
        updateStock (state, action) {
            const { productId, quantity } = action.payload
            const product = state.find(p => p.id === productId)
            if (product){
                // ensure that the quantity is a number
                product.inStock += Number(quantity)
            }
        }
    }
})

console.log("== allProductsSlice:", allProductsSlice)

export default allProductsSlice.reducer // processing and saving data in store
export const { setProducts, decreaseStock, updateStock } = allProductsSlice.actions // transport data from client to html

// selector gets the saved data to the html
export function selectFilteredProducts(state) {
    return state.products
}