// agendaController.js
const db = require('../models'); 
const { Agenda } = db; 

// Manejar errores
const handleError = (res, error, message) => {
    console.error(message, error);
    res.status(500).send(message);
};

// Obtener agendas
const obtenerAgendas = async (req, res) => {
    try {
        const agendas = await Agenda.findAll({
            include: [
                {
                    model: db.Usuario,
                    as: 'Usuario', 
                },
                {
                    model: db.Especialidad,
                    as: 'Especialidad', 
                },
                {
                    model: db.Sucursal,
                    as: 'Sucursal', 
                }
            ]
        });

        res.render('gestionarAgendas', {
            title: 'Gestionar Agendas',
            agendas
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener agendas');
    }
};



// Cargar datos para nueva agenda
const cargarNuevaAgenda = async (req, res) => {
    try {
        const [profesionales, especialidades, sucursales, estados] = await Promise.all([
            db.Profesional.findAll({
                include:[
                    {
                        model: db.Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id']
                    }
                ]
            }),
            db.Especialidad.findAll(),
            db.Sucursal.findAll(),
            db.Estado.findAll()
        ]);
        console.log(profesionales);

        res.render('nuevaAgenda', {
            title: 'Agregar Nueva Agenda',
            profesionales,
            especialidades,
            sucursales,
            estados
        });
    } catch (error) {
        handleError(res, error, 'Error al cargar los datos para la nueva agenda');
    }
};

// Procesar nueva agenda
const procesarNuevaAgenda = async (req, res) => {
    try {
        const { usuario_id, especialidad_id, sucursal_id, fecha, hora_inicio, hora_fin, estado_id, max_sobreturnos } = req.body;

        const missingField = validateFields([
            { name: 'usuario_id', value: usuario_id },
            { name: 'especialidad_id', value: especialidad_id },
            { name: 'sucursal_id', value: sucursal_id },
            { name: 'fecha', value: fecha },
            { name: 'hora_inicio', value: hora_inicio },
            { name: 'hora_fin', value: hora_fin },
            { name: 'estado_id', value: estado_id },
            { name: 'max_sobreturnos', value: max_sobreturnos }
        ]);

        if (missingField) {
            return res.status(400).send(`El campo ${missingField} es obligatorio.`);
        }

        await Agenda.create(req.body);
        res.redirect('/admin/agendas');
    } catch (error) {
        handleError(res, error, 'Error al crear la agenda');
    }
};

// Editar una agenda
const editarAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const agenda = await Agenda.findByPk(id);
        if (!agenda) {
            return res.status(404).send('Agenda no encontrada');
        }
        res.render('editarAgenda', {
            title: 'Editar Agenda',
            agenda
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener la agenda');
    }
};

// Procesar edición de una agenda
const procesarEdicionAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        await Agenda.update(req.body, { where: { id } });
        res.redirect('/admin/agendas');
    } catch (error) {
        handleError(res, error, 'Error al editar la agenda');
    }
};

// Eliminar una agenda
const eliminarAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        await Agenda.destroy({ where: { id } });
        res.redirect('/admin/agendas');
    } catch (error) {
        handleError(res, error, 'Error al eliminar agenda');
    }
};

// Exportar funciones
module.exports = {
    obtenerAgendas,
    cargarNuevaAgenda,
    procesarNuevaAgenda,
    editarAgenda,
    procesarEdicionAgenda,
    eliminarAgenda
};
