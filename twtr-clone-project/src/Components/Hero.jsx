import React, { useEffect } from 'react'
import TweetForm from './TweetForm'
import { collection, onSnapshot,query,orderBy } from 'firebase/firestore'
import { db } from '../Firebase/config'
import { useState } from 'react'
import Loading from './Loading'
import Tweet from './Tweet'



const Hero = () => {
  
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db,"tweets")

  useEffect(()=>{
    //filtreleme ayarları
    const queryOpt = query(tweetsCol,orderBy("createdAt","desc"))
    //değişimi izleme fonk.
    onSnapshot(queryOpt,(snapshot)=>{
     const liveTweets = [];
     snapshot.forEach((doc)=> liveTweets.push({...doc.data(), id:doc.id}))
     setTweets(liveTweets)
     
    })
  },[])
  return (
    <main className='col-span-4 md:col-span-3 border m-2 p-2'>
      <header>Anasayfa</header>
      <TweetForm/>
      <div>
        {
          !tweets ? <Loading/> : tweets?.map((tweet)=>(
            <Tweet key={tweet.id} tweet={tweet}/>
          ))
        }
      </div>
      
    </main>
  )
}

export default Hero