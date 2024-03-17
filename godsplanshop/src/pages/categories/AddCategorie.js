import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/category.css'; 

const AddCategorie = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({
        name: ''
    });   

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get("http://localhost:5000/categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Error al obtener las categorías:", error);
        }
      };
  
      fetchCategories();
    }, []);


    const navigate = useNavigate(); 

    const handleChange = (e) => {
      const {name, value } = e.target; 
      setCategory((prev) => ({...prev, [name]: value})); 
    } 

    const handleClick = async (e) => {
      e.preventDefault(); 
      console.log("Datos de la categoría:", category); 

      try {
        await axios.post("http://localhost:5000/categories/createcategorie", category);
        navigate('/dashboard/categories');
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        console.error("Detalles de la respuesta:", error.response.data); 
      }
    }

    const handleDelete = async (id) => {
      try {
          await axios.delete("http://localhost:5000/categories/" + id)
          window.location.reload()
      } catch (error) {
          console.log(error)
      }
  } 
  return (
    <>
    <div className='categoryForm'>
        <h1 className='title'>AGREGA UNA NUEVA CATEGORÍA!</h1> 
      <form onSubmit={handleClick} className='addCategory'>
        <input className='input' type='text' id='name' name='name' placeholder='Nombre de la categoría' onChange={handleChange} />
        <button className='btnSubmit'  type='submit' >Agregar nueva categoría</button>
     </form>

     <h1>Listado de Categorías</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id_categories}>
              <td>{category.id_categories}</td>
              <td>{category.name}</td>
              <td><button className='update'><Link to={`/dashboard/updatecategorie/${category.id_categories}`}>Update</Link></button></td>
              <td> <button className='delete' onClick={() => handleDelete(category.id_categories)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AddCategorie
