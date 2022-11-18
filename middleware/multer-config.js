const multer = require("multer"); //appel de multer
const MIME_TYPES = { //different tpye d'image
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
const maxSize = 1 * 1024 * 1024; // poids de l'image max poster par l'utilisateur 1MB

const storage = multer.diskStorage({ //storage des images en local
  destination: (req, file, callback) => {
    callback(null, "images");   //dans le dossier images
  },
  filename: (req, file, callback) => { //changement du nom du fichier pour eviter les erreurs
    const name = file.originalname.split(" ").join("_"); //remplace les espaces par des _
    const extension = MIME_TYPES[file.mimetype]; //recuperer le type d'image
    callback(null, name + Date.now() + "." + extension); //nom de l'image + date + type image
  },
});

module.exports = multer({ //export de multer
  storage: storage,      
  limits: { fileSize: maxSize }, //poids max des images
}).single("image"); //indique images seules uniquement
