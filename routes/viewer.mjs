// viewer.mjs
import express from 'express';
import fs from 'fs';

const viewerRouter = express.Router();

viewerRouter.get('/:album/:image', (req, res) => {
  const { album, image } = req.params;
  const imagePath = `./public/images/${album}/${image}`;
  const imageList = fs.readdirSync(`./public/images/${album}`);

  // Check if the image exists
  if (fs.existsSync(imagePath)) {
    const currentIndex = imageList.indexOf(image);
    const nextIndex = (currentIndex + 1) % imageList.length;
    const previousIndex = (currentIndex - 1 + imageList.length) % imageList.length;

    const nextImage = imageList[nextIndex];
    const previousImage = imageList[previousIndex];

    res.render('viewer', {
      title: 'Image Viewer',
      imageSrc: `/images/${album}/${image}`,
      nextImage: nextImage,
      previousImage: previousImage,
    });
  } else {
    res.status(404).send('Image not found');
  }
});

export default viewerRouter;
