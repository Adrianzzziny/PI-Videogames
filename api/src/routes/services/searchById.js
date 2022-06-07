const API_KEY = 'f7378a67c4ca4b5194626d94f508808f';
const axios = require('axios');
const {Videogame, Genre} = require("../../db");

const getInfoApiId = async(id)=>{
    try {
        const findId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const {data} = findId;
        
        return {
                id: data.id,
                name: data.name,
                description: data.description_raw,
                image: data.background_image,
                released: data.released,
                rating: data.rating,
                platforms: data.platforms.map(p => p.platform.name).join(', ').trim(),
                genres: data.genres.map(g => g.name).join(', ').trim()
        }
    } catch (error) {
        console.log(error)
    }
   
}

const getInfoDbId = async(id)=>{
    try {
        let dbInfo = await Videogame.findOne({
            where: {
                id: id
            },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
       
            const vGameFormat = {
              id: dbInfo.id,
              name: dbInfo.name,
              genres: dbInfo.genres.map((g) => g.name).join(', ').trim(),
              image: dbInfo.image,
              rating: dbInfo.rating,
              released: dbInfo.released,
              description: dbInfo.description,
              platforms: dbInfo.platforms,
              createdInDb: dbInfo.createdInDb,
            };
            console.log('esto es dbInfo',dbInfo)
            console.log('esto es platforms format',vGameFormat.platforms)
            return vGameFormat;


    } catch(error) {
        return null;
    }
}

const getAllVideogamesById = async function(id) {

    if (isNaN(id)) {
        const dbInfoById = await getInfoDbId(id);
        return dbInfoById;
    } else {
        const apiInfoById = await getInfoApiId(id);
        return apiInfoById;
    }
}

module.exports = getAllVideogamesById