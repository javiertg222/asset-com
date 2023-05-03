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

    fs.unlink(`server/uploads/${arr[arr.length - 1]}`, function (err) {
      if (err) throw err;
      console.info("Image deleted!");
    });
  }
  });

};
module.exports = { deleteUploads };
