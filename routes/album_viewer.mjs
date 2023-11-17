// routes/album_viewer.mjs
import express from 'express';
import { readAlbumContents } from '../middleware/albums.mjs';

const albumRouter = express.Router();

albumRouter.get('/:album', (req, res, next) => {
    const { album } = req.params;
    if (album === 'favicon.ico') {
        return next();
    }
    readAlbumContents(album, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        } else {
            res.render('gallery.ejs', { album: album, images: files });
        }
    });
});

albumRouter.get('/:album/:image', (req, res, next) => {
    const { album, image } = req.params;
    if (album === 'favicon.ico' || image === 'favicon.ico') {
        return next();
    }
    res.render('viewer.ejs', { album: album, image: image });
});

export default albumRouter;