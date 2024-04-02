import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  validateTitle,
  validateDescription,
  validatePrice,
} from '../../CheckValidation';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    categories_id_categories: 0
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error al obtener las categorías", error)
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setProduct(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTitle(product.title)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Título inválido',
      });
      return;
    }

    if (!validateDescription(product.description)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Descripción inválida',
      });
      return;
    }

    if (!validatePrice(product.price)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Precio debe ser mayor a 10,000',
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('categories_id_categories', product.categories_id_categories);

    try {
      await axios.post("http://localhost:5000/product/createproduct", formData);
      navigate("/product");
      Swal.fire({
        icon: 'success',
        title: 'Añadido correctamente!',
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Swal.fire({
        icon: 'warning',
        title: 'No se añadió el producto',
      });
    }
  };

  return (
    <>
      <div className='productForm'>
        <h1 className='title'>Publicar Producto!</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit} className='addForm'>
          <input className='input' type='text' id='title' name='title' placeholder='Titulo del producto' onChange={handleChange} required maxLength={40} />
          <textarea className='textarea' type='text' id='description' name='description' placeholder='Descripción del producto' onChange={handleChange} />
          <input className='input' type='number' id='price' name='price' step='1' placeholder='Precio del producto' onChange={handleChange} required />
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
          <button className='btnSumbit' type='submit'>Agregar</button>
        </form>
      </div>
    </>
  )
}

export default AddProduct;
