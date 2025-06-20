const apiKey = "b25348efdbae14477146e173eed37603";

// Función para obtener el clima de una ciudad
async function obtenerClima(ciudad) {
  if (!ciudad) {
    throw new Error("Por favor ingresa una ciudad.");
  }

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
  
  if (!res.ok) {
    throw new Error("Ciudad no encontrada");
  }

  const datos = await res.json();
  
  return {
    nombre: datos.name,
    pais: datos.sys.country,
    temperatura: datos.main.temp,
    descripcion: datos.weather[0].description,
    velocidadViento: datos.wind.speed
  };
}

// Función para mostrar el resultado en el DOM
async function mostrarResultado(ciudadParam = null) {
  const ciudad = ciudadParam || document.getElementById("city").value;
  const resultado = document.getElementById("result");

  if (!ciudad) {
    resultado.innerHTML = "<p>Por favor ingresa una ciudad.</p>";
    return;
  }

  resultado.innerHTML = "<p>Cargando...</p>";

  try {
    const datosClima = await obtenerClima(ciudad);
    
    const contenidoHTML = `
      <h2>${datosClima.nombre}, ${datosClima.pais}</h2>
      <p>🌡️ Temperatura: ${datosClima.temperatura} °C</p>
      <p>☁️ Estado: ${datosClima.descripcion}</p>
      <p>💨 Viento: ${datosClima.velocidadViento} m/s</p>
    `;
    resultado.innerHTML = contenidoHTML;

  } catch (error) {
    resultado.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

async function obtenerClimaPorCoordenadas(lat, lon) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`);
    
    if (!res.ok) {
      throw new Error("No se pudo obtener el clima desde coordenadas");
    }
  
    const datos = await res.json();
  
    return {
      nombre: datos.name,
      pais: datos.sys.country,
      temperatura: datos.main.temp,
      descripcion: datos.weather[0].description,
      velocidadViento: datos.wind.speed
    };
}


function obtenerUbicacionUsuario() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada"));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          () => reject(new Error("No se pudo obtener tu ubicación"))
        );
      }
    });
  }

  async function buscarClimaAutomaticamente() {
    const resultado = document.getElementById("result");
    resultado.innerHTML = "<p>Detectando ubicación...</p>";
  
    try {
      const coords = await obtenerUbicacionUsuario();
      const datosClima = await obtenerClimaPorCoordenadas(coords.lat, coords.lon);
  
      const contenidoHTML = `
        <h2>${datosClima.nombre}, ${datosClima.pais} (Detectado automáticamente)</h2>
        <p>🌡️ Temperatura: ${datosClima.temperatura} °C</p>
        <p>☁️ Estado: ${datosClima.descripcion}</p>
        <p>💨 Viento: ${datosClima.velocidadViento} m/s</p>
      `;
      resultado.innerHTML = contenidoHTML;
  
    } catch (error) {
      resultado.innerHTML = `<p>Error al obtener clima automático: ${error.message}</p>`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    buscarClimaAutomaticamente();
  });