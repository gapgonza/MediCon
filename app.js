const express = require('express');
const session = require('express-session');
const sequelize = require('./models/db'); 
const bodyParser = require('body-parser');
const path = require('path'); 
const routes = require('./routes/administradorRutas');

// Inicializar la aplicación
const app = express();
const port = 3000; 

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 

// Middleware para archivos estáticos desde la carpeta css
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'no_me_quemeee',
    resave: false,
    saveUninitialized: true
}));

// Rutas
app.use('/', routes); 

// Conexión a la base de datos y sincronización
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
        return sequelize.sync(); 
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });
