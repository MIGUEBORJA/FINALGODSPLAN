import db from "../db.js";
import ModelProduct from "../models/ModelProduct.js";

const createProduct = (req, res) => {
    try {
        const product = new ModelProduct(null, req.body.title,  req.body.description, req.body.price, req.file.filename, req.body.categories_id_categories)
        if (!req.file) {
            throw new Error('No se ha proporcionado ningún archivo');
        }
        const sql = `INSERT INTO products (title ,description, price, image, categories_id_categories) VALUES ('${product.title}','${product.description}',${product.price},'${product.image}', ${product.categories_id_categories})`; 
        db.query(sql, (err, data) => {
            if (err) {
                console.error(err); 
                return res.status(500).json({ error: 'Error en el servidor al crear el producto' });
            } 
            return res.json("El producto ha sido creado"); 
        });


        
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const sql = "DELETE FROM products WHERE id_product = ?";

        db.query(sql, [productId], (err, data) => {
            if (err) {
                console.error('Error al eliminar el producto:', err);
                res.status(500).json({ error: 'Error en el servidor al eliminar el producto' });
            } else {
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error en el servidor al eliminar el producto' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, price, categories_id_categories } = req.body;

        let newImage = null;
        let imageUrl = null;
        
        if (req.file) {
            newImage = req.file.filename;
            imageUrl = newImage;
            console.log('URL de la nueva imagen:', imageUrl);
        }
        
        const sql = "UPDATE products SET `title` = ?, `description` = ?, `price` = ?, `categories_id_categories` = ?, `image` = ? WHERE id_product = ?";
        const values = [title, description, price, categories_id_categories, imageUrl, productId];


        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error al editar el producto:', err);
                res.status(500).json({ error: 'Error en el servidor al editar el producto' });
            } else {
                res.status(200).json({ message: 'Producto editado exitosamente' });
            }
        });
    } catch (error) {
        console.error('Error al editar el producto:', error);
        res.status(500).json({ error: 'Error en el servidor al editar el producto' });
    }
}


export { createProduct, deleteProduct, updateProduct };