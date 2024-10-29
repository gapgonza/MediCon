// models/paciente.js
module.exports = (sequelize, DataTypes) => {
    const Paciente = sequelize.define('Paciente', {
        paciente_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        dni: {
            type: DataTypes.STRING,
            unique: true,
        },
        obra_social_id: DataTypes.INTEGER,
        contacto: DataTypes.STRING,
        direccion: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        tableName: 'paciente',
        timestamps: false,
    });

    Paciente.associate = (models) => {
        Paciente.belongsTo(models.ObraSocial, {
            foreignKey: 'obra_social_id',
            as: 'obraSocial',
        });
    };

    return Paciente;
};


// module.exports = (sequelize, DataTypes) => {
//     const Paciente = sequelize.define('Paciente', {
//         paciente_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombre: DataTypes.STRING,
//         apellido: DataTypes.STRING,
//         dni: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         obra_social_id: DataTypes.INTEGER,
//         contacto: DataTypes.STRING,
//         direccion: DataTypes.STRING,
//         fecha_nacimiento: DataTypes.DATE,
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//     }, {
//         tableName: 'paciente',
//         timestamps: false,
//     });

//     Paciente.associate = (models) => {
//         Paciente.belongsTo(models.ObraSocial, {
//             foreignKey: 'obra_social_id',
//             as: 'obraSocial', 
//         });
//     };

//     return Paciente;
// };


// module.exports = (sequelize, DataTypes) => {
//     const Paciente = sequelize.define('Paciente', {
//         paciente_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombre: DataTypes.STRING,
//         apellido: DataTypes.STRING,
//         dni: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         obra_social_id: DataTypes.INTEGER,
//         contacto: DataTypes.STRING,
//         direccion: DataTypes.STRING,
//         fecha_nacimiento: DataTypes.DATE,
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//     }, {
//         tableName: 'paciente',
//         timestamps: false,
//     });

//     return Paciente;
// };
