/**
 * Función para extraer los datos de la configuración
 * @param {*} url 
 * @param {*} setConfig 
 */
const getConfiguration = async (url, setConfig)=>{
    await fetch(url)
        .then((res) => res.json())
        .then((data) => setConfig(data))
        .catch((error) => console.log(error));
  }

  export { getConfiguration };