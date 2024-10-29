// models/obraSocial.js
module.exports = (sequelize, DataTypes) => {
    const ObraSocial = sequelize.define('ObraSocial', {
        obra_social_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
    }, {
        tableName: 'obra_social',
        timestamps: false,
    });

    ObraSocial.associate = (models) => {
        ObraSocial.hasMany(models.Paciente, {
            foreignKey: 'obra_social_id',
            as: 'pacientes'
        });
    };

    return ObraSocial;
};

// module.exports = (sequelize, DataTypes) => {
//     const ObraSocial = sequelize.define('ObraSocial', {
//         obra_social_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombre: DataTypes.STRING,
//         descripcion: DataTypes.STRING,
//     }, {
//         tableName: 'obra_social',
//         timestamps: false,
//     });

//     ObraSocial.associate = (models) => {
//         ObraSocial.hasMany(models.Paciente, {
//             foreignKey: 'obra_social_id',
//             as: 'pacientes'
//         });
//     };

//     return ObraSocial;
// };
