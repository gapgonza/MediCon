// models/sobreturno.js
module.exports = (sequelize, DataTypes) => {
    const Sobreturno = sequelize.define('Sobreturno', {
        sobreturno_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agenda_id: DataTypes.INTEGER,
        fecha: DataTypes.DATE,
        hora_inicio: DataTypes.TIME,
        hora_fin: DataTypes.TIME,
    }, {
        tableName: 'sobreturno',
        timestamps: false,
    });

    return Sobreturno;
};
