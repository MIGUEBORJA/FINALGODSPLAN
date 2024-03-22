import React, {useState} from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Nav from './components/Nav.js';
import { BrowserRouter } from 'react-router-dom'; 
import Rout from './Rout.js';
import Footer from './components/Footer.js';
import { CheckoutProvider } from './context/InfoContext.jsx';

const App = () => {

  //favoritos
  const [favorite, setFavorite] = useState([])
  const addFavorite = (product) => {
    const exsit = favorite.find((x) => {
      return x.id === product.id
    })
    if (exsit) {
      alert("Este producto ya se encuentra añadido a favoritos")
    }
    else {
      setFavorite([...favorite, { ...product, qty: 1 }])
      alert("El producto ha sido añadido a favoritos")
    }
  }

  //product detail
  const [close, setClose] = useState(false)
  const [detail, setDetail] = useState([])
  //product detail 
  const view = (product) =>
  {
    setDetail([{...product}])
    setClose(true)
  }
  return (
    <CheckoutProvider>
    <CartProvider>
    <BrowserRouter>
     <Nav />
     <Rout detail={detail} view={view} close={close} setClose={setClose} favorite={favorite} setFavorite={setFavorite} addtofavorite={addFavorite}/>
     <Footer/>
    </BrowserRouter>
    </CartProvider>
    </CheckoutProvider>
  ) 
}

export default App

