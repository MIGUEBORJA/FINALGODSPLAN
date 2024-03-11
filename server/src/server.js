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
import payment from "./routes/payment.js"

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
app.use(payment); 

app.listen(5000, () => {
    console.log("Server on port 5000.."); 
})
