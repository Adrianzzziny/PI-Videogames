const axios = require("axios");
const API_KEY = 'f7378a67c4ca4b5194626d94f508808f';
const {Op} = require('sequelize')
const {Videogame, Genre} = require("../../db");

const getSearchNameApi = async (name)=>{
    let videogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
    const sliced = videogames.data.results.slice(0, 15);
    
    return sliced.map(v=>{
        return {
            id: v.id,
            name: v.name,
            image: v.background_image,
            rating: v.rating.toFixed(2),
            released: v.released,
            platforms: v.platforms.map(p=>p.platform.name),
            genres: v.genres.map(g=>g.name).join(', ').trim(),
        }
    })
}

const getSearchNameDb = async function(name) {
    let dbInfo = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });

    const dbFormat = dbInfo.map((videogame) => {
        const {
          id,
          name,
          genres,
          image,
          rating,
          released,
          description,
          platforms,
          createdInDb,
        } = videogame;
        const vGameFormat = {
          id,
          name,
          genres: genres.map((g) => g.name).join(', ').trim(),
          image,
          rating,
          released,
          description,
          platforms,
          createdInDb,
        };
        
        return vGameFormat;
      });
      return dbFormat;
}

const getAllVideogamesByName = async(name)=>{
    const searchApi = await getSearchNameApi(name);
    const searchDb = await getSearchNameDb(name);
    const allNames = [...searchDb,...searchApi].slice(0,15)
    return allNames;
}

module.exports = getAllVideogamesByName