import React, { useContext, useState } from 'react'
import '../styles/checkout.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { CartContext } from '../context/CartContext';

const CheckoutForm = () => {
  const { cartItems } = useContext(CartContext);
  const [preferenceId, setPreferenceId] = useState([])
  initMercadoPago('APP_USR-d469ee1a-21f8-43b3-bc87-21d5c09b9777', {
    locale: "es-CO",
  });
  const total = cartItems.reduce((acc, product) => acc + (product.price * product.amount), 0);
  const title = cartItems.length === 0 ? "" : cartItems[0].title;
  const totalQuantity = cartItems.reduce((acc, product) => 0 + product.amount, 0);

  const createPreference = async () => {
    if (cartItems.length === 0) {
      return <p>El carrito está vacío</p>;
    }
    try {
      const itemsData = cartItems.map((product) => ({
        id: product.id_product,
        title: product.title,
        quantity: product.amount,
        unit_price: product.price,
      }));
      const response = await axios.post("http://localhost:5000/create_preference", {
        title,
        quantity: totalQuantity,
        unit_price: total,
        items: itemsData,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  }
  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };
  const [order, setOrder] = useState({
    client_name: "",
    client_address: "",
    client_contact: 0,
    client_email: "",
    client_id: 0,
    client_postal_code: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Datos del pedido", order);

    try {
      await axios.post("http://localhost:5000/pedidos/createcheckout", order);
    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
      console.error("detalles de la respuesta:", error.response.data)
    }
  }



  return (
    <>
      <div className='container-checkout'>
        <h1 className='title'>Datos de envío</h1>
        <form className='check-form'>
          <label className='cont' htmlFor='client_email'>Contacto</label>
          <input className='controls' type='text' name='client_email' autoComplete='off' placeholder='Correo electrónico'
            onChange={handleChange} required></input>
          <h3 className='h3'>Entrega</h3>
          <p className='inform'>(Solo envíos en el área metropólitana)</p>
          <label htmlFor='client_name'></label>
          <input className='controls' type='text' name='client_name' autoComplete='off' placeholder='Nombre Completo'
            onChange={handleChange} required></input>
          <label htmlFor='client_id'></label>
          <input className='controls' type='number' name='client_id' autoComplete='off' placeholder='Cédula'
            onChange={handleChange} required></input>
          <div className='address'>
            <label htmlFor='client_address'></label>
            <input className='controls-add' type='text' name='client_address' autoComplete='off' placeholder='Dirección'
              onChange={handleChange} required></input>
            <label htmlFor='client_postal_code'></label>
            <input className='controls-add2' type='number' name='client_postal_code' autoComplete='off' placeholder='Código Postal'
              onChange={handleChange} required></input>
          </div>
          <label htmlFor='client_contact'></label>
          <input className='controls' type='number' name='client_contact' autoComplete='off' placeholder='Teléfono'
            onChange={handleChange}></input>
          <button onSubmit={handleClick} type='submit' className='check'>Guardar formulario</button>
        </form>
        <button onClick={handleBuy} className='finishBtn'>haz click aquí</button>
        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
      </div>
    </>
  )
}

export default CheckoutForm
