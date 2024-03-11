import React, {useState} from 'react';
import { CartProvider } from './context/CartContext.jsx';
import Nav from './components/Nav.js';
import { BrowserRouter } from 'react-router-dom'; 
import Rout from './Rout.js';
import Footer from './components/Footer.js';
import ProductDetail from './components/ProductDetail.js';

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
  //filter product
  const [product, setProduct] = useState(ProductDetail); 
  const searchbtn = (product) =>
  {
    const change = ProductDetail.filter((x) => {
      return x.Cat === product
    })
    setProduct(change)
  } 
  //product detail 
  const view = (product) =>
  {
    setDetail([{...product}])
    setClose(true)
  }
  return (
    <CartProvider>
    <BrowserRouter>
     <Nav searchbtn={searchbtn} />
     <Rout detail={detail} view={view} close={close} setClose={setClose} favorite={favorite} setFavorite={setFavorite} addtofavorite={addFavorite}/>
     <Footer/>
    </BrowserRouter>
    </CartProvider>
  ) 
}

export default App

