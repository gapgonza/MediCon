//turnoController.js
const db = require('../models');
const { Paciente, Profesional, ObraSocial, Turno, Usuario } = db;


//Buscar paciente por DNI
const buscarPaciente = async (req, res) => {
    const { dni } = req.body; 

    try {
        const paciente = await Paciente.findOne({
            where: { dni },
            include: [{ model: ObraSocial, as: 'obraSocial' }]
        });

        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }

        // si puedo obtener los turnos del paciente, pero no
        // const turnos = await Turno.findAll({
        //     where: { paciente_id: paciente.paciente_id },
        //     include: [{ model: Profesional,
        //         as: 'medico',
        //      }],
        //     attributes: ['turno_id', 'agenda_id', 'paciente_id', 'fecha_reserva', 'motivo_consulta', 'estado_id', 'usuario_id']
        // });
        const turnos = await Turno.findAll({
            where: { paciente_id: paciente.paciente_id },
            include: [{
                model: Profesional,
                as: 'medico',
                include: [{ model: Usuario }] 
            }],
            attributes: ['turno_id', 
                'agenda_id', 
                'paciente_id', 
                'fecha_reserva',
                'hora_elegida', 
                'motivo_consulta', 
                'estado_id', 
                'usuario_id']
        });
        
        const medicos = await Profesional.findAll({
            include: [{ model: Usuario }]
        });
        
        res.render('gestionarTurnos', {
            title: 'Gestionar Turnos',
            paciente,
            medicos,
            turnos 
        });
    } catch (error) {
        console.error('Error al buscar paciente:', error);
        res.status(500).send('Error al buscar paciente');
    }
};


// Mostrar formulario para gestionar turnos
const mostrarFormularioTurnos = async (req, res) => {
    try {
        const medicos = await Profesional.findAll({
            include: [{ model: Usuario }]
        });
        
        res.render('gestionarTurnos', {
            title: 'Gestionar Turnos',
            medicos
        });
    } catch (error) {
        console.error('Error al cargar la gestión de turnos:', error);
        res.status(500).send('Error al cargar la gestión de turnos');
    }
};

// Procesar turno
const procesarTurno = async (req, res) => {
    const { dni, medico_id, motivo_consulta } = req.body;

    
    if (!medico_id) {
        return res.status(400).send('Médico no seleccionado');
    }

    try {
        const paciente = await Paciente.findOne({ where: { dni } });

        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }

        const medico = await Profesional.findOne({
            where: { usuario_id: medico_id },
            include: [{ model: Usuario }]
        });

        if (!medico) {
            return res.status(404).send('Médico no encontrado');
        }

        
        res.render('calendarView', {
            title: 'Seleccionar Fecha y Hora del Turno',
            paciente,
            medico,
            motivo_consulta
        });
    } catch (error) {
        console.error('Error al procesar el turno:', error);
        res.status(500).send('Error al procesar el turno');
    }
};

const crearTurno = async (req, res) => {
    const { paciente_id, medico_id, fecha_reserva, hora_elegida, motivo_consulta } = req.body;

    
    // Combinar fecha y hora
    const fechaHoraReserva = `${fecha_reserva}T${hora_elegida}`;
    const estado_id = 1; 

    try {
        const turno = await Turno.create({
            paciente_id,
            usuario_id: medico_id, 
            fecha_reserva: fechaHoraReserva,
            hora_elegida,
            motivo_consulta,
            estado_id    
        });

        res.redirect('/admin/turnos');
    } catch (error) {
        console.error('Error al crear el turno:', error);
        res.status(500).send('Error al crear el turno');
    }
};

const eliminarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        await Turno.destroy({ where: { turno_id: id } });
        res.redirect('/admin/turnos');
    } catch (error) {
        handleError(res, error, 'Error al eliminar turno');
    }
};



// Exportar funciones
module.exports = {
    buscarPaciente,
    mostrarFormularioTurnos,
    procesarTurno,
    crearTurno,
    eliminarTurno
};


