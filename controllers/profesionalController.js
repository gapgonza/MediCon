const db = require('../models');
const { Profesional, Usuario, Especialidad, Estado, Sucursal } = db;

const handleError = (res, error, message = 'Ocurrió un error') => {
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

// Obtener profesionales
const obtenerProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: [
                { model: Usuario, attributes: ['nombre', 'apellido', 'dni'] },
                { model: Especialidad, attributes: ['nombre'] },
                { model: Estado, attributes: ['nombre'] },
                { model: Sucursal, attributes: ['nombre'] }
            ]
        });

        res.render('gestionarProfesionales', {
            title: 'Gestionar Profesionales',
            profesionales
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener profesionales');
    }
};

// Cargar nuevo profesional
const cargarNuevoProfesional = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll();
        const sucursales = await Sucursal.findAll();

        res.render('nuevoProfesional', {
            title: 'Agregar Nuevo Profesional',
            especialidades,
            sucursales
        });
    } catch (error) {
        handleError(res, error, 'Error al cargar el formulario de nuevo profesional');
    }
};

// Procesar nuevo profesional
const procesarNuevoProfesional = async (req, res) => {
    const { nombre, apellido, dni, contacto, email, matricula, especialidad_id, estado_id, sucursal_id } = req.body;

    if (!nombre || !apellido || !dni || !contacto || !email || !matricula || !especialidad_id || !estado_id || !sucursal_id) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const usuario = await Usuario.create({ nombre, apellido, dni, contacto, email });
        await Profesional.create({ usuario_id: usuario.usuario_id, especialidad_id, estado_id, sucursal_id, matricula });
        res.redirect('/admin/profesionales');
    } catch (error) {
        handleError(res, error, 'Error al agregar profesional');
    }
};

// Eliminar un profesional
const eliminarProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        await Profesional.destroy({ where: { usuario_id: id } });
        res.redirect('/admin/profesionales');
    } catch (error) {
        handleError(res, error, 'Error al eliminar profesional');
    }
};


// Editar un profesional
const editarProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const profesional = await Profesional.findByPk(id, {
            include: [
                { model: Usuario },
                { model: Especialidad },
                { model: Estado },
                { model: Sucursal }
            ]
        });
        const especialidades = await Especialidad.findAll();
        const sucursales = await Sucursal.findAll();

        if (!profesional) {
            return res.status(404).send('Profesional no encontrado');
        }

        res.render('editarProfesional', {
            title: 'Editar Profesional',
            profesional,
            especialidades,
            sucursales
        });
    } catch (error) {
        handleError(res, error, 'Error al cargar profesional');
    }
};

// Procesar edición de un profesional
const procesarEdicionProfesional = async (req, res) => {
    const { id } = req.params;
    const { especialidad_id, estado_id, sucursal_id, email } = req.body;

    const missingField = validateFields([
        { name: 'especialidad_id', value: especialidad_id },
        { name: 'estado_id', value: estado_id },
        { name: 'sucursal_id', value: sucursal_id },
        { name: 'email', value: email }
    ]);

    if (missingField) {
        return res.status(400).send(`El campo ${missingField} es obligatorio.`);
    }

    try {
        await Profesional.update(
            { especialidad_id, estado_id, sucursal_id },
            { where: { usuario_id: id } }
        );

        await Usuario.update(
            { email },
            { where: { usuario_id: id } }
        );

        res.redirect('/admin/profesionales');
    } catch (error) {
        handleError(res, error, 'Error al editar profesional');
    }
};

// Exportar funciones
module.exports = {
    obtenerProfesionales,
    cargarNuevoProfesional,
    procesarNuevoProfesional,
    eliminarProfesional,
    editarProfesional,
    procesarEdicionProfesional
};
