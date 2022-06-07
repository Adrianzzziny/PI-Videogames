const API_KEY = 'f7378a67c4ca4b5194626d94f508808f';
const axios = require('axios');
const {Videogame, Genre} = require("../../db");
 
const getApiInfo = async()=>{
    let gamesData = [];

    for (let i = 1; i < 6; i++) {
        gamesData.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`));
    }

    return Promise.all(gamesData)
        .then((response) => {

            let pages = [];
            let resultado = [];

            for (let i = 0; i < response.length; i++) {
                pages = [...pages, response[i].data.results];
            }

            pages.map(p => {
                p.forEach(v => {
                    resultado.push({
                        id: v.id,
                        name: v.name,
                        image: v.background_image,
                        rating: v.rating.toFixed(2),
                        genres: v.genres.map(g => g.name).join(', ').trim()
                    })
                })
            })

            return resultado;
        })
}


const getDbInfo = async function() {

    let dbInfo = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
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

const getAllVideogames = async()=>{
    const dbData = await getDbInfo();
    const apiData = await getApiInfo();
    const allvgames = [...dbData, ...apiData].slice(0,100)
    return allvgames;
}

module.exports = getAllVideogames