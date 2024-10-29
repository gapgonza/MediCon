const usuario = require("./usuario");

// models/turno.js
// module.exports = (sequelize, DataTypes) => {
//     const Turno = sequelize.define('Turno', {
//         turno_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         agenda_id: DataTypes.INTEGER,
//         paciente_id: DataTypes.INTEGER,
//         fecha_reserva: DataTypes.DATE,
//         motivo_consulta: DataTypes.STRING,
//         estado_id: DataTypes.INTEGER,
//         usuario_id:{
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     }, {
//         tableName: 'turno',
//         timestamps: false,
//     });

//     Turno.associate = function(models) {
//         Turno.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
//         Turno.belongsTo(models.Profesional, { foreignKey: 'medico_id' });
//     };

//     return Turno;
// };


// models/turno.js
module.exports = (sequelize, DataTypes) => {
    const Turno = sequelize.define('Turno', {
        turno_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agenda_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha_reserva: { 
            type: DataTypes.DATE,
            allowNull: false,
        },
        motivo_consulta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hora_elegida:{
            type: DataTypes.TIME,
            allowNull: false,
        }
    }, {
        tableName: 'turno',
        timestamps: false,
    });

    Turno.associate = (models) => {
        Turno.belongsTo(models.Agenda, { foreignKey: 'agenda_id' });
        Turno.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
        Turno.belongsTo(models.Estado, { foreignKey: 'estado_id' });
        Turno.belongsTo(models.Profesional, { foreignKey: 'usuario_id' });
        Turno.belongsTo(models.Profesional, { foreignKey: 'usuario_id', as: 'medico' });

        Turno.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    };

    return Turno;
};
