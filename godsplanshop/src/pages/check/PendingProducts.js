import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PendingProducts = () => {
    const [pendings, setPendings] = useState([]); 

    useEffect(() => {
        const fetchPendings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/pedidos/pending"); 
                setPendings(response.data);  
            } catch (error) {
               console.error("Error al obtener los productos pendientes", error);  
            }
        };

        fetchPendings(); 
    }, []); 

  return (
    <>
      <div className='categoryForm'>
        <div className='MainCategories'>
            <h1>Lista de pedidos</h1>
            <table className='tableUsers'>
                <thead>
                    <tr>
                        <th>Numero de compra</th>
                        <th>Id de producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {pendings.map((pending) => (
                        <tr key={pending.number_buys}>
                            <td>{pending.number_buys}</td>
                            <td>{pending.id_product}</td>
                            <td>{pending.quantity}</td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default PendingProducts
