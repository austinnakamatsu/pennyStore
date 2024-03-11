import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"

import { decreaseStock, selectFilteredProducts} from "../redux/ProductsSlice"
import { addToCart } from "../redux/CartSlice"

const ProductImage = styled.img`
    width: 15rem;
`

export default function ProductsList(){
    const products = useSelector(selectFilteredProducts)
    const dispatch = useDispatch()
    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({product, quantity}))
        dispatch(decreaseStock({productId: product.id, quantity}))
    }
    return(
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <ProductImage src={product.photoUrl} alt={product.name} />
                    <p>In Stock: {product.inStock}</p>
                    <p>${product.price}</p>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const quantity = e.target.elements.quantity.value
                        handleAddToCart(product, quantity)
                    }}>
                        <input type="number" name="quantity" min="1" max={product.inStock} defaultValue="0" />
                        {product.inStock > 0 ? (
                            <button type="submit">Add to Cart</button>
                        ) : (
                            <button disabled>Out of Stock</button>
                        )}
                    </form>
                </div>
            ))}
        </div>
    )
}