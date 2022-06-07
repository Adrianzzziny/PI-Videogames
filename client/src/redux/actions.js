
export function getVideogames() {
    return function (dispatch) {
      return fetch(`http://localhost:3001/videogames`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_VIDEOGAMES", payload: json });
        });
    };
  }

  export function getGenres() {
    return (dispatch) =>
      fetch(`http://localhost:3001/genres`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "GET_GENRES",
            payload: json,
          });
        });
  }

  export function getVideogamesByName(name) {
    return (dispatch) =>
      fetch(`http://localhost:3001/videogames?name=${name}`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "GET_BY_NAME",
            payload: json,
          });
        });
  }

  export function getVideogameById(id) {
    return (dispatch) =>
      fetch(`http://localhost:3001/videogame/${id}`)
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "GET_BY_ID",
            payload: json,
          });
        });
  }

  export function postVideogame(obj) {
    return (dispatch) =>
      fetch("http://localhost:3001/videogame", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: "POST_VIDEOGAME",
            payload: json,
          });
        });
  }

export function orderByName(payload){
        return {type:'ORDER_BY_NAME', payload}
}

export function orderByRating(payload){
    return {type:'ORDER_BY_RATING', payload}
}

export function filterByCreatedAndRAWG(payload){
    return {type:'CREATED_RAWG', payload}
}

export function filterByGenres(payload){
    return {type:'FILTER_BY_GENRES', payload}
}

export function clearDetail(){
    return {type:'CLEAR_DETAIL'}
}

export function savePage(payload){
    return {type:'SAVE_PAGE', payload}
}