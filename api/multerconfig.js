const multer = require('multer');

// Définissez le répertoire de destination pour les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Répertoire de destination
  },
  filename: function (req, file, cb) {
    // Générez un nom de fichier unique en concaténant la date actuelle avec le nom d'origine du fichier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Créez l'instance multer avec la configuration de stockage
const upload = multer({ storage: storage });

module.exports = upload;
