import db from "../db.js";

const createCheckout = (additional_info, metadata,
    id, total_paid_amount, status, res) => {
    try {
        console.log('CHECKOUT')
        console.log(id)

        const currentDate = new Date();
        const sql = "INSERT INTO purchase (`number_buys`,`purchase_date`,`client_name`, `client_address`,`client_contact`,`client_email`,`client_id`,`client_postal_code`, `buys_state` ,`quantity_products`) VALUES (?)"; 
        const values = [
            id,
            currentDate,
            metadata.name,
            additional_info.payer.address.street_name,
            additional_info.payer.phone.number,
            metadata.email,
            metadata.identification.number,
            parseInt(additional_info.payer.address.zip_code),
            status,
            total_paid_amount
        ]; 

        db.query(sql, [values], (err, data) => {
            if (err){
                console.error('Error en el servidor al crear el pedido', err); 
            }
            if (data) { 
                console.error("El pedido ha sido creado"+data.insertId); 
                createCheckoutDetail(additional_info.items, id);
            } else {
                console.error('Error: res no está definido PURCHASE'); 
            } 
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: error.message}); 
    }
}; 


const createCheckoutDetail = (items, id, res) => {
    try {
        console.log('CHECKOUT DETAIL');
        const currentDate = new Date();
        const sql = "INSERT INTO purchase_detail (`number_buys`, `id_product`, `quantity`) VALUES ?"; 
        const values = recorrerSelectedProducts(items, id); 

        db.query(sql, [values], (err, data) => {
            if (err){
                console.error('Error en el servidor al crear detalle del pedido'); 
            }
            if (data) { 
                console.error("El detalle del pedido ha sido creado"+data.insertId); 
            } else {

                console.error('Error: res no está definido PURCHASE DETAIL', err); 
            } 
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: error.message}); 
    }
};

const recorrerSelectedProducts = (items, id,selectedProducts) => {
   return items.map((product) => {
        return [id, parseInt(product.id), parseInt(product.quantity)];
    });
}
export { createCheckout }; 