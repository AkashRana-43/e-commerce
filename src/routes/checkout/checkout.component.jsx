import React, {useContext} from 'react'

import { CartContext } from '../../contexts/CartContext'

import './checkout.styles.scss'

const Checkout = () => {
    const {cartItems} = useContext(CartContext)
  return (
    <div>
        {
            cartItems.map((cartItem)=>{
                return <div>
                    {/* <h2>{name}</h2> */}
                </div>
            })
        }
    </div>
  )
}

export default Checkout