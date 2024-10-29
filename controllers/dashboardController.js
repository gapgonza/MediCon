const db = require('../models');
const { Profesional, Usuario, Especialidad, Estado, Sucursal, Turno, ObraSocial } = db;

// ---------------------Obtener profesionales
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

        // Map
        const listaProfesionales = profesionales.map(profesional => ({
            nombre_completo: `${profesional.Usuario.nombre} ${profesional.Usuario.apellido}`,
            especialidad: profesional.Especialidad.nombre,
            estado: profesional.Estado.nombre,
            sucursal: profesional.Sucursal.nombre
        }));

        res.render('dashprofesional', {
            title: 'Listado Profesionales',
            profesionales: listaProfesionales
        });
    } catch (error) {
        handleError(res, error, 'Error al obtener profesionales');
    }
};

// --------------Renderiza el formulario para solicitar un turno médico
const solicitarTurnoForm = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll(); 
        const obras_sociales = await ObraSocial.findAll();
        const profesionales = await Profesional.findAll({
            include: [{ model: Usuario, attributes: ['nombre', 'apellido']}]
        });
        
        
        res.render('dashturno', { profesionales, especialidades, obras_sociales });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

// POST: Procesa la solicitud de un turno médico
const solicitarTurno = async (req, res) => {
    const { especialidad_id, medico_id, motivo_consulta, obra_social_id } = req.body;

    try {
        const nuevoTurno = await Turno.create({
            especialidad_id,
            medico_id,
            motivo_consulta,
            obra_social_id,
            
        });

        res.redirect('/'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al solicitar el turno');
    }
};

module.exports = {
    obtenerProfesionales,
    solicitarTurnoForm,
    solicitarTurno
};
