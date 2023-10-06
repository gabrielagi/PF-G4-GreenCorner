import {useState} from 'react'




const Intento = (props) => {
const preset_key='';
const cloud_name='';
const cloud_url=''
const [image, setImage]= useState({array:{}})

  return (
    <div>
      <div className='w-25 bg-white mt-5 p-5'>
        <input type='file' name='image'></input>
        <br></br>
      </div>


    </div>
  )
}

export default Intento