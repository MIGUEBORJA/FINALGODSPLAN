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
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity:Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    items: req.body.items,
                    currency_id: "COP",
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/watch?v=ndgsWcd3yUs",
                failure: "https://www.youtube.com/watch?v=b3FJgIZVW4g",
                pending: "https://www.youtube.com/watch?v=KDPhIQcaovQ"
            },
            auto_return: "approved",
            notification_url: "https://d9ba-2800-e2-be80-dfd-85ec-5a7f-f20a-ae01.ngrok-free.app/webhook"
        };

        const preference = new Preference(client); 
        const result = await preference.create({ body }); 
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

app.post("/webhook", async function (req, res){
    const payment = req.query; 
    console.log({payment});


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
            console.log(data); 
        }

        res.sendStatus(200);
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
