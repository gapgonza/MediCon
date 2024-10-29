// models/agenda.js
module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define('Agenda', {
      agenda_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: DataTypes.INTEGER,
      especialidad_id: DataTypes.INTEGER,
      sucursal_id: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      hora_inicio: DataTypes.TIME,
      hora_fin: DataTypes.TIME,
      estado_id: DataTypes.INTEGER,
      max_sobreturnos: DataTypes.INTEGER
    }, {
      tableName: 'agenda',
      timestamps: false,
    });

    // Definir asociaciones
    Agenda.associate = (models) => {
      Agenda.belongsTo(models.Usuario, {
          foreignKey: 'usuario_id',
          as: 'Usuario' 
      });
      Agenda.belongsTo(models.Especialidad, {
          foreignKey: 'especialidad_id',
          as: 'Especialidad' 
      });
      Agenda.belongsTo(models.Sucursal, {
          foreignKey: 'sucursal_id',
          as: 'Sucursal' 
      });
    };  
  
    return Agenda;
  };
  


// const db = require('./db'); // Conexión a la base de datos

// const Agenda = {
//   // Obtener todas las agendas
//   getAll: function (callback) {
//     const query = `SELECT agenda.*, usuario.nombre AS profesional, especialidad.nombre AS especialidad, sucursal.nombre AS sucursal
//                    FROM agenda
//                    INNER JOIN usuario ON agenda.usuario_id = usuario.usuario_id
//                    INNER JOIN especialidad ON agenda.especialidad_id = especialidad.especialidad_id
//                    INNER JOIN sucursal ON agenda.sucursal_id = sucursal.sucursal_id`;
//     db.query(query, callback);
//   },

//   // Obtener agenda por ID
//   getById: function (id, callback) {
//     const query = `SELECT * FROM agenda WHERE agenda_id = ?`;
//     db.query(query, [id], callback);
//   }
// };

// module.exports = Agenda;