import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PurchaseTable = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                const response = await axios.get("http://localhost:5000/pedidos");
                setPurchases(response.data);
            } catch (error) {
                console.error("Error al obtener la lista de pedidos", error);
            }
        };

        fetchPurchase();
    }, []);
  return (
    <>
      <div className='categoryForm'>
        <div className='MainCategories'>
            <h1>Lista de pedidos</h1>
            <table className='tableUsers'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Dirección</th>
                        <th>Contacto</th>
                        <th>c. postal</th>
                        <th>Compra</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.number_buys}>
                            <td>{purchase.purchase_date}</td>
                            <td>{purchase.client_name}</td>
                            <td>{purchase.client_address}</td>
                            <td>{purchase.client_contact}</td>
                            <td>{purchase.client_postal_code}</td>
                            <td>{purchase.number_buys}</td>
                            <td>{purchase.buys_state}</td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default PurchaseTable
