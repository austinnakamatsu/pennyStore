import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../redux/CartSlice"
import { updateStock } from "../redux/ProductsSlice"
import { removeFromCart, clearCart } from "../redux/CartSlice"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faL, faShoppingCart} from "@fortawesome/free-solid-svg-icons"
import styled from "@emotion/styled"

const ActiveCartButton = styled.button`
    position: fixed;
    right: 20px;
    top: 20px;
    background: none;
    border: none;
    cursor: pointer;
`

const CartList = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #fff;
    border-left: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: 0.5;
  cursor: pointer;
  font-size: 1rem;
`

export default function CartWidget () {
    const [isCartActive, setIsCartActive] = useState(false)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const cartActive = () => setIsCartActive(!isCartActive)
    const closeCart = () => setIsCartActive(false)

    const handleRemove = (productId, quantity) => {
        dispatch(removeFromCart({productId}))
        dispatch(updateStock({productId, quantity}))
    }
    const handleCheckout = () => {
        dispatch(clearCart())
    }
    return(
        <div>
            <ActiveCartButton onClick={cartActive}> 
                <FontAwesomeIcon icon={faShoppingCart} size="2x"/> ({cartItems.length})
            </ActiveCartButton>
            {isCartActive && (
                <CartList show={isCartActive}>
                    <CloseButton onClick={closeCart}>Close Cart</CloseButton>
                    <h4>Shopping Cart</h4>
                    {cartItems.length > 0 ? (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    {item.product.name} (${item.product.price}) <button onClick={() => handleRemove(item.product.id, item.quantity)}>Remove</button>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Total for {item.product.name}: ${(item.quantity * item.product.price).toFixed(2)}</p>
                                </li>
                            ))}
                            <button onClick={handleCheckout}>Checkout</button>
                        </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </CartList>
            )}
        </div>
    )
}