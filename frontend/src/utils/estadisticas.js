/**
 * Método para obtener todos las estadisticas de la aplicación
 * @param {*} url 
 * @param {*} setEstadisticas
 */
const getEstadisticas = async (url, setEstadisticas)=>{
    await fetch(url)
        .then((res) => res.json())
        .then((data) => setEstadisticas(data))
        .catch((error) => console.log(error));
  }

  export default getEstadisticas;