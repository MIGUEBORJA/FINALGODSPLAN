import React, { useState } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Nav from './components/Nav.js';
import { BrowserRouter } from 'react-router-dom';
import Rout from './Rout.js';
import Footer from './components/Footer.js';
import { CheckoutProvider } from './context/InfoContext.jsx';
import Swal from 'sweetalert2';

const App = () => {

  //favoritos
  const [favorite, setFavorite] = useState([])
  const addFavorite = (product) => {
    const exsit = favorite.find((x) => {
      return x.id === product.id
    })
    if (exsit) {
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
        icon: "info",
        title: "Ya se encuentra en favoritos"
      });
    }
    else {
      setFavorite([...favorite, { ...product, qty: 1 }])
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
      title: "Ha sido agregado a favoritos"
    });
    }
  }

  //product detail
  const [close, setClose] = useState(false)
  const [detail, setDetail] = useState([])
  //product detail 
  const view = (product) => {
    setDetail([{ ...product }])
    setClose(true)
  }
  return (
    <CheckoutProvider>
      <CartProvider>
        <BrowserRouter>
          <Nav />
          <Rout detail={detail} view={view} close={close} setClose={setClose} favorite={favorite} setFavorite={setFavorite} addtofavorite={addFavorite} />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </CheckoutProvider>

  )
}

export default App

