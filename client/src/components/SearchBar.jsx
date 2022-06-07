import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar(){
const dispatch = useDispatch();
const [name,setName] = useState('')

function handleChange(e){
    e.preventDefault();
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getVideogamesByName(name));
    setName('')
}
    return (
        <form className={styles.searchBar} onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Buscar..." value={name} onChange={(e)=>handleChange(e)}></input>
            <button type="submit">Search</button>
        </form>
    )
}