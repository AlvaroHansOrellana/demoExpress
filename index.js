const express = require('express') // Importa la libreria  (paquete)
const app = express() // Inicializar el servidor con express, variable app representa el servidor
const port = 3000 // Puerto a usar

app.use(express.json());   // ! AL INICIO DE LA HOJA, CONFIGURACION DE EXPRESS PARA QUE PUEDA RECIBIR OBJETOS JSON

// Rutas
const booksRoutes = require("./routes/books.routes")
const productsRoutes = require("./routes/products.routes")
const entriesRoutes = require("./routes/entries.routes")

// ! app.listen(port, () => { });     APP LISTEN ---->      SIEMPRE ABAJO        <----------

app.get('/', function (req, res) {
    res.send('Hello World, Welcome to BackEnd') 
});

app.get('/books', function (req, res) {
    res.send('Hello World')
});



// Rutas
//API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

  // ! Para ruta no existente ...
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

// !                    ----> HERE<------
app.listen(port, () => {
    console.log(`Example app listenig on http://localhost:${port}`)
});