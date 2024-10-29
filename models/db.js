const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize
const sequelize = new Sequelize('agendamedica', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
});

module.exports = sequelize;
