import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import '../styles/cartitem.css';  

const ItemCart = ({item}) => {
    const { deleteItemToCart, addItemToCart } = useContext(CartContext);

    const { id_product } = item;
  return (
    <>
     <div className='cartItem'>
     <img src={`http://localhost:5000/images/`+item.image} alt={item.title} />
     <div className='dataContainer'>
        <div className='left'>
            <p>{item.title}</p>
            <div className='buttons'>
                <button onClick={() => addItemToCart(item)}>Agregar</button>
                <button onClick={() => deleteItemToCart(item)}>Sacar</button>
            </div>
        </div>
            <div className='rigth'>
                <div>{item.amount}</div>
                <p><span>$</span>{item.amount * item.price}</p>
            </div>
        </div>
     </div>
    </>
  )
}

export default ItemCart
