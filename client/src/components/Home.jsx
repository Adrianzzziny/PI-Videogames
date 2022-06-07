import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, orderByName, orderByRating, filterByCreatedAndRAWG, filterByGenres } from "../redux/actions";
import Pagination from "./Pagination";
import Card from './Card';
import Nav from "./Nav";
import Order from "./Order";
import Filters from "./Filters";
import styles from '../styles/Home.module.css'



export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.videogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(15);
  const indexLastCard = currentPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const currentCards = allVideogames?.slice(indexFirstCard, indexLastCard)

  const [,setOrder] = useState();
  

  const paginado = (current) => {
    setCurrentPage(current);
  };

  useEffect(() => {
    return !currentCards.length ?
    dispatch(getVideogames()):
    null;
  }, [dispatch]);

  function videogameNotFound(){
    dispatch(getVideogames());
    alert(allVideogames[0]);
  }

  function handleFilterCreatedAndRAWG(e){
    dispatch(filterByCreatedAndRAWG(e));
    setCurrentPage(1);
  }

  function handleFilterByGenres(e){
    e.preventDefault()
    dispatch(filterByGenres(e.target.value))
    setCurrentPage(1);
  }

  function handleOrderByName(e){
    setOrder("Order" + e.target.value)
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
  }

  function handleOrderByRating(e){
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1)
    setOrder("Order" + e.target.value)
  }

  return (
    <div className={styles.home}>
    
      <Nav/>
      <div className={styles.orderFilter}>
        <Filters handleFilterCreatedAndRAWG={handleFilterCreatedAndRAWG} handleFilterByGenres={handleFilterByGenres} />
        <Order handleOrderByName={handleOrderByName} handleOrderByRating={handleOrderByRating}/>
      </div>
      <div>
        <Pagination 
        allVideogames={allVideogames.length}
        cardsPerPage={cardsPerPage}
        paginado={paginado}/> 
      </div>
      
      <div>
      {
              currentCards.length > 0 ?
              <div className={styles.container}>
                {allVideogames[0] === "Videogame not found" ?
                videogameNotFound() :
                 currentCards.map(vg => {
                  return ( 
                  <div key={vg.id}>
                    <Card
                      image={vg.image}
                      name={vg.name}
                      genres={vg.genres}
                      rating={vg.rating}
                      id={vg.id} 
                    />
                  </div>
                  );
                })} 
              </div> :
              <div className={styles.loader}></div>
            }
      </div>
      <div>
        <Pagination 
        allVideogames={allVideogames.length}
        cardsPerPage={cardsPerPage}
        paginado={paginado}/> 
      </div>            
    </div>
  )
}
