import  express  from "express";
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'; 
import db from "./db.js";
import authRoutes from "./routes/authRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js"; 
import productRoutes from './routes/product.js'; 
import bodyParser from "body-parser";
import categoriesRoutes from "./routes/categoriesRoutes.js"; 
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createCheckout } from "./controllers/checkoutController.js";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-7746925915044072-031218-3e1c4d380d77f9713bf9e92c41e3d84d-1723222079",
});

const app = express(); 
app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
})); 
app.use(cookieParser()); 
app.use(express.static('src/public'));
app.get("/", (req, res) => {
    res.json("Hola este es el backend")
})
app.post("/create_preference", async (req, res) => {
    console.log(req);
    try {
        const items = recorrerCarItems(req.body.selectedProducts);
        const body = {
            items,
            metadata: {
                email:  req.body.checkoutInfo.client_email,
                name: req.body.checkoutInfo.client_name,
                identification: {
                    number: req.body.checkoutInfo.client_id
                }
            },
            back_urls: {
                success: "https://www.youtube.com/watch?v=ndgsWcd3yUs",
                failure: "https://www.youtube.com/watch?v=b3FJgIZVW4g",
                pending: "https://www.youtube.com/watch?v=KDPhIQcaovQ"
            },
            payer: {
                address:{
                    street_name:req.body.checkoutInfo.client_address,
                    zip_code:req.body.checkoutInfo.client_postal_code
                },
                phone: {
                    number:req.body.checkoutInfo.client_contact
                }
            },
            transaction_amount: req.body.quantity,
            auto_return: "approved",
            notification_url: "https://1202-186-80-28-48.ngrok-free.app/webhook"
        };

        const preference = new Preference(client); 
        const result = await preference.create({ body }); 
        console.log("VER /RESULT");
        console.log(result);

        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :c ",
        }); 
    }
});


const recorrerCarItems = (carItems, selectedProducts) => {
   return carItems.map((item) => {
        return {
            title: item.title,
            quantity:Number(item.amount),
            unit_price: Number(item.price),
            currency_id: "COP",
            id: item.id_product
        };
    });
}


app.post("/webhook", async function (req, res){
    console.log("VER /WEBHOOK");
    console.log(req.query);
    const payment = req.query; 

    const paymentId = req.query.id; 

    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        }); 

        if (response.ok) {
            const data = await response.json(); 
            console.log('PRUEBA RESPUESTA webhook'); 
            console.log(data); 
            console.log(data.additional_info.items); 
            console.log(data.additional_info.payer.address); 
            console.log(data.additional_info.payer.phone); 
            console.log(data.metadata); 
            createCheckout(data.additional_info,
                data.metadata, data.id,
                data.transaction_details.total_paid_amount,
                data.status
            );
        } 
        res.sendStatus(200)  
        
    } catch (error) {
        console.error('Error', error); 
        res.sendStatus(500)
    }
})
app.use('/auth', authRoutes);
app.get("/products", (req, res) => {
    const q = "SELECT * FROM products"
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})
app.use('/user', userRoutes);
app.use('/admin', adminRoutes); 
app.use('/product', productRoutes); 
app.use('/categories', categoriesRoutes); 
app.use('/pedidos', checkoutRoutes); 

app.listen(5000, () => {
    console.log("Server on port 5000.."); 
})
