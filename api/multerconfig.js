require('dotenv').config();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const configureStorage = () => {
  const storage = new Storage({
    projectId: 'admin-d00ae',
    keyFilename: './admin-d00ae-firebase-adminsdk-u43ny-1dad6bfec2.json',
  });

  const bucket = storage.bucket('admin-d00ae.appspot.com'); 

  const uploadToFirebase = multer({
    storage: multer.memoryStorage(),
  }).single('image');

 const uploadMiddleware = (req, res, next) => {
  uploadToFirebase(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      return res.status(500).json({ error: err.message });
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      req.imageUrl = publicUrl; 
      next(); 
    });

    blobStream.end(file.buffer);
  });
};
  return uploadMiddleware;
};

module.exports = configureStorage;
