const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Définissez le répertoire de destination pour les fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Générez un nom de fichier unique en ajoutant un timestamp au nom d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Créez l'instance multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
