// models/sucursal.js
module.exports = (sequelize, DataTypes) => {
    const Sucursal = sequelize.define('Sucursal', {
        sucursal_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
        direccion: DataTypes.STRING,
    }, {
        tableName: 'sucursal',
        timestamps: false,
    });

    // Asociaciones
    Sucursal.associate = (models) => {
        Sucursal.hasMany(models.Agenda, { foreignKey: 'sucursal_id', as: 'Agendas' });
    };

    return Sucursal;
};
