// routes/gallery.mjs
import express from 'express';
import { readAlbumContents } from '../middleware/albums.mjs';

const galleryRouter = express.Router();


galleryRouter.get('/:album', (req, res) => {
    const { album } = req.params;
    console.log(req.url, req.params, req.query, req.body)
    console.log(album);
    readAlbumContents(album, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        } else {
            res.render('gallery', { album: album, images: files });
        }
    });
});

export default galleryRouter;
