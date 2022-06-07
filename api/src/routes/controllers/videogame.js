const getAllVideogamesById  = require('../services/searchById')
const {Videogame, Genre} = require('../../db')

const videogameId = async(req,res,next)=>{
const {id} = req.params;
try {
    const videogamesId = await getAllVideogamesById(id)
    if(videogamesId !== null){
        res.status(200).send(videogamesId)
    }
    else{
        res.status(404).send("id no encontrado")
    }
} catch (error) {
    next(error);
}
}

const videogamePost = async(req,res,next)=>{
    const {name, description, released, rating, genres, platforms, image} = req.body
    try {
        const modelPost = {
            name,
            description,
            released,
            rating,
            platforms: platforms.join(', , ').split(' ,'), 
            image,
        }
        const gnres = await Genre.findAll({
            where: {
                name: genres
            }
        })
        
        const vgameCreated = await Videogame.create(modelPost)
        vgameCreated.addGenre(gnres)
        res.send("Videogame creado!")
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    videogameId,
    videogamePost
}
