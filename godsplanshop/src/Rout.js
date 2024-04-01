import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Product from './components/Product.js'
import Contact from './components/Contact.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Dashboard from './pages/Dashboard.js'
import AddProduct from './pages/products/AddProduct.js'
import UpdateProduct from './pages/products/UpdateProduct.js'
import AddCategorie from './pages/categories/AddCategorie.js'
import UpdateCategorie from './pages/categories/UpdateCategorie.js'
import UserList from './pages/users/UserList.js'
import UpdateUser from './pages/users/UpdateUser.js'
import Favorite from './components/favorite.js'
import CheckoutForm from './pages/CheckoutForm.js'
import About from './pages/About.js'
import PurchaseTable from './pages/check/PurchaseTable.js'
import PendingProducts from './pages/check/PendingProducts.js';

const Rout = ({product, setProduct, detail, view, close, setClose, favorite, setFavorite, addtofavorite}) => {
  return (
    <>
      <Routes>
        <Route path='/favorite' element={<Favorite favorite={favorite} setFavorite={setFavorite} />} />
        <Route path='/' element={<Home detail={detail} view={view} close={close} setClose={setClose} addtofavorite={addtofavorite}/>}/>
        <Route path='/product' element={<Product product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose}addtofavorite={addtofavorite}/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/dashboard/addproduct' element={<AddProduct/>}></Route>
        <Route path='/dashboard/updateproduct/:id_product' element={<UpdateProduct/>}></Route>
        <Route path='/dashboard/categories' element={<AddCategorie/>}></Route>
        <Route path='/dashboard/updatecategorie/:id' element={<UpdateCategorie/>}/>
        <Route path='/dashboard/userslist' element={<UserList/>}/>
        <Route path='/dashboard/updateuser/:id' element={<UpdateUser/>}/> 
        <Route path='/checkoutform'  element={<CheckoutForm/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard/checklist' element={<PurchaseTable/>}/>
        <Route path='/dashboard/pending' element={<PendingProducts/>}/>
      </Routes>
    </>
  )
}

export default Rout
