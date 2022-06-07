import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { getGenres, getVideogames, postVideogame } from "../redux/actions";
import preview from '../assets/preview.png';
import styles from '../styles/Create.module.css'


const checkUndefined = (input)=>{
if(input.genres.length===0)return true;
if(input.platforms.length===0)return true;
for(let key in input){
    return input[key]==='';
    }
}

const validate = (input)=>{
    const {name, image, rating, description, released} = input;
    const nameVideogame = /^[A-Za-z0-9\s]+$/; //nombre con letras, numeros y espacios 
    const dosDecimales = /^([0-5]{1}(\.[0-9]{1,2})?)$/; //numero con dos decimales
    const urlImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/; 
    const releasedFormat = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    const errors = {}

if(checkUndefined(input)){
    errors.allFields= 'Todos los campos son requeridos';
}
if(!nameVideogame.test(name)){
    errors.name = "Solo números, letras y espacios son aceptados";
}
else if(name.length<=2 ||name.length>20){
    errors.nameLength = "El nombre debe contener entre 3 y 20 caracteres";
}
if(!dosDecimales.test(rating)||rating > 5 ||rating < 0.1){
    errors.rating = "Solo números entre 0.1 y 5 son aceptados";
}
if(isNaN(Number(rating))){
    errors.isNan = "El valor no es un número";
}
if(description.length < 16 ||description.length>250){
    errors.description = "La descripciom debe contener entre 16 y 250 caracteres";
}
if(!releasedFormat.test(released)){
    errors.released = "El formato debe ser dd/mm/yyyy";
}
if(!urlImage.test(image)){
    errors.image = "Image url aceptadas: jpg, jpeg, gif and png";
}
return errors;
}


export default function Create() {
    const platforms = [
        "Xbox One","Xbox Series S/X","Xbox 360","PlayStation 2",
        "PlayStation 3","PlayStation 4","PlayStation 5","PC","Nintendo Switch",
        "Linux","macOS","Android","iOS","Xbox","PS Vita","Web","Wii U","Nintendo 3DS",
      ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allGenres = useSelector((state)=>state.genres)
    const [error, setError] = useState({allFields: "Todos los campos son requeridos"});
    const [input, setInput] = useState({
        name:"",
        image:"",
        released:"",
        description:"",
        rating:"",
        platforms:[],
        genres:[],
    })

    const handleChange = (e)=>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value});
        setError(
            validate({
                ...input,
                [e.target.name] : e.target.value,})
            )
    }

    function handleSelectGenres(e){
        const {value} = e.target;
        if(!input.genres.includes(value) && input.genres.length<4){
            e.preventDefault();
            setInput({
                ...input,
                genres:[...input.genres,e.target.value]
            });
            setError(validate({
                ...input,
                genres:[...input.genres,e.target.value]
            }))
        }
        else{
            alert("No puedes seleccionar más de 4 géneros. No puedes repetir géneros.")
        }
    }

    function handleSelectPlatforms(e){
        const {value} = e.target;
        if(!input.platforms.includes(value) && input.platforms.length<4){
            e.preventDefault();
            setInput({
                ...input,
            platforms:[...input.platforms,e.target.value]
            });
            setError(validate({
                ...input,
                platforms:[...input.platforms,e.target.value]
            }))
        }
        else{
            alert("No puedes seleccionar más de 4 plataformas. No puedes repetir plataformas.")
        }
    }

    function handleDelete(e){
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(g=>g!==e.target.name),
            platforms: input.platforms.filter(p=>p!==e.target.name)
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("Videogame creado exitosamente!")
        setInput({
        name: '',
        image:'',
        released:'',
        description:'',
        rating:'',
        platforms:[],
        genres:[],
        });
        dispatch(getVideogames())
        navigate('/home')
    }

  useEffect(() => {
      dispatch(getGenres())
  }, [dispatch]);

  return (
    <div className={styles.create}>
        <Link to={'/home'}><button className={styles.btnHome}><span>HOME</span></button></Link>
        
        <div className={styles.subCreate}>
        <div className={styles.preview}>
            <h2>Crea tu Videogame</h2>
            <img alt='preview' src={input.image.length ?
                input.image :
                preview}/>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="inputName">Nombre: </label>
                <input type='text' id="inputName" value={input.name} name="name" placeholder="nombre..." onChange={handleChange}></input>
            </div>
            {error.name && <small className={styles.errors}>{error.name}</small>}
            {error.nameLength && <small className={styles.errors}>{error.nameLength}</small>}

            <div>
                <label htmlFor="inputReleased">Released: </label>
                <input type="text" id="inputReleased" value={input.released} name="released" placeholder="dd/mm/yyyy" onChange={handleChange}></input>
            </div>
            {error.released && <small className={styles.errors}>{error.released}</small>}

            <div>
                <label htmlFor="inputRating">Rating: </label>
                <input type="number" id="inputRating" value={input.rating} name="rating" placeholder="0.1 al 5" onChange={handleChange}></input>
            </div>
            {error.rating && <small className={styles.errors}>{error.rating}</small>}

            <div>
                <label htmlFor="inputDescription">Descripcion: </label>
                <textarea id="inputDescription" name="description" rows="5" cols="50" placeholder="descripcion del videogame..." onChange={handleChange} value={input.description}></textarea>   
            </div>
            {error.description && <small className={styles.errors}>{error.description}</small>}

            <div>
                <label htmlFor="inputImage">Image: </label>
                <input id="inputImage" type="url" value={input.image} name="image" placeholder="url image..." onChange={handleChange}></input>
            </div>
            {error.image && <small className={styles.errors}>{error.image}</small>}

            <div>
            <label htmlFor="selectGenres">Géneros: </label>
            <select id="selectGenres" className={styles.select} onChange={(e)=>handleSelectGenres(e)}>
                    {!input.genres.length ?
                    <option key='select' value="default">Selecciona géneros</option> :
                    <option key='select' disabled selected>Seleccioa géneros</option>
                    }
                {
                    allGenres?.map((g)=>{
                        return(
                            <option value={g.name} key={g.id}>{g.name}</option>
                        )
                    })       
                }
            </select>
            </div>
                <div className={styles.selectsDelete}>
                {input.genres.map(gen=>
                    (<div className={styles.containerDlt} key={gen}>
                        <button className={styles.deleteBtn} name={gen} onClick={(e)=>handleDelete(e)}>x</button>
                    <p>{gen}</p>
                    </div>))
                }
                </div>

            <div>
            <label htmlFor="selectPlatforms">Plataformas: </label>
            <select id="selectPlatforms" className={styles.select} onChange={(e)=>handleSelectPlatforms(e)}>
                    {!input.platforms.length ?
                    <option key='select' value="default">Selecciona plataformas</option> :
                    <option key='select' disabled selected>Selecciona plataformas</option>
                    }
                {
                    platforms?.map((p,i)=>{
                        return(
                            <option value={p} key={i}>{p}</option>
                        )
                    })       
                }
            </select>
            </div>
                <div className={styles.selectsDelete}>
                {input.platforms.map(plat=>
                    (<div className={styles.containerDlt} key={plat}>
                        <button className={styles.deleteBtn} name={plat} onClick={(e)=>handleDelete(e)}>x</button>
                    <p>{plat}</p>
                    </div>))
                }
                </div>

        {
        Object.keys(error).length ?
         <button className={styles.btnCreate} type="submit" disabled={true}>Create</button>:
         <button className={styles.btnCreateOn} type="submit">Create</button>
        }
        {error.allFields && <small className={styles.error}>{error.allFields}</small>}
            
        </form>
        </div>
    </div>
  );
}
