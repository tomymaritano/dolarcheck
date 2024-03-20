// src/newsApiService.js

export const obtenerNoticias = async () => {

  const API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=ar&apiKey=ee447406883f43408ee0995583835851`;

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
