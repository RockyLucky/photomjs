import multer from "multer";
import express from "express";

var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var multerSigleUpload = multer({ storage: multerStorage });

const uploadRouter = () => {
    const router = express.Router();
    // Route to display the file upload form
    router.get('/', (req, res) => {
      res.render('upload'); // Assuming you have an EJS view named 'upload'
    });

    // Route to handle the file upload
    router.post('/', multerSigleUpload.single('file'), (req, res) => {
      // Access the uploaded file through req.file
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      // You can do further processing with the uploaded file here

      res.send('File uploaded successfully.');
    });
    return router;
};

export default uploadRouter;