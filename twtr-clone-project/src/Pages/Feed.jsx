import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/config';
import Nav from '../Components/nav';
import Aside from "../Components/Aside"
import Hero from "../Components/Hero"

const Feed = () => {


  return (
    <div className=' bg-black   text-white min-h-screen overflow-y-hidden'>
      
      <div className='grid grid-cols-5 '>

        <Nav/>

        <Hero/>

        <Aside/>

      </div>
     
    </div>
  )
}

export default Feed;










