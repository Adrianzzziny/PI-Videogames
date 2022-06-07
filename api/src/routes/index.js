const { Router } = require('express');
const videogames = require('./controllers/videogames')
const allGenres = require('./controllers/genres')
const {videogameId, videogamePost} = require('./controllers/videogame');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', videogames);
router.get('/genres', allGenres);
router.get('/videogame/:id', videogameId);
router.post('/videogame', videogamePost);




module.exports = router;
