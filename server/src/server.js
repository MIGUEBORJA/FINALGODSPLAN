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
    accessToken: "",
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
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "COP",
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/watch?v=ndgsWcd3yUs",
                failure: "https://www.youtube.com/watch?v=b3FJgIZVW4g",
                pending: "https://www.youtube.com/watch?v=KDPhIQcaovQ"
            },
            auto_return: "approved",
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
