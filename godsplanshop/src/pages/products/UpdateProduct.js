import React, { useState} from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/update.css'; 

const UpdateProduct = () => {
  const [product,setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    categories_id_categories: 0,
    image: null
  });

  const navigate = useNavigate()
  const location = useLocation()

   const productId = location.pathname.split("/")[3]

   const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async e => {
    e.preventDefault()
    console.log("Datos del producto:", product);
    console.log(product); 
    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('categories_id_categories', product.categories_id_categories);
    try {
      if (!isNaN(product.categories_id_categories)) {
        await axios.put(`http://localhost:5000/product/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate("/product");
      } else {
        console.error('El valor de categories_id_categories no es un número válido.');
      }
    } catch (error) {
      console.error(error);
    }
  }


  console.log(product); 
  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleClick} className='update-form'>
      <h1 className='title'>ACTUALIZAR UN PRODUCTO!!</h1> 
      <input type='text' id='title' name='title' placeholder='Titulo del producto' onChange={handleChange} />
      <input type='text' id='description' name='description' placeholder='Descripción del producto' onChange={handleChange} />
      <input type='number' id='price' name='price' step='1' placeholder='Precio del producto' onChange={handleChange} />
      <input type='number' id='categories_id_categories' name='categories_id_categories' placeholder='categoría' onChange={handleChange} />
      <input type='file' id='image' name='image' onChange={handleChange} />
      <button  type='submit' onClick={handleClick}>Actualizarr</button>
    </form>
    </>
  )
}

export default UpdateProduct
