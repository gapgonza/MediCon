// controllers/pacienteController.js
const db = require('../models'); 
const { Paciente, ObraSocial } = db;

// Manejar errores
const handleError = (res, error, message) => {
    console.error(message, error);
    res.status(500).send(message);
};

const validateFields = (fields) => {
    for (const field of fields) {
        if (!field.value) {
            return field.name;
        }
    }
    return null;
};

// Obtener pacientes
const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.render('gestionarPacientes', {
            title: 'Gestionar Pacientes',
            pacientes
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener pacientes');
    }
};

// Cargar datos para nuevo paciente
const cargarNuevoPaciente = async (req, res) => {
    try {
        const obrasSociales = await ObraSocial.findAll();
        res.render('nuevoPaciente', {
            title: 'Agregar Nuevo Paciente',
            obrasSociales
        });
    } catch (error) {
        handleError(res, error, 'Error al cargar las obras sociales');
    }
};

// Procesar nuevo paciente
const procesarNuevoPaciente = async (req, res) => {
    const { nombre, apellido, dni, obra_social_id, contacto, direccion, fecha_nacimiento, email } = req.body;

    const missingField = validateFields([
        { name: 'nombre', value: nombre },
        { name: 'apellido', value: apellido },
        { name: 'dni', value: dni },
        { name: 'obra_social_id', value: obra_social_id },
        { name: 'contacto', value: contacto },
        { name: 'direccion', value: direccion },
        { name: 'fecha_nacimiento', value: fecha_nacimiento },
        { name: 'email', value: email }
    ]);

    if (missingField) {
        return res.status(400).send(`El campo ${missingField} es obligatorio.`);
    }

    try {
        await Paciente.create(req.body);
        res.redirect('/admin/pacientes');
    } catch (error) {
        handleError(res, error, 'Error al agregar paciente');
    }
};

// Eliminar un paciente
const eliminarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.destroy({ where: { paciente_id: id } });
        res.redirect('/admin/pacientes');
    } catch (error) {
        handleError(res, error, 'Error al eliminar paciente');
    }
};

// Editar un paciente
const editarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id);
        const obrasSociales = await ObraSocial.findAll();

        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }

        res.render('editarPaciente', {
            title: 'Editar Paciente',
            paciente,
            obrasSociales
        });
    } catch (error) {
        handleError(res, error, 'Error al cargar paciente');
    }
};

// Procesar edición de un paciente
const procesarEdicionPaciente = async (req, res) => {
    const { id } = req.params;
    const { obra_social_id, contacto, direccion, email } = req.body;

    const missingField = validateFields([
        { name: 'obra_social_id', value: obra_social_id },
        { name: 'contacto', value: contacto },
        { name: 'direccion', value: direccion },
        { name: 'email', value: email }
    ]);

    if (missingField) {
        return res.status(400).send(`El campo ${missingField} es obligatorio.`);
    }

    try {
        await Paciente.update(req.body, { where: { paciente_id: id } });
        res.redirect('/admin/pacientes');
    } catch (error) {
        handleError(res, error, 'Error al editar paciente');
    }
};

// Exportar funciones
module.exports = {
    obtenerPacientes,
    cargarNuevoPaciente,
    procesarNuevoPaciente,
    eliminarPaciente,
    editarPaciente,
    procesarEdicionPaciente
};
