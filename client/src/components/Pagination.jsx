import React from "react";
import styles from '../styles/Pagination.module.css';

export default function PaginateFunction({allVideogames,cardsPerPage, paginado}){

const pageNumber = []
const numberOfPages = Math.ceil(allVideogames/cardsPerPage)

for(var i=1; i<numberOfPages; i++){
    pageNumber.push(i)
}
if(allVideogames/cardsPerPage>1 && allVideogames%cardsPerPage!==0){
    pageNumber.push(pageNumber.length + 1)
}

return(
    <ul >
{
        pageNumber?.map(num=>
            (
                <li key={num}>
                    <button className={styles.btn} onClick={()=>paginado(num)}>{num}</button>
                </li>
            )
        )
}
    </ul>
)
}