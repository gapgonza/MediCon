// models/profesional.js
module.exports = (sequelize, DataTypes) => {
    const Profesional = sequelize.define('Profesional', {
        usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        especialidad_id: {
            type: DataTypes.INTEGER,
        },
        estado_id: {
            type: DataTypes.INTEGER,
        },
        sucursal_id: {
            type: DataTypes.INTEGER,
        },
        matricula: DataTypes.STRING
    }, {
        tableName: 'profesionales',
        timestamps: false,
    });

    // Asociaciones
    Profesional.associate = (models) => {
        Profesional.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        Profesional.belongsTo(models.Especialidad, { foreignKey: 'especialidad_id' });
        Profesional.belongsTo(models.Estado, { foreignKey: 'estado_id' });
        Profesional.belongsTo(models.Sucursal, { foreignKey: 'sucursal_id' });
    };

    return Profesional;
};

