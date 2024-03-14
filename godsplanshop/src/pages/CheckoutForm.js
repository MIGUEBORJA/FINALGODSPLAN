import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/checkout.css'; 
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const CheckoutForm = () => {
  const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('YOUR_PUBLIC_KEY', {
    locale: "es-CO",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:5000/create_preference", {
        title: "Bananita contenta",
        quantity: 1,
        price: 100,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  }
  const [order, setOrder] = useState({
    client_name: "",
    client_address: "",
    client_contact: 0,
    client_email: "",
    client_id: 0,
    client_postal_code: 0,
  }); 

  const  handleChange = (e) => {
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

  const handleBuy = async () => {
    const id = await createPreference(); 
    if(id) {
      setPreferenceId(id); 
    }
  }

  return (
    <>
        <div className='container-checkout'>
            <h1 className='title'>Datos de envío</h1>
         <form className='check-form' onSubmit={handleClick}> 
            <label className='cont' htmlFor='client_email'>Contacto</label>
           <input className='controls' type='text' name='client_email' autoComplete='off' placeholder='Correo electrónico'
            onChange={handleChange}></input>
           <h3 className='h3'>Entrega</h3>
           <p className='inform'>(Solo envíos en el área metropólitana)</p>
            <label htmlFor='client_name'></label>
            <input className='controls' type='text' name='client_name' autoComplete='off' placeholder='Nombre Completo'
            onChange={handleChange}></input>
            <label htmlFor='client_id'></label>
            <input className='controls' type='number' name='client_id' autoComplete='off' placeholder='Cédula'
            onChange={handleChange}></input>
            <div className='address'>
                <label htmlFor='client_address'></label>
                <input className='controls-add' type='text' name='client_address' autoComplete='off' placeholder='Dirección'
                onChange={handleChange}></input>
                <label htmlFor='client_postal_code'></label>
                <input className='controls-add2' type='number' name='client_postal_code' autoComplete='off' placeholder='Código Postal'
                onChange={handleChange}></input>
            </div>
            <label htmlFor='client_contact'></label>
            <input className='controls' type='number' name='client_contact' autoComplete='off' placeholder='Teléfono'
            onChange={handleChange}></input>
             <button  type='submit' className='check'>Guardar formulario</button>
             <button onClick={handleBuy} className='check'>Finalizar Compra</button>
             {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
        </form>
        </div>
    </>
  )
}

export default CheckoutForm
