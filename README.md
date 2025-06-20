# 🌦️ App del Clima

Una aplicación web sencilla que permite consultar el clima actual de cualquier ciudad del mundo. Utiliza la API de OpenWeatherMap, muestra el clima automáticamente según la ubicación del usuario.

## 🚀 Características

- Búsqueda de clima por nombre de ciudad.
- Detección automática de ubicación usando la API de geolocalización.
- Interfaz sencilla con HTML, CSS y JavaScript moderno.
- Uso de **async/await** y Promesas para manejar asincronía.
- Almacenamiento del historial de ciudades consultadas.
- Diseño responsive y limpio.
- Manejo de errores (ciudad no encontrada, sin conexión, etc.).

---

## 🧰 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- OpenWeatherMap API
- API de Geolocalización del navegador

---

## 📦 Estructura del proyecto

App_Clima/
├── index.html # Página principal
├── styles.css # Estilos
├── script.js # Lógica JS (promesas, asincronía)
└── README.md # Este archivo


---

## 🔑 Configuración y uso

1. **Clona el repositorio** o descarga los archivos:

```bash
git clone https://github.com/tuusuario/App_Clima.git
```

2. **Obtén una API Key gratuita de OpenWeatherMap** y reemplázala en script.js:

```bash
const apiKey = "TU_API_KEY_AQUÍ";
```

3. **Abre index.html** en tu navegador.