import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product,setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    categories_id_categories: 0
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


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setProduct(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
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
      await axios.post("http://localhost:5000/product/createproduct", formData);
      navigate("/product");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      console.error("Detalles de la respuesta:", error.response.data);
    }
}


  console.log(product); 
  return (
    <>
    <form encType="multipart/form-data" onSubmit={handleClick} className='update-form'>
      <h1 className='title'>REGISTRAR UN NUEVO PRODUCTO!!</h1> 
      <input type='text' id='title' name='title' placeholder='Titulo del producto' onChange={handleChange} />
      <input type='text' id='description' name='description' placeholder='Descripción del producto' onChange={handleChange} />
      <input type='number' id='price' name='price' step='1' placeholder='Precio del producto' onChange={handleChange} />
      <select id='categories_id_categories' name='categories_id_categories' onChange={handleChange}>
        <option value={0} disabled >Selecciona una categoría</option>
        {
          categories.map(category => (
            <option key={category.id_categories} value={category.id_categories}>{category.name}</option>
          ))
        }
      </select>
      <input type='file' id='image' name='image' onChange={handleChange} />
      <button  type='submit' onClick={handleClick}>Agregar</button>
    </form>
    </>
  )
}

export default AddProduct
