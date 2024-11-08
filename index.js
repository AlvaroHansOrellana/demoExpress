const express = require('express') // Importa la libreria  (paquete)
const app = express() // Inicializar el servidor con express, variable app representa el servidor
const port = 3000 // Puerto a usar

// importar middlewares

const manage404 = require("./middlewares/manage404");
const checkApiKey = require("./middlewares/auth_api_key");
const morgan = require("./middlewares/morgan");

app.use(morgan(':method :url :status :param[id] - :response-time ms :body')); // script que activa morgan y su respuestas por terminal
app.use(express.json());   // ! AL INICIO DE LA HOJA, configuracion de express para que pueda recibir JSON
app.use(express.static('public'))

//Motor de plantillas  PUG
app.set('view engine', 'pug');
app.set('views','./views');

// Rutas
const booksRoutes = require("./routes/books.routes")    
const productsRoutes = require("./routes/products_old.routes")
const entriesRoutes = require("./routes/entries.routes")    

//WEB RUTAS
const productsWebRoutes = require("./routes/products.web.routes")


app.get('/', function (req, res) {
    res.send('Hello World, Welcome to BackEnd') 
});

//! check api key ejemplo, concatenar 
app.get("/perros/:name?", checkApiKey, function (req, res) {
    res.send("Respuesta x")
});

app.get('/books', function (req, res) {
    res.send('Hello World')
});



// Rutas
//API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);


// ! PARA PUG AQUI ABAJO!

//http://localhost:3000/first_template
app.get('/first_template', function(req, res){
    res.render('first_view');
 });

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
       name: "TutorialsPoint", 
       url:"http://www.tutorialspoint.com"
    });
 });

app.use('./products2', productsWebRoutes);


  // ! Para ruta no existente ...
app.use("*", manage404); // Usar este cuando haya un middleware activado

// app.use("*", (req, res) => {
//     res.status(404).send("Ruta no encontrada");  ESTE CUANDO NO HAY MIDDLEWARE
// });



// !     Para "llamar" al puerto, siempre necesario
app.listen(port, () => {
    console.log(`Example app listenig on http://localhost:${port}`)
});