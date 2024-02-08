import logo from './logo.svg';
import './App.css';
import {MdCloudUpload} from "react-icons/md"
import { useEffect, useState } from 'react';

function App() {
   const [img,setImg] = useState("")
   const [allimage, setAllImage] = useState([])

  const imagebase64 = async(file)=>{
    const reader = new FileReader()
   await reader.readAsDataURL(file)
    const data = new Promise((resolve,reject)=>{
      reader.onload = ()=>resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })
    return data
  }


  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]
    const image = await imagebase64(file)
    console.log(image)
    setImg(image)
  }

  const fetchimage = async()=>{
    const res = await fetch("http://localhost:8080/")
    const data = await res.json()
    setAllImage(data.data)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const res = await fetch("http://localhost:8080/upload",{
      method:"POST",
      headers : {
        "content-type" : "application/json"
      },
      body:JSON.stringify({img :img})
    })
    const data = await res.json()
    console.log(data)
    if(data.success){
      alert(data.message)
      setImg("")
      fetchimage()
    }
  }

   useEffect(()=>{
    fetchimage()
   },[])
 
  return (
    <>
      <div className="imageContainer">
      <form>
        <label htmlFor="uploadImage">
          <div className="uploadBox">
             <input type="file" id="uploadImage" onChange={handleUploadImage}/>
             {img ? <img src={img}/> : <MdCloudUpload/>}
          </div>

        </label>
        <div className='btn'>
        <button onClick={handleSubmit}>Upload</button>
        </div>
      </form>

      <div className='allimage'>
        {
          allimage.map(el=>{
            return <img src={el.image} width={"250px"} height={"180px"}/>
          })
        }
      </div>
    </div>
    </>
  );
}

export default App;
