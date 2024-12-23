const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;

// Configuración
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware para agregar un título genérico
app.use((req, res, next) => {
  res.locals.title = "Planifica Tu Ocio"; // Título genérico
  next(); // Continuar con la siguiente función
});

// Simulación de base de datos de usuarios
const users = [
  { dni: "12345678A", clave: "1234567" },
  { dni: "87654321B", clave: "securepass" },
  { dni: "11223344C", clave: "mypassword" },
];

const events = [
  { 
    id: 1, 
    name: "Festival Indie", 
    description: "Un vibrante festival de música indie.", 
    location: "Barcelona", 
    seats: 150, 
    categories: [
      { type: "General", availableSeats: 70, precio: 15 },
      { type: "VIP", availableSeats: 50, precio: 25 },
      { type: "Zona Lounge", availableSeats: 30, precio: 40 }
    ]
  },
  { 
    id: 2, 
    name: "Musical Broadway", 
    description: "Un espectáculo lleno de magia y talento.", 
    location: "Sevilla", 
    seats: 200, 
    categories: [
      { type: "Balcones", availableSeats: 80, precio: 18 },
      { type: "VIP", availableSeats: 70, precio: 35 },
      { type: "Orquesta", availableSeats: 50, precio: 50 }
    ]
  },
  { 
    id: 3, 
    name: "Concierto de Jazz", 
    description: "Una noche para disfrutar del mejor jazz en vivo.", 
    location: "Granada", 
    seats: 120, 
    categories: [
      { type: "Pista", availableSeats: 60, precio: 20 },
      { type: "VIP", availableSeats: 40, precio: 30 },
      { type: "Galería", availableSeats: 20, precio: 25 }
    ]
  },
  { 
    id: 4, 
    name: "Teatro Moderno", 
    description: "Una obra emocionante sobre temas contemporáneos.", 
    location: "Bilbao", 
    seats: 180, 
    categories: [
      { type: "General", availableSeats: 100, precio: 10 },
      { type: "Platea", availableSeats: 50, precio: 20 },
      { type: "VIP", availableSeats: 30, precio: 30 }
    ]
  },
  { 
    id: 5, 
    name: "Fiesta de Electrónica", 
    description: "Un evento con los mejores DJs internacionales.", 
    location: "Ibiza", 
    seats: 250, 
    categories: [
      { type: "General", availableSeats: 150, precio: 20 },
      { type: "Zona VIP", availableSeats: 60, precio: 40 },
      { type: "Mesa Privada", availableSeats: 40, precio: 80 }
    ]
  },
  { 
    id: 6, 
    name: "Maratón de Cine", 
    description: "Disfruta de clásicos del cine toda la noche.", 
    location: "Valencia", 
    seats: 90, 
    categories: [
      { type: "General", availableSeats: 50, precio: 8 },
      { type: "VIP", availableSeats: 25, precio: 15 },
      { type: "Butaca Premium", availableSeats: 15, precio: 20 }
    ]
  },
  { 
    id: 7, 
    name: "Charla Motivacional", 
    description: "Inspiración y estrategias para alcanzar el éxito.", 
    location: "Málaga", 
    seats: 100, 
    categories: [
      { type: "General", availableSeats: 60, precio: 10 },
      { type: "VIP", availableSeats: 30, precio: 20 },
      { type: "Front Row", availableSeats: 10, precio: 35 }
    ]
  },
  { 
    id: 8, 
    name: "Concierto Sinfónico", 
    description: "Una velada mágica con una gran orquesta sinfónica.", 
    location: "Zaragoza", 
    seats: 150, 
    categories: [
      { type: "General", availableSeats: 90, precio: 25 },
      { type: "VIP", availableSeats: 40, precio: 50 },
      { type: "Galería", availableSeats: 20, precio: 35 }
    ]
  },
  { 
    id: 9, 
    name: "Exposición de Arte Digital", 
    description: "Una muestra impresionante de obras digitales interactivas.", 
    location: "Madrid", 
    seats: 200, 
    categories: [
      { type: "General", availableSeats: 100, precio: 12 },
      { type: "Acceso Premium", availableSeats: 70, precio: 20 },
      { type: "Visita Guiada", availableSeats: 30, precio: 30 }
    ]
  },
];



let selectedSeats = [];

// Redirige al login al iniciar
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Página de inicio de sesión
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verificar si los campos están vacíos
  if (!username || !password) {
    return res.redirect("/login?error=Error%20Rellene%20todos%20los%20campos");
  }

  // Buscar el usuario en el array
  const user = users.find(u => u.dni === username);

  if (user) {
    if (user.clave === password) {
      // Si el DNI y clave son correctos, redirige al menú principal
      res.redirect("/menu");
    } else {
      // Si la clave es incorrecta
      res.redirect("/login?error=Error%20DNI%20y/o%20clave%20incorrectos");
    }
  } else {
    // Si el usuario no existe
    res.redirect("/login?error=Error%20DNI%20y/o%20clave%20incorrectos");
  }
});



// Página de registro
app.get("/register", (req, res) => {
  res.render("register");
});

// Maneja el registro
app.post("/register", (req, res) => {
  const { name, username, password } = req.body;

  // Verificar si los campos están vacíos
  if (!name || !username || !password) {
    return res.redirect("/register?error=Por%20favor%20rellene%20todos%20los%20campos");
  }

  // Verificar si el usuario ya existe
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.redirect("/register?error=Usuario%20ya%20existe");
  }

  // Agregar nuevo usuario a la base de datos simulada
  users.push({ name, username, password });

  // Redirigir al menú principal después de registrarse
  res.redirect("/menu");
});

// Página del menú principal
app.get("/menu", (req, res) => {
  res.render("menu", { events });
});

app.get('/logout', (req, res) => {
    res.redirect('/login'); // Redirige a la página de login
});

  // Ruta para mostrar el perfil
app.get('/perfil', (req, res) => {
// const currentUser = users[0]; // Suponiendo que el primer usuario es el actual
// res.render('perfil', { user: currentUser }); // Pasa los datos del usuario a la vista
});
  
  // Ruta para procesar el formulario de actualización del perfil
app.post('/perfil', (req, res) => {
    const { name, email, password } = req.body;
    // Actualiza los datos del usuario en el array `users`
    users[0] = { name, username: users[0].username, password }; // Actualiza solo el nombre y la contraseña
    res.redirect('/perfil'); // Redirige al perfil después de la actualización
});

app.get("/evento/:id", (req, res) => {
    const eventId = req.params.id;
    const event = events.find(e => e.id == eventId);
  
    if (!event) {
      return res.status(404).send("Evento no encontrado");
    }
  
    res.render("evento", { event });
});

app.post("/reserva/:eventId", (req, res) => {
const eventId = req.params.eventId;
const event = events.find(e => e.id == eventId);

if (!event) {
    return res.status(404).send("Evento no encontrado");
}

// Procesar la reserva
let totalPrice = 0;
for (let category of event.categories) {
    const quantity = parseInt(req.body[`category_${category.type}`]) || 0;
    if (quantity > 0) {
    if (quantity > category.availableSeats) {
        return res.status(400).send(`No hay suficientes asientos disponibles en la categoría ${category.type}`);
    }
    totalPrice += category.precio * quantity;
    category.availableSeats -= quantity; // Reducir los asientos disponibles
    }
}

// Agregar la reserva a la lista de reservas (en un sistema real, esta información se guardaría en una base de datos)
selectedSeats.push({ event: event.name, totalPrice, details: req.body });

res.render("menu", { events });
});
  

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
