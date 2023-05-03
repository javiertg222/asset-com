//Middleware para subir archivos
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: function (req, file, cb) {
    //Formato del parámetro file
    // fieldname: 'image',
    // originalname: 'foto.jpg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg'

    cb(null, `${Date.now()}-${file.originalname}`);

  },
});
const upload = multer({ storage, limits: {fileSize: 2000000}}).single("image");

module.exports = { upload };
