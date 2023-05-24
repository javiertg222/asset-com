const fs = require("fs");
const db = require("../../database");
/**
 * Función para eliminar
 * @param {*} id 
 * @param {*} sql 
 */

const deleteUploads = (id, sql) => {
  db.get(sql, id, (err, row) => {

    if(row.image){
    const arr = row.image.split("/");
    const image = arr[arr.length - 1];
    fs.readdir("src/uploads", (err, files) => {
      if (err) {
        console.error(err);
        throw Error(err);
      }
      files.map((file) => {
        if (file === image) {
          fs.unlink(`src/uploads/${image}`, function (err) {
            if (err) throw err;
            console.info("Image deleted!");
          });
        }
      });
    });

   
  }
  });

};
module.exports = { deleteUploads };
