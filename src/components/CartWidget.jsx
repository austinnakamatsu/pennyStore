import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../redux/CartSlice"
import { updateStock } from "../redux/ProductsSlice"
import { removeFromCart, clearCart } from "../redux/CartSlice"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faShoppingCart, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons"
import styled from "@emotion/styled"
import { triggerResetInputs } from "../redux/uiSlice"

const ActiveCartButton = styled.button`
  position: fixed;
  right: 24px;
  top: 24px;
  border: none;
  padding: 12px;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`

const CartList = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 340px;
  height: 100%;
  background-color: #ffffff;
  border-left: 1px solid #eaeaea;
  padding: 20px;
  box-shadow: -4px 0 12px rgba(0,0,0,0.1);
  overflow-y: auto;
  z-index: 1000;
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const CartTitle = styled.h4`
  margin: 0;
  margin-bottom: 20px;
  font-size: 1.25rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f9fa;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
`

const ItemDetails = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-top: 6px;

  p {
    margin: 2px 0;
  }
`

const TotalSection = styled.div`
  padding-top: 12px;
  border-top: 1px solid #e1e1e1;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 16px;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;

  button {
    flex: 1;
    padding: 10px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`

const CheckoutButton = styled.button`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`

const ClearButton = styled.button`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`

export default function CartWidget () {
  const [isCartActive, setIsCartActive] = useState(false)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const toggleCart = () => setIsCartActive(!isCartActive)
  const closeCart = () => setIsCartActive(false)

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart({ productId }))
    dispatch(updateStock({ productId, quantity }))
  }

  const handleCheckout = () => {
    dispatch(clearCart())
    dispatch(triggerResetInputs())
  }

  const handleClearAll = () => {
    cartItems.forEach(item => {
      dispatch(updateStock({ productId: item.product.id, quantity: item.quantity }))
    })
    dispatch(clearCart())
    dispatch(triggerResetInputs())
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  )

  return (
    <div>
      <ActiveCartButton onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} />
        &nbsp;({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </ActiveCartButton>

      {isCartActive && (
        <CartList>
          <CloseButton onClick={closeCart}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>

          <CartTitle>Shopping Cart</CartTitle>

          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <ItemCard key={index}>
                  <ItemHeader>
                    {item.product.name}
                    <button
                      onClick={() =>
                        handleRemove(item.product.id, item.quantity)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#888"
                      }}
                      title="Remove"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </ItemHeader>
                  <ItemDetails>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.product.price.toFixed(2)}</p>
                    <p>Total: ${(item.quantity * item.product.price).toFixed(2)}</p>
                  </ItemDetails>
                </ItemCard>
              ))}

              <TotalSection>Total: ${totalPrice.toFixed(2)}</TotalSection>

              <ButtonRow>
                <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
                <ClearButton onClick={handleClearAll}>Clear All</ClearButton>
              </ButtonRow>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </CartList>
      )}
    </div>
  )
}
