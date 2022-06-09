const getGenres = require('../services/searchGenres')
const {Genre} = require('../../db')

const allGenres = async (req,res, next)=>{
    try {
        getGenres();
        const allGenresDb = await Genre.findAll()
        res.send(allGenresDb);
    } catch (error) {
        next(error)
    }
}

const createGenre = async (req,res)=>{
    const {genre} = req.body
    const genero = await Genre.findOrCreate({
        where: {
            name: genre,
        }
    })
    res.status(200).send(genero)

}

module.exports = allGenres, createGenre;

