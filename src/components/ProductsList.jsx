import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"

import { decreaseStock, selectFilteredProducts} from "../redux/ProductsSlice"
import { addToCart } from "../redux/CartSlice"

const ProductImage = styled.img`
    width: 100%;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`

// Optionally, define styles for individual grid items
const GridItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`

const StyledInput = styled.input`
  /* flex-grow: 1; // Allows the input to take up the available space */
  width: 50%;
  display: inline-block;
`

const FormContent = styled.div`
  display: flex;
  align-items: center; // Align items vertically in the center
`

const AddToCartButton = styled.button`
  width: 50%;
  display: inline-block;
  cursor: pointer;
`

export default function ProductsList(){
    const products = useSelector(selectFilteredProducts)
    const dispatch = useDispatch()
    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({product, quantity}))
        dispatch(decreaseStock({productId: product.id, quantity}))
    }
    return(
        <GridContainer>
            {products.map((product) => (
                <GridItem key={product.id}>
                    <h3>{product.name}</h3>
                    <ProductImage src={product.photoUrl} alt={product.name} />
                    <p>In Stock: {product.inStock}</p>
                    <p>${product.price}</p>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const quantity = e.target.elements.quantity.value
                        handleAddToCart(product, quantity)
                    }}>
                        <FormContent>
                            <StyledInput type="number" name="quantity" min="1" max={product.inStock} defaultValue="0" />
                            {product.inStock > 0 ? (
                                <AddToCartButton type="submit">Add to Cart</AddToCartButton>
                            ) : (
                                <button disabled>Out of Stock</button>
                            )}
                        </FormContent>
                    </form>
                </GridItem>
            ))}
        </GridContainer>
    )
}