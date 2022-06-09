const getAllVideogames  = require('../services/100videogames.js')
const getAllVideogamesByName = require('../services/videogamesByName.js')

const videogames= async(req,res,next)=>{
    const {name} = req.query
    try {
        if(name){
            const allVgamesByName = await getAllVideogamesByName(name);
            allVgamesByName.length ?
            res.status(200).send(allVgamesByName) :
            res.send(["Videogame no encontrado"])
        }
        else{
            const allVgames = await getAllVideogames();
            res.status(200).send(allVgames);
        }
    } catch (error) {
        next(error)
    }

}

module.exports = videogames

