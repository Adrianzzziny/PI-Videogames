import React, {useEffect} from "react";
import { getGenres } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Filters.module.css"

export default function Filters({handleFilterByGenres,handleFilterCreatedAndRAWG}){

    const dispatch = useDispatch();
    const genres = useSelector((state)=>state.genres);

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])

    
    return(
        <div className={styles.filters}>
            <p>FILTER BY: </p>
            <div className={styles.origin}>
                <button onClick={()=>handleFilterCreatedAndRAWG('created')}>Created</button>
                <button onClick={()=>handleFilterCreatedAndRAWG('rawg')}>RAWG</button>
            </div>
            <div className={styles.genres}>
                <label>Genres: </label>
                <select defaultValue=' ' onChange={(e)=>handleFilterByGenres(e)}>
                <option value=' ' disabled defaultValue>-Select Genres-</option>
                    {
                        genres?.map((g)=>{
                            return (
                                <option key={g.id} value={g.name}>{g.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}