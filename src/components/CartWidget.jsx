import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../redux/CartSlice"
import { updateStock } from "../redux/ProductsSlice"
import { removeFromCart, clearCart } from "../redux/CartSlice"

export default function CartWidget () {
    const [isCartActive, setIsCartActive] = useState(false)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const cartActive = () => setIsCartActive(!isCartActive)

    const handleRemove = (productId, quantity) => {
        dispatch(removeFromCart({productId}))
        dispatch(updateStock({productId, quantity}))
    }
    const handleCheckout = () => {
        dispatch(clearCart())
    }
    return(
        <div>
            <button onClick={cartActive}>View Cart ({cartItems.length})</button>
            {isCartActive && (
                <div style={{ position: 'absolute', right: 20, top: 50, width: 300, backgroundColor: '#fff', border: '1px solid #ddd', padding: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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
                    </div>
            )}
        </div>
    )
}