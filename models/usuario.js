// models/usuario.js
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        usuario_id: {
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
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        contraseña: DataTypes.STRING,
        contacto: DataTypes.STRING,
        direccion: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
    }, {
        tableName: 'usuario',
        timestamps: false,
    });

    // Asociaciones
    Usuario.associate = (models) => {
        Usuario.hasMany(models.Profesional, { foreignKey: 'usuario_id' });
        Usuario.hasMany(models.Agenda, { foreignKey: 'usuario_id', as: 'Agendas' }); 
    };

    return Usuario;
};


