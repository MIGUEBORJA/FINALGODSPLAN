import db from "../db.js";

const createCategories = (req, res) => {
    try {
        const sql = "INSERT INTO categories (`name`) VALUES (?)"; 

       const values = [
        req.body.name
        ];
        db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: 'Error en el servidor al crear el producto' });
        } 
        return res.json("la categoría ha sido creada"); 
    }); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
   
}

const deleteCategorie = async (req, res) => {
    try {
        const categorieId = req.params.id; 
        const sql = "DELETE FROM categories WHERE id_categories = ?"

        db.query(sql, [categorieId], (err, data) => {
            if (err) {
                console.error('Error al eliminar la categoría: ', err);
                res.status(500).json({error: 'Error en el servidor al eliminar la categoría'}); 
            } else {
                res.status(200).json({ message: 'Categoria eliminada exitosamente'});
            }
        })
    } catch (error) {
        console.error('Error al eliminar la categoría', error); 
        res.status(500).json({error: 'Error en el servidor al eliminar la categoría (catch)'}); 
    }
}

const updateCategorie = async (req, res) => {
    try {
        const categorieId = req.params.id; 
        const {name} = req.body; 
    
        const sql = "UPDATE categories SET `name` = ? WHERE id_categories = ?"; 
        const values = [name, categorieId];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error al editar la categoría:', err);
                res.status(500).json({ error: 'Error en el servidor al editar la categoría' });
            } else {
                res.status(200).json({ message: 'Categoría editada exitosamente' });
            }
        })
    } catch (error) {
        console.error('Error al eliminar la categoría', error); 
        res.status(500).json({error: 'Error en el servidor al editar la categoría (catch)'}); 
    }
   
}

const getCategories = (req, res) => {
    const q = "SELECT * FROM categories"
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

export { createCategories, deleteCategorie, updateCategorie, getCategories}; 