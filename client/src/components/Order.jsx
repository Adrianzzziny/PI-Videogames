import React from "react";
import styles from "../styles/Order.module.css";

export default function Order({handleOrderByName, handleOrderByRating}){

    return(
        <div className={styles.order}>
            <p>ORDER BY: </p>
            <div className={styles.name}>
                <label>Name: </label>
                <select defaultValue=' ' onChange={(e)=>handleOrderByName(e)}>
                    <option value=' ' disabled defaultValue>-Alphabetically-</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
            </div>
            <div className={styles.rating}>
                <label>Rating: </label>
                <select defaultValue=' ' onChange={(e)=>handleOrderByRating(e)}>
                    <option  value=' ' disabled defaultValue>-By Rating-</option>
                    <option value='higher'>+ Rating</option>
                    <option value='lower'>- Rating</option>
                </select>
            </div>
        </div>
    )
}