const express = require('express') // Importa la libreria  (paquete)
const app = express() // Inicializar el servidor con express, variable app representa el servidor
const port = 3000 // Puerto a usar

app.use(express.json());   // ! AL INICIO DE LA HOJA, CONFIGURACION DE EXPRESS PARA QUE PUEDA RECIBIR OBJETOS JSON


// ! app.listen(port, () => { });     APP LISTEN ---->      SIEMPRE ABAJO        <----------

app.get('/', function (req, res) {
    res.send('Hello World, Welcome to BackEnd')
});

app.get('/films', function (req, res) {  // el '/films' son las rutas
    res.send('Hello World')
});

app.get('/books', function (req, res) {
    res.send('Hello World')
})

// ?GET http://localhost:3000/perros/ ejemplo
// ! GET http://localhost:3000/perros/toby
// GET http://localhost:3000/perros/pelitos
app.get('/perros/:name?', (req, res) => {  // ? indica que es opcional
    const name = req.params.name; //leer el parametro name
    // Habria que sustituir las siguientes linas (22-35) por una llamada a mi BBDD SQL
    const perros = [
        { name: "mordisquitos", age: 2 },
        { name: "toby", age: 3 },
        { name: "peluson", age: 5 },
        { name: "bob", age: 3 },
      ];
    if (name) {
    const perro = perros.find((perro) => perro.name === name);

    perro? // perro encontrado???
    res.status(200).json(perro) // si lo encuentra devuelve el perro
    : res.status(404).json({message:"perro no encontrado" + name}); // si no, objeto con un arrat vacio
    // res.send("Aqui va tu perro:"+name);
    }
    else {
        res.status(200).json(perros);
    }
});


//!Para activar en terminal (en este caso) node index.js
//!Para cerrar el enrutamiento Ctrl + C

//? http POST
app.post('/books', (req, res) => {
    console.log(req.body);
    if (req.body.title && req.body.author) {
        // logica para guardar libro en la BBDD
        // ...
        // .....
        res.status(201).json({
            success: true,
            title: req.body.title,
            id: Math.floor(Math.random() * (10000 - 1) + 1),
            data: req.body,
        })
    } else {
        res.status(400).send('Peticion incorrecta')
    }
});

//HTTP PUT http://localhost:3000/books
app.put("/books", (req, res) => {
    console.log(req.body); // por body se recibe el libro a editar
    if (req.body.title && req.body.author) {
      // Lógica para editar el libro en la BBDD
      // UPDATE books SET title = req.body.title, author = req.body.author WHERE id = req.body.id
      //..
  
      let book = {
        "title": "Don Quijote de la Mancha 2. El regreso!",
        "author":"Miguel de Cervantes",
        "pages": 2000,
        "year":1550,
        "description": "en un lugar de la mancha..."
      }
  
      let newBook = {...book, ...req.body}; // Actualizar el libro con los nuevos datos
  
      res.status(200).json({
        success: true,
        action:"update",
        title: req.body.title,
        id: Math.floor(Math.random() * (10000 - 1) + 1),
        data: newBook,
      });
    } else {
      res.status(400).send("Petición incorrecta");
    }
  });

//? http DELETE
app.delete('/books', (req, res) => {
    res.send('Libro eliminado')
})

//HTTP DELETE http://localhost:3000/books?title=Hamlet&author=Shakespeare --> Borrar un libro
//HTTP DELETE http://localhost:3000/books --> Borrar todos los libros
app.delete("/books", (req, res) => {
    console.log(req.query);
    res.send(`Libro borrado: ${req.query.title} - ${req.query.author}`);
  });

  // ! Para ruta no existente ...
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

// !                    ----> HERE<------
app.listen(port, () => {
    console.log(`Example app listenig on http://localhost:${port}`)
});