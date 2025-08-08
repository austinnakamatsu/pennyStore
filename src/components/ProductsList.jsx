import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import { decreaseStock, selectFilteredProducts} from "../redux/ProductsSlice"
import { addToCart } from "../redux/CartSlice"

import { clearResetInputs } from '../redux/uiSlice'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
  padding: 20px;
  background-color: #f9fafb;
`
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  padding: 16px;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }
`

const ProductImage = styled.img`
  width: 160px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
`
const StyledInput = styled.input`
  width: 60px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-right: 12px;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`

const AddToCartButton = styled.button`
  padding: 10px 14px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content; /* 👈 avoids stretching in flex */
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bd1;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const FormContent = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;  /* pushes this footer to the bottom */
`
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 auto;
  overflow-wrap: break-word;  /* wrap long words */
  word-break: break-word;     /* for extra-long words/URLs */
  white-space: normal;
  align-items: center;
  justify-content: center;

  h3, p {
    margin: 0;
    line-height: 1.3;
    text-align: center;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #111;           /* darker color for heading */
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #555;           /* lighter text for details */
  }
`
const CardContent = styled.div`
  display: flex;
  gap: 16px;
  flex: 1 1 auto;
  min-width: 0;  /* important: allows flex children to shrink properly */
`

export default function ProductsList(){
    const [quantities, setQuantities] = useState({})
    const resetInputs = useSelector((state) => state.ui.resetInputs)
    
    const products = useSelector(selectFilteredProducts)
    const dispatch = useDispatch()
    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({product, quantity}))
        dispatch(decreaseStock({productId: product.id, quantity}))
    }
    const handleQuantityChange = (productId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Number(value)
        }))
    }
    useEffect(() => {
        if (resetInputs) {
            const resetQuantities = {}
            products.forEach((product) => {
            resetQuantities[product.id] = 0
            })
            setQuantities(resetQuantities)
            dispatch(clearResetInputs())
        }
    }, [resetInputs, products, dispatch])


    return(
        <GridContainer>
            {products.map((product) => (
                <GridItem key={product.id}>
                    <CardContent>
                        <ProductImage src={product.photoUrl} alt={product.name} />
                        <ProductDetails>
                            <h3>{product.name}</h3>
                            <p>In Stock: {product.inStock}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            
                        </ProductDetails>
                    </CardContent>
                    
                    <form onSubmit={(e) => {
                            e.preventDefault()
                            const quantity = e.target.elements.quantity.value
                            handleAddToCart(product, quantity)
                        }}>
                            <FormContent>
                                <StyledInput type="number" name="quantity" min="1" max={product.inStock} 
                                value={quantities[product.id] || 0}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}/>
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