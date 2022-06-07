
const initialState = {
    videogames: [],
    copyVideogames: [],
    genres: [],
    details: [],
    savedPage:0,
}

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                copyVideogames: action.payload,
            }
        case 'GET_GENRES': 
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }
        case 'GET_BY_ID':
            return {
                ...state,
                details: action.payload
            }
        case 'POST_VIDEOGAME':
            return {
                ...state,
            }
        case 'ORDER_BY_NAME':
            
            const orderName = action.payload === 'asc' ?
        state.videogames.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase())return -1
            if(a.name.toLowerCase() > b.name.toLowerCase())return 1
            return 0
        }) :
        state.videogames.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase())return 1
            if(a.name.toLowerCase() > b.name.toLowerCase())return -1
            return 0
        })
            return {
                ...state,
                videogames: orderName
            }

        case 'ORDER_BY_RATING':
            
            const orderRating = action.payload === 'lower' ?
        state.videogames.sort((a,b)=>{
            if(Number(a.rating) < Number(b.rating))return -1
            if(Number(a.rating) > Number(b.rating))return 1
            return 0
        }) :
        state.videogames.sort((a,b)=>{
            if(Number(a.rating)  < Number(b.rating))return 1
            if(Number(a.rating)  > Number(b.rating))return -1
            return 0
        })
            return {
                ...state,
                videogames: orderRating
            }

        case 'CREATED_RAWG':
           const games = state.copyVideogames;
            let filtered;
            if(action.payload === 'created'){
                 filtered = games.filter(c=>c.createdInDb)
                   if(!filtered.length){
                       alert("There are no video games created")
                       filtered= state.copyVideogames;
                   }
               }
               else{
                filtered = games.filter(r=>!r.createdInDb);
               }  
            return {
                ...state,
                videogames: filtered
            }

        case 'FILTER_BY_GENRES':
            console.log(state.copyVideogames)
            const filterByGenres = state.videogames.filter((v)=>v.genres?.toLowerCase().includes(action.payload.toLowerCase()))
            
            return{
                ...state,
                videogames: filterByGenres
            }

        case 'CLEAR_DETAIL':
            return {
                ...state,
                details:[]
            }
        case 'SAVE_PAGE': 
            return {
                ...state,
                savedPage: action.payload
            }

        default:
            return state;
    }
}