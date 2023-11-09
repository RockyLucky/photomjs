import { createReadStream } from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from 'mutter';

const pipelineAsync = promisify(pipeline);

export default async function uploadFiles(req, res, next) {
  try {
    const files = req.files;
    if (!files || Object.keys(files).length === 0) {
      throw new BadRequestError('No files were uploaded.');
    }

    const fileUploadPromises = Object.values(files).map(async (file) => {
      const filename = uuidv4() + '-' + file.name;
      const readStream = createReadStream(file.path);
      const writeStream = createWriteStream(`./uploads/${filename}`);
      await pipelineAsync(readStream, writeStream);
      return filename;
    });

    const uploadedFiles = await Promise.all(fileUploadPromises);

    res.locals.uploadedFiles = uploadedFiles;
    next();
  } catch (err) {
    next(err);
  }
}
