const express = require('express');
const router = express.Router();


router.post('/usuarios', (req, res) => {
    // Logica poaara crear un usuario nuevo
    res.send('Usuario creado.');
});

// aca otras rutass

module.exports = router;
