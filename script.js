const apiKey = "b25348efdbae14477146e173eed37603";

document.getElementById("btn").addEventListener("click", async () => {
  const ciudad = document.getElementById("city").value;
  const resultado = document.getElementById("result");

  if (!ciudad) {
    resultado.innerHTML = "<p>Por favor ingresa una ciudad.</p>";
    return;
  }

  resultado.innerHTML = "<p>Cargando...</p>";

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
    
    if (!res.ok) throw new Error("Ciudad no encontrada");

    const datos = await res.json();

    resultado.innerHTML = `
      <h2>${datos.name}, ${datos.sys.country}</h2>
      <p>🌡️ Temperatura: ${datos.main.temp} °C</p>
      <p>☁️ Estado: ${datos.weather[0].description}</p>
      <p>💨 Viento: ${datos.wind.speed} m/s</p>
    `;

  } catch (error) {
    resultado.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});


