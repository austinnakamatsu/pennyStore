import { useEffect } from 'react'
import { useDispatch } from 'react-redux' // sends actions to a reducer

import ProductsList from './components/ProductsList'

import { setProducts } from './redux/ProductsSlice'
import CartWidget from './components/CartWidget'

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    `/public/products.json`
                )
                const responseBody = await response.json()
                dispatch(setProducts(responseBody))
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])
    return (
        <div>
            <h1>Penny Candy Store</h1>
            <CartWidget />
            <ProductsList />
        </div>
    )
}
