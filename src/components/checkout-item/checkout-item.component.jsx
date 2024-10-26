import React, {useContext} from 'react'

import { CartContext } from '../../contexts/CartContext';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {

    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext)

    const {name, imageUrl, price, quantity} = cartItem;

    const deleteItemHandler = () => deleteItemFromCart(cartItem);
  return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`}/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <span className='arrow' onClick={() => removeItemFromCart(cartItem)}>&lt;</span>
            <span className='value'>{quantity}</span>
            <span className='arrow' onClick={() => addItemToCart(cartItem)}>&gt;</span>
        </span>
        <span className='price'>{price}</span>
        <span className='remove-button' onClick={deleteItemHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem