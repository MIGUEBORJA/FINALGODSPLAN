import db from "../db.js";

const createCheckout = (req, res) => {
    try {
        const currentDate = new Date();
        const sql = "INSERT INTO purchase_detail (`purchase_date`,`client_name`, `client_address`,`client_contact`,`client_email`,`client_id`,`client_postal_code`) VALUES (?)"; 
        const values = [
            currentDate,
            req.body.client_name,
            req.body.client_address,
            req.body.client_contact,
            req.body.client_email,
            req.body.client_id,
            req.body.client_postal_code,
        ]; 

        db.query(sql, [values], (err, data) => {
            if (err){
                console.error(err); 
                return res.status(500).json({ error: 'Error en el servidor al crear el pedido'}); 
            }
            return res.json("El pedido ha sido creado"); 
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: error.message}); 
    }
}; 

export { createCheckout }; 