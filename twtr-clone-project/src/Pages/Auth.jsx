import React, { useState } from 'react';
import { createUserWithEmailAndPassword,signInWithRedirect, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../Firebase/config';
import { provider } from '../Firebase/config';
import {toast} from "react-toastify"

const Auth = () => {

  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value

    //kaydol > yeni kullanıcı oluşturma
    if (signUp) {

      createUserWithEmailAndPassword(auth, email, password)
        // .then(() => { navigate("/feed") })
        .catch((err) => toast.error(err.code))

      //giriş > giriş yapma işlemi
    } else {
      signInWithEmailAndPassword(auth, email, password)
        // .then(() => { navigate("/feed") })
        .catch((err) => toast.error(err.code))
    }

    e.target[0].value = "";
    e.target[1].value = "";
  }
  //şifre sıfırlama
  const handleReset = () => {
    if (email.trim() != "") {
      sendPasswordResetEmail(auth, email)
        .then(() => toast.info("Lütfen mailinizi kontrol edin"))
        .catch((err) => toast.error(err.code))
    }

  };

  const handleGoogle = ()=>{
    signInWithRedirect(auth, provider)
    .catch((err) => toast.error(err.code))
    
  }

  


  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-black w-full max-w-md text-white flex flex-col gap-5 p-6 md:p-10 rounded-xl">
        <div className="flex justify-center">
          <img className=" cursor-pointer h-20 md:h-32" src="/xLogoRemove.png" alt="Logo" />
        </div>

        <h1 className="text-center font-extrabold text-2xl md:text-3xl">
          Twitter'a Giriş Yap
        </h1>

        <div onClick={handleGoogle} className="flex items-center cursor-pointer  hover:bg-slate-200 bg-white text-black py-2 px-4 md:px-6 rounded-full">
          <img className="h-10 md:h-12" src="/GoogleLogo.png" alt="Google Logo" />
          <p className="whitespace-nowrap ml-2">Google ile Giriş Yap</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <label className="mb-2">E-mail</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md py-2 px-4 text-black"
            type="text"
            placeholder="E-mail adresinizi girin"
          />

          <label className="mb-2 mt-2">Password</label>
          <input
            className="rounded-md py-2 px-4 text-black"
            type="password"
            placeholder="Şifrenizi girin"
          />

          <button className="bg-white text-black rounded-md mt-6 py-2 hover:bg-slate-200">
            {
              !signUp ? "Giriş Yap" : "Kayıt Ol"
            }
          </button>
        </form>

        <p className="flex flex-col justify-center text-center mt-4">
          <span>Hala bir Hesabınız Yok mu?</span>
          <button onClick={() => setSignUp(!signUp)} className="text-blue-500 hover:underline" type='button'>
            {signUp ? "Giriş yap" : "Kaydol"}
          </button>
        </p>
        {!signUp && <button type='button' onClick={handleReset}>Şifremi Unuttum</button>}
      </div>
    </div>
  );
};

export default Auth;
