// models/estado.js
module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        estado_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
    }, {
        tableName: 'estado',
        timestamps: false,
    });

    return Estado;
};
