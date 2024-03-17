// src/newsApiService.js

export const obtenerNoticias = async (keyword = "Argentina") => {
  const API_KEY = "ee447406883f43408ee0995583835851"; // Usar variable de entorno en producción
  const API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=ar&category=general&apiKey=${API_KEY}`;

  try {
    const respuesta = await fetch(API_ENDPOINT);
    if (!respuesta.ok) {
      throw new Error(`No se pudo obtener las noticias: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    return datos.articles;
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    throw error;
  }
};
