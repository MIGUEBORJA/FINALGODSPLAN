import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/addproduct.css';

const UpdateProduct = () => {
  const [product,setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    categories_id_categories: 0,
    image: null
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error){
        console.error("Error al obtener las categorías", error)
      }
    };

    fetchCategories();
  }, []);

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
      <div className='productForm'>
      <h1 className='title'>ACTUALIZAR UN PRODUCTO!!</h1> 
      <form encType="multipart/form-data" onSubmit={handleClick} className='addForm'>
      <input className='input' type='text' id='title' name='title' placeholder='Titulo del producto' onChange={handleChange} />
      <textarea  className='textarea' type='text' id='description' name='description' placeholder='Descripción del producto' onChange={handleChange} />
      <input className='input' type='number' id='price' name='price' step='1' placeholder='Precio del producto' onChange={handleChange} />
      <label htmlFor='categories_id_categories' >Categorías</label>
      <select id='categories_id_categories' name='categories_id_categories' onChange={handleChange} required>
        <option value="" >Elige una categoría</option>
        {
          categories.map(category => (
            <option key={category.id_categories} value={category.id_categories}>{category.name}</option>
          ))
        }
      </select>
      <label htmlFor='image' className='labelFile'>Imagen del producto</label>
        <input type='file' id='image' name='image' onChange={handleChange} className='fileInput' />
      <button className='btnSumbit'  type='submit' onClick={handleClick}>Actualizarr</button>
    </form>
      </div>
    </>
  )
}

export default UpdateProduct
