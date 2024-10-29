const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize
const sequelize = new Sequelize('bmlvaummwdviifhwbgyw', 'uipshsw3btzo3lbt', 'vYYqjF8pUOhmWTBKlVtQ', {
    host: 'bmlvaummwdviifhwbgyw-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
