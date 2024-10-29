// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../models/db'); 


const Agenda = require('./agenda')(sequelize, Sequelize.DataTypes); 
const Paciente = require('./paciente')(sequelize, Sequelize.DataTypes);
const Profesional = require('./profesional')(sequelize, Sequelize.DataTypes);
const ObraSocial = require('./obraSocial')(sequelize, Sequelize.DataTypes);
const Especialidad = require('./especialidad')(sequelize, Sequelize.DataTypes);
const Sucursal = require('./sucursal')(sequelize, Sequelize.DataTypes);
const Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
const Estado = require('./estado')(sequelize, Sequelize.DataTypes);
const Turno = require('./turno')(sequelize, Sequelize.DataTypes);

const db = {
    Agenda,
    Paciente,
    Profesional,
    ObraSocial,
    Especialidad,
    Sucursal,
    Usuario,
    Estado,
    Turno,
    sequelize,
    Sequelize
};

// Asociaciones
Usuario.associate(db);
Profesional.associate(db);
Paciente.associate(db);
ObraSocial.associate(db);
Agenda.associate(db);
Especialidad.associate(db);
Sucursal.associate(db);
Turno.associate && Turno.associate(db);

module.exports = db;
