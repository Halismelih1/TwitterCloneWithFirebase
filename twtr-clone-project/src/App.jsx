import {Routes, Route, useNavigate} from "react-router-dom";
import Auth from "./Pages/Auth"
import Feed from "./Pages/Feed"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/config";
import { useEffect } from "react";
import {toast} from "react-toastify"




function App() {

  const navigate = useNavigate();
  
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
       navigate("/feed")
       toast.success("Giriş başarılı")
      }else{
       navigate("/")
       

      }
    })
  },[])

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/feed" element={<Feed/>}/>
      </Routes>
    
    </>
  )
}

export default App
