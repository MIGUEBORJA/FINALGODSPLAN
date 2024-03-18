import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UpdateCategory = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error al obtener la categoría:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/categories/${id}`, category);
      navigate('/dashboard/categories');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      console.error('Detalles de la respuesta:', error.response.data);
    }
  };

  return (
    <>
    <div className='categoryForm'>
        <h1 className="title">EDITAR CATEGORÍA</h1>
      <form onSubmit={handleClick} className="addCategory">
        <input  className='input' type="text" id="name" name="name" placeholder="Nombre de la categoría" value={category.name} onChange={handleChange} />
        <button className='btnSubmit' type="submit">Actualizar</button>
      </form>
    </div>
    </>
  );
};

export default UpdateCategory;
