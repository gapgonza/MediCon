// profesionalesControllers.js
const getProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: [
                { model: Especialidad, attributes: ['nombre'] },
                { model: Estado, attributes: ['nombre'] },
                { model: Sucursal, attributes: ['nombre'] }
            ]
        });

        res.render('gestionarProfesionales', { title: 'Gestión de Profesionales', profesionales });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener profesionales');
    }
};
