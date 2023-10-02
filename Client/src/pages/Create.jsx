import { useDispatch, useSelector } from 'react-redux'
import  {useEffect, useState} from 'react'
import { getAllCategories, getAllProducts, addProduct } from '../Redux/actions/product/action'
import { Link } from 'react-router-dom'


//REPASAR:
//Flujo de Errores, Dispatch de estado
//terminar estilos

function Create() {

  const dispatch=useDispatch()
  const products= useSelector(state=>state.allProducts)
  const categories=useSelector((state)=> state.categories)
  useEffect(()=>{
    dispatch(getAllProducts())
    dispatch(getAllCategories())
   },[dispatch]);

//input
  const [state,setState]=useState({
    name:'',
    dificulty:'',
    season:'',
    countries:[  ],

  })


  const [error, setError] = useState({                      //Estado de errore
    name:"El nombre es requerido.",
    difficulty:"Debes aclarar la dificultad de la actividad",
    season:"Debes aclarar en qué estacion funciona la actividad",
    duration:'Debes aclarar la duración de la actividad',
    countries:'Debes seleccionar almenos un país'
  })



  const validate = (stateAux, name)=>{     // VALIDADOR DE ERRORES?¡?=¡?

  const regex=/[!@#$%^&*()_+{}\[\]:;<>,.?~\\|="'\-]/
  

   

    if(name==="name"){
      const existentActivity= categories.find((a)=> a.name == stateAux.name)
      console.log('se está validando')
        if(stateAux.name==="") setError({...error, name:"El nombre es requerido."})
          else if( regex.test(stateAux.name))
            {setError({...error, name:'No se admiten carácteres especiales'})}
          else if(!/^[A-Za-z\s]+$/.test(stateAux.name))
            {setError({...error, name:'No se admiten numeros'})}
          else if(stateAux.name.length >60){
            setError({...error, name:'Solo se admiten 60 carácteres máximo'})
          }
          
          if(existentActivity){setError({...error,name:'Ya existe una actividad con ese nombre'})}
        else setError({...error, name:""})
      }

    if(name==="difficulty"){
        if(isNaN(parseInt(stateAux.difficulty)))
          {setError({...error, difficulty:"El valor ingresado NO es un numero."})}
        else if(regex.test(stateAux.difficulty))
          {setError({...error, difficulty:'No se admiten carácteres especiales'})}
        else if ( stateAux.difficulty<0 || stateAux.difficulty>5)
          {setError({...error, difficulty:'Solo se admiten valores entre 1 y 5'})}
        else setError({...error, difficulty:""})
    }
    if(name==="season"){
        if(stateAux.season!=='Invierno'&& stateAux.season!=='Verano'&& stateAux.season!=='Primavera'&& stateAux.season!=='Otoño' )
         {setError({...error,season:'Solo se permiten las estaciones como valor(en español)'})}
         else if(regex.test(stateAux.season))
         {setError({...error, season:'No se admiten carácteres especiales'})}
        else setError({...error,season:""})
     }
    if(name==='duration'){
      if(regex.test(stateAux.duration))
        {setError({...error, duration:'No se admiten carácteres especiales'})}
     else if(isNaN(parseInt(stateAux.duration)))
        {setError({...error,duration:'Solo se permiten numeros'})}

      else setError({...error,duration:''})
    }

    if(name==='countries'){
      if (stateAux.countries.length > 0)
      setError({...error, countries:''})
    }
  }

  const handleChange= (event)=>{              //Manejador de cambios en el input
     
    if(event.target.name==='countries'){
  
      console.log('este es el event',event.target.value)
      
    if(state.countries.includes(event.target.value)) return
   
      
      setState({
      
        ...state,
        [event.target.name]: [...state[event.target.name],event.target.value],
       
      })
      console.log(state.countries.length)
      
    }
    else{
      setState({
        ...state,
        [event.target.name]: event.target.value
      })


    }
    validate({
      ...state,
      [event.target.name]: event.target.value
    }, event.target.name)
  }

 
  const handleSubmit= (event)=>{                       //manejador de cambios en el submit
   
   
    event.preventDefault()
    const existentActivity= categories.find((a)=> a.name == state.name)
    if(existentActivity){setError({...error,name:'Ya existe una actividad con ese nombre'})
    return}
    


    dispatch(addProduct(state))

    window.alert('Actividad creada con éxito')
    setState(
    {  name:'',
    dificulty:'',
    season:'',
    countries:[  ],
    }
      
    )
  }
  console.log(state)

  const deleteCountry=(event)=>{

    const filteredCountries= state.countries.filter((c)=>c !== event.target.id)
    console.log(filteredCountries)
    console.log(event.target.id)
    setState({
      ...state,
       countries: filteredCountries
    })
   
    if(state.countries.length===1){
      console.log('no hay nati')
     setError({
      ...error,
      countries:'Debes seleccionar almenos un país'
     }) 
    }
  }

  const disable=()=>{
    let disableAux=true
    for(let err in error){
      if(error[err]===''){disableAux=false}
      else{disableAux =true
      break}
    }
    return disableAux
  }
  console.log('Este es el estado countries',state)
  return (
    <div className='mx-40'>
     <Link to='/home'>  <button className='backButton'>Atrás</button> </Link>
      <div className='bg-red-500 grid grid-cols-1 mx-60 text-center'>

        <h1>Añadir producto nuevo</h1>

          <div className='create-form' onSubmit={handleSubmit}>
             </div>

        <label>  Nombre</label>
          <input className='input' placeholder='Nombre de tu actividad' name='name' onChange={handleChange} type='text'/>
{     error.name?   <label  className='form-error'>{error.name}</label>:<br></br>}
        <label> Dificultad</label>
           <input className='input' placeholder='Numeros del 1 al 5 ' name='difficulty' onChange={handleChange} type='text'/>
           {     error.difficulty?   <label  className='form-error'>{error.difficulty}</label>:<br></br>}

        <label> Temporada del año</label>
            <select name='season' onChange={handleChange} type='text'>
              <option value='Verano'>Verano</option>
              <option value='Invierno'>Invierno</option>
              <option value='Otoño'>Otoño</option>
              <option value='Primavera'>Primavera</option>
            </select>
            
            
            

            {     error.season?   <label  className='form-error'>{error.season}</label>:<br></br>}

        <label>En qué país se hará </label>
          <select value={state.countries} className='input' name='countries' onChange={handleChange}>
             {products?.map(country=>(

              <option key={country.id} value={country.id} >{country.name}</option>
             ))}
         </select>
         <div>
          {state.countries.map((countryID)=>{
            const selectedCountry= products.find((country)=>country.id===countryID)
            return (
            <div key={selectedCountry.id}>
              <p  key={selectedCountry.id} >{selectedCountry.name}</p>
            <button type='button' id={selectedCountry.id} onClick={deleteCountry}>X</button>
            </div>
              )
          })}
          
         </div>
         {     error.countries?   <label  className='form-error'>{error.countries}</label>:<br></br>}




        <label>Duración</label>
            <input className='input' name='duration' onChange={handleChange} placeholder='Duración en horas'></input>
             { error.duration?   <label  className='form-error'>{error.duration}</label>:<br></br>}
                              <hr/>


              <button disabled={disable()} type='submit' > Crear!</button>
      




      </div>

    </div>
  )
}

export default Create