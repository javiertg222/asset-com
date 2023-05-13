/**
 * Método para obtener todos los activos de la aplicación
 * @param {*} url 
 * @param {*} setAssets
 */
const getAssets = (url, setAssets)=>{
    fetch(url)
        .then((res) => res.json())
        .then((data) => setAssets(data))
        .catch((error) => console.log(error));
  }
  /**
   * Método para borrar un activo
   * @param {id asset} id 
   */
  const deleteAsset = (id)=>{
    fetch(`http://localhost:3001/activo/${id}`, { method: "DELETE" })
        .then((res) => {
          console.log(res.json());
        })
        .catch((error) => console.log(error));
  }
  /**
   * Función para saber si está repetido el número de serie  de un activo
   * @param {*} serialnumber
   * @param {*} assets
   * @returns true o flase
   */

  function findAsset(serialnumber, assets) {
    const asset = assets.find((asset) => asset.n_serie === serialnumber);
    if (asset) {
      return true;
    }
  }
  
  export { findAsset, getAssets, deleteAsset };
  