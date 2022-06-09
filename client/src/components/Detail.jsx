import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link} from "react-router-dom";
import { getVideogameById, clearDetail} from "../redux/actions";
import styles from "../styles/Detail.module.css";

export default function Detail(){
const {id} = useParams();
const dispatch = useDispatch();
const detail = useSelector(state=>state.details);

useEffect(()=>{
dispatch(getVideogameById(id));
    return ()=>{
       dispatch(clearDetail())
    }
}
,[dispatch,id])




    return(
        <div className={styles.detail}>
            <Link to={'/home'}><button><span>HOME</span></button></Link>
            <h2>Details</h2>
            
            {
                <div className={styles.subDetail}>
                    <div className={styles.infoDetail}>
                        <img className={styles.infoDetail} src={detail.image} alt={detail.name} />
                        <h4 className={styles.name}>{detail.name}</h4>
                        <b>Description: </b><span>{detail.description}</span>
                        <b>Released: </b><span>{detail.released}.</span>
                        <b>Rating: </b><span>{detail.rating}.</span>
                        <b>Platforms: </b><span>{detail.platforms}.</span>
                        <b>Genres: </b><span>{detail.genres}.</span><br/>
                    </div>
                
                </div>
            }
        </div>
    )
}