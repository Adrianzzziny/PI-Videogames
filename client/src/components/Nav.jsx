import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getVideogames } from "../redux/actions";
import { useDispatch } from "react-redux";
import styles from "../styles/Nav.module.css";
import logoHenry from "../assets/logoHenry.png";

export default function Nav(){
const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.containerImage}>
                <img src={logoHenry} alt="logo"/>
            </div>
            <div className={styles.containerButtons}>
                <Link to='/home'><button className={styles.button}><span>HOME</span></button></Link>
                <Link to='/videogame'><button className={styles.button}><span>CREATE</span></button></Link>
                <Link to='/home'><button className={styles.button} onClick={()=>{dispatch(getVideogames())}}><span>RESET</span></button></Link>
            </div>
                <SearchBar/>
        </div>
    )
}