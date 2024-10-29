// administradorRutas.js
const express = require('express');
// const db = require('../models/db');
const router = express.Router();
// const { Agenda, Paciente, Profesional, ObraSocial, Especialidad, Sucursal, Usuario, Estado } = require('../models');
const { procesarLogin, mostrarDashboard, cerrarSesion } = require('../controllers/administradorController');
const { obtenerAgendas, cargarNuevaAgenda, procesarNuevaAgenda, editarAgenda, procesarEdicionAgenda, eliminarAgenda } = require('../controllers/agendaController');
const { Profesional, Usuario, Especialidad, Estado, Sucursal } = require('../models');
const pacienteController = require('../controllers/pacienteController');
const profesionalController = require('../controllers/profesionalController');
const turnoController = require('../controllers/turnoController');
const dashboardController = require('../controllers/dashboardController');
// 2 Funciones una para manejar errores y el otro para validar campos
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

// Ruta principal
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Bienvenido',
        message: 'Por favor, seleccione para continuar.'
    });
});

// ----------------------------------------------------------------Ruta de administración
router.get('/administracion', (req, res) => {
    res.render('adminLogin', {
        title: 'Inicio de Sesión - Administración',
        message: 'Por favor, ingresa tus credenciales.'
    });
});

// Procesar inicio de sesión
router.post('/administracion', procesarLogin);

// Página principal de administración
router.get('/admin', mostrarDashboard);

// Cerrar sesión
router.get('/admin/logout', cerrarSesion);

// -----------------------------------------------------------------Rutas para gestionar agendas
router.get('/admin/agendas', obtenerAgendas);

// Cargar datos para nueva agenda
router.get('/admin/agendas/nueva', cargarNuevaAgenda);

// Procesar nueva agenda
router.post('/admin/agendas/nueva', procesarNuevaAgenda);

// Editar una agenda
router.get('/admin/agendas/editar/:id', editarAgenda);

// Procesar edición de una agenda
router.post('/admin/agendas/editar/:id', procesarEdicionAgenda);

// Eliminar una agenda
router.post('/admin/agendas/eliminar/:id', eliminarAgenda);

// -----------------------------------------------------------------Rutas para gestionar pacientes---------------------
router.get('/admin/pacientes', pacienteController.obtenerPacientes);

router.get('/admin/pacientes/nuevo', pacienteController.cargarNuevoPaciente);

router.post('/admin/pacientes/nuevo', (req, res) => pacienteController.procesarNuevoPaciente(req, res, validateFields));

router.post('/admin/pacientes/eliminar/:id', pacienteController.eliminarPaciente);

router.get('/admin/pacientes/editar/:id', pacienteController.editarPaciente);

router.post('/admin/pacientes/editar/:id', (req, res) => pacienteController.procesarEdicionPaciente(req, res, validateFields));

//------------------------------------------------------------------Rutas para gestionar profesionales
router.get('/admin/profesionales', profesionalController.obtenerProfesionales);

router.get('/admin/profesionales/nuevo', profesionalController.cargarNuevoProfesional);

router.post('/admin/profesionales/nuevo', profesionalController.procesarNuevoProfesional);

router.post('/admin/profesionales/eliminar/:id', profesionalController.eliminarProfesional);

router.get('/admin/profesionales/editar/:id', profesionalController.editarProfesional);

router.post('/admin/profesionales/editar/:id', profesionalController.procesarEdicionProfesional);

// Endpoint dinamitaaaa para solicitar los turnsss
router.get('/api/profesionales', async (req, res) => {
    const { especialidad_id } = req.query;

    try {
        const profesionales = await Profesional.findAll({
            where: { especialidad_id }, // Filtra por la especialidad
            include: [{ model: Usuario, attributes: ['nombre', 'apellido'] }]
        });

        res.json(profesionales);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener profesionales');
    }
});

// Endpoint para obtener horarios disponibles
router.get('/api/horarios', async (req, res) => {
    const { medico_id, fecha } = req.query;

    try {
        const horarios = await obtenerHorariosDisponibles(medico_id, fecha); // Implementa esta función
        res.json(horarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener horarios');
    }
});


//------------------------------------------------------ Rutas para gestionar turnos
router.post('/admin/turnos/buscar', turnoController.buscarPaciente);

router.get('/admin/turnos', turnoController.mostrarFormularioTurnos);

router.post('/admin/turnos/procesar', turnoController.procesarTurno);

router.post('/admin/turnos/crear', turnoController.crearTurno);

router.post('/admin/turnos/eliminar/:id', turnoController.eliminarTurno);

//----------------------------------------------------Rutas para pantalla principakl

router.get('/profesionales', dashboardController.obtenerProfesionales);

router.get('/solicitud', dashboardController.solicitarTurnoForm);

router.post('/solicitarTurno', dashboardController.solicitarTurno);

module.exports = router;
