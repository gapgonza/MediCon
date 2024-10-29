// models/especialidad.js
module.exports = (sequelize, DataTypes) => {
    const Especialidad = sequelize.define('Especialidad', {
        especialidad_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
    }, {
        tableName: 'especialidad',
        timestamps: false,
    });

    // Asociaciones
    Especialidad.associate = (models) => {
        Especialidad.hasMany(models.Agenda, { foreignKey: 'especialidad_id', as: 'Agendas' }); 
    };

    return Especialidad;
};
