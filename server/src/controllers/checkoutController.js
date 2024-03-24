import db from "../db.js";

const createCheckout = (req, numberBuys, res) => {
    try {
        console.log('CHECKOUT')
        console.log(req)
        const currentDate = new Date();
        const sql = "INSERT INTO purchase_detail (`purchase_date`,`client_name`, `client_address`,`client_contact`,`client_email`,`client_id`,`client_postal_code`, `number_buys`, `quantity_products`) VALUES (?)"; 
        const values = [
            currentDate,
            req.body.checkoutInfo.client_name,
            req.body.checkoutInfo.client_address,
            req.body.checkoutInfo.client_contact,
            req.body.checkoutInfo.client_email,
            req.body.checkoutInfo.client_id,
            req.body.checkoutInfo.client_postal_code,
            numberBuys,
            req.body.quantity
        ]; 

        db.query(sql, [values], (err, data) => {
            if (err){
                console.error('Error en el servidor al crear el pedido'); 
            }
            if (data) { 
                console.error("El pedido ha sido creado"+data.insertId); 
            } else {

                console.error('Error: res no está definido'); 
            } 
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: error.message}); 
    }
}; 

export { createCheckout }; 