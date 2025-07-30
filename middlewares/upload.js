const multer = require('multer'); 
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = "";

        console.log(req.path);

        if(req.path === "/products") {
            // Checkear si el directorio existe, si no, crearlo
            dir = "uploads/products";
        }
        else if(req.path === "/users") {
            dir = "uploads/users";
        }

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        console.log('filename', file);
        // Check if the file is an image
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }

        // Generate a unique filename using crypto
        const uniqueSuffix = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname);
        console.log('ext', ext);
        const filename = `${uniqueSuffix}${ext}`;

        cb(null, filename);
    }
});

const upload = multer({storage}).single("file");
// el nombre que definamos en single debe ser igual al del formulario

module.exports = upload;