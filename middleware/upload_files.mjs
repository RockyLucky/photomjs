import multer from 'multer';

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Create multer upload middleware
const upload = multer({ storage }).array('images');

// Middleware function
const uploadFilesMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            // Handle error
            console.error(err);
            return res.status(500).json({ error: 'Failed to upload files' });
        }
        next(); // Call next to proceed to the next middleware
    });
};

export { uploadFilesMiddleware };
