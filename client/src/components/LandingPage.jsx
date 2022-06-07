import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/LandingPage.module.css';
import logoHenry from '../assets/logoHenry.png'

export default function LandingPage(){

    return (
        <div className={styles.landing}>
            <img src={logoHenry} alt='logo'/>
            <div className={styles.header}>
                <Link to='/home'><span>HOME</span></Link>
                <Link to='/home'><span>SEARCH</span></Link>
                <Link to='/videogame'><span>CREATE</span></Link>
            </div>
            <div className={styles.description}>
                <h1>HENRY VIDEOGAMES!</h1>
                <Link to='/home'><button className={styles.button}><span>START</span></button></Link>
            </div>
            
        </div>
    )
}