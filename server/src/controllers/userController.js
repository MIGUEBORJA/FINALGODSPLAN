import db from "../db.js";

const obtenerDatosProtegidos = (req, res) => {
    const usuarioAutenticado = req.user;
    res.json({ Status: "Success", name: usuarioAutenticado });
};

const getUsers = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const sql = "DELETE FROM users WHERE id_User = ?";

        db.query(sql, [userId], (err, data) => {
            if (err) {
                console.error('Error al eliminar el Usuario: ', err);
                res.status(500).json({error: 'Error en el servidor al eliminar el Usuario'}); 
            } else {
                res.status(200).json({ message: 'Usuario eliminado exitosamente'});
            }
        })
    } catch (error) {
        console.error('Error al eliminar el usuario', error); 
        res.status(500).json({error: 'Error en el servidor al eliminar el usuario (catch)'}); 
    }
}

const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email, contact, role } = req.body;
  
      const sql = "UPDATE users SET `username` = ?, `email` = ?, `contact` = ?, `role` = ? WHERE id_User = ?";
      const values = [username, email, contact, role, userId];
  
      db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Error al actualizar el usuario: ', err);
          res.status(500).json({ error: 'Error en el servidor al actualizar el usuario' });
        } else {
          res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        }
      });
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      res.status(500).json({ error: 'Error en el servidor al actualizar el usuario (catch)' });
    }
  };

export { obtenerDatosProtegidos, getUsers, deleteUser, updateUser };