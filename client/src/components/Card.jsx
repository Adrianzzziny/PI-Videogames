import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Card.module.css'

export default function Card({name,image,genres,rating,id}){
    return(
        <div className={styles.card}>
            <div className={styles.subCard}>
                <Link to={`/videogame/${id}`}>
                    <img className={styles.cardImg} src={image} alt={name} height='250px' width='200px'/>
                </Link>
            </div>
            <div className={styles.info}>
                <b className={styles.name}>{name}</b><br/>
                <b className={styles.titles}>Rating: </b><span>{rating}</span><br/>
                <b className={styles.titles}>Genres: </b><span>{genres}.</span>
            </div>
        </div>
    )
}


