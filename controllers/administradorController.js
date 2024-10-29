// administradorController.js

// Procesar inicio de sesión
const procesarLogin = (req, res) => {
    const { usuario, contraseña } = req.body;
    if (usuario === 'admin' && contraseña === 'admin') {
        req.session.user = 'admin';
        return res.redirect('/admin');
    } else {
        res.render('adminLogin', {
            title: 'Inicio de Sesión - Administración',
            message: 'Credenciales incorrectas. Intenta nuevamente.'
        });
    }
};

// principal administración
const mostrarDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/administracion');
    }
    res.render('adminDashboard', {
        title: 'Panel de Administración',
        message: 'Bienvenido, Administrador'
    });
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/admin');
        }
        res.redirect('/');
    });
};

// Exportar funciones
module.exports = {
    procesarLogin,
    mostrarDashboard,
    cerrarSesion
};
