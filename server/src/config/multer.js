import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('destination called');
        cb(null, join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        console.log('filename called'); 
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;