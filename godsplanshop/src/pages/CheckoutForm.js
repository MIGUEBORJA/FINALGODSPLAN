import React, { useContext, useState } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { CartContext } from '../context/CartContext';
import { InfoContext } from '../context/InfoContext';
import checkout from '../styles/checkout.css';
import modal from '../styles/modal.css';
import { validateEmail, validatePostalCode, validatePhoneNumber, validateDocumentID, validateName, validateAddress } from '../CheckValidation';
import Swal from 'sweetalert2';


const CheckoutForm = () => {
  const { cartItems } = useContext(CartContext);
  const { value, setValue } = useContext(InfoContext);
  const [preferenceId, setPreferenceId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Inicialización de MercadoPago
  initMercadoPago('APP_USR-da627b25-ad50-4259-804c-fa0077647116', {
    locale: 'es-CO',
  });

  const total = cartItems.reduce((acc, product) => acc + (product.price * product.amount), 0);
  const title = cartItems.length === 0 ? "" : cartItems[0].title;
  const totalQuantity = cartItems.reduce((acc, product) => 0 + product.amount, 0);

  const createPreference = async () => {
    if (cartItems.length === 0) {
      return <p>El carrito está vacío</p>;
    }
    try {
      const response = await axios.post("http://localhost:5000/create_preference", {
        title,
        quantity: totalQuantity,
        unit_price: total,
        selectedProducts: cartItems,
        checkoutInfo: value
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
      setShowModal(true); // Mostrar el modal después de obtener el ID de preferencia
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

    if (!validateEmail(order.client_email)) {
       //alert
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Ingrese un E-mail válido"
      });
      return;
    }

    if (!validatePostalCode(order.client_postal_code)) {
       //alert
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Ingrese un código postal válido"
      });
      return;
    }

    if (!validatePhoneNumber(order.client_contact)) {
       //alert
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Ingrese un numero de telefono válido",
      });
      return;
    }

    if (!validateDocumentID(order.client_id)) {
       //alert
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Ingrese un documento de identidad válido"
      });
      return;
    }

    if (!validateName(order.client_name)) {
 //alert
 const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "warning",
  title: "Ingrese un nombre válido sin números ni caracteres especiales"
});      return;
    }

    if (!validateAddress(order.client_address)) {
 //alert
 const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "warning",
  title: "Ingrese una direccion válida"
});      return;
    }
    


    try {
      await setValue(order);
      //alert
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Registro exitoso!"
      });
      setShowModal(true); // Mostrar el modal después de guardar el formulario

    } catch (error) {
      console.error("Error al enviar la solicitud: ", error);
      console.error("Detalles de la respuesta:", error.response.data);
    }
  };


  return (
    <>
      <div className='checkout-container'>
        <h1 className='title'>Datos de envío</h1>
        <div className='form'>
          
          <form className='check-form' onSubmit={handleClick}>
  <label className='cont' htmlFor='client_email'></label>
  <input className='form-control' type='text' name='client_email' autoComplete='off' placeholder='Correo electrónico'
    onChange={handleChange} maxLength={100} required></input>
  {/* maxLength para el maximo de caracteres */}
  <label htmlFor='client_name'></label>
  <input className='form-control' type='text' name='client_name' autoComplete='off' placeholder='Nombre Completo'
    onChange={handleChange} maxLength={40} required></input>
  <label htmlFor='client_id'></label>
  <input className='form-control' type='text' name='client_id' autoComplete='off' placeholder='Cédula'
    onChange={handleChange} maxLength={11} required></input>

<div className='address'>
  <label htmlFor='client_address'></label>
  <select className='form-control' name='client_address_prefix' onChange={handleChange} required>
    <option value='Cll'>Cll</option>
    <option value='Cr'>Cr</option>
  </select>
  <input className='form-control' type='text' name='client_address' autoComplete='off' placeholder='Dirección'
    onChange={handleChange} maxLength={3} required></input>

    <select className='form-control' name='client_address_prefix' onChange={handleChange} required>
    <option value='Cll'>N°</option>
    <option value='Cr'>Cr</option>
    <option value='Cll'>Cll</option>

  </select>
  <input className='form-control' type='text' name='client_address' autoComplete='off' placeholder='Dirección'
    onChange={handleChange} maxLength={3} required></input>

<select className='form-control' name='client_address_prefix' onChange={handleChange} required>
    <option value='Cll'>-</option>
  </select>
  <input className='form-control' type='text' name='client_address' autoComplete='off' placeholder='Dirección'
    onChange={handleChange} maxLength={3} required></input>

</div>

<label htmlFor='client_postal_code'></label>
  <input className='form-control' type='text' name='client_postal_code' autoComplete='off' placeholder='Código Postal'
    onChange={handleChange} maxLength={6} required></input>

  <label htmlFor='client_contact'></label>
  <input className='form-control' type='text' name='client_contact' autoComplete='off' placeholder='Teléfono'
    onChange={handleChange} maxLength={10}></input>

  <button type='submit' className='btn btn-primary'>Guardar formulario</button>
  
</form>


          {/* Modal */}
          {showModal &&
            <div className="fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="dialog dialog-centered">
                <div className="content">
                  <div className="modal-header">
                    <h5 className="title" id="exampleModalLabel">Datos guardados exitosamente</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} label="Close">X</button>
                  </div>
                  <div className="modal-body">
                    <button onClick={handleBuy} className='btn btn-primary'>Finalizar Compra</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
