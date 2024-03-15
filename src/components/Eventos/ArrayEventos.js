const presidentesYInflacion = [
    { presidente: "Juan Domingo Perón", inicio: 1946, fin: 1955, inflacion: "50%" }, // Primer y segundo mandato
    { presidente: "Juan Domingo Perón", inicio: 1973, fin: 1974, inflacion: "20%" }, // Tercer mandato
    { presidente: "Isabel Perón", inicio: 1974, fin: 1976, inflacion: "100%" }, // Inflación estimada, asumió después de Juan Domingo Perón
    { presidente: "Raúl Alfonsín", inicio: 1983, fin: 1989, inflacion: "300%" },
    { presidente: "Carlos Menem", inicio: 1989, fin: 1999, inflacion: "2000%" },
    { presidente: "Néstor Kirchner", inicio: 2003, fin: 2007, inflacion: "80%" },
    { presidente: "Cristina Fernández de Kirchner", inicio: 2007, fin: 2015, inflacion: "300%" },
    { presidente: "Mauricio Macri", inicio: 2015, fin: 2019, inflacion: "200%" },
    { presidente: "Alberto Fernández", inicio: 2019, fin: 2023, inflacion: "250%" },
    // { presidente: "Javier Milei", inicio: 2023, fin: 2027, inflacion: "4%" },
  ];
  
  // Convertir el arreglo de objetos en un string JSON
  const jsonString = JSON.stringify(presidentesYInflacion);
  
  console.log(jsonString);
  