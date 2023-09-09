import { signOut } from 'firebase/auth';
import { navSections } from "../Utils/Constant"
import { auth } from '../Firebase/config';

const Nav = () => {
  return (
    <nav className="flex  flex-col justify-between h-[100vh]">
      {/* navigasyon linkleri */}
      <div className='gap-5 p-4'>
        <img className=" w-[80px] cursor-pointer mb-10 " src="/xLogoRemove.png" />
        <div className="flex flex-wrap items-center gap-2 p-2 mb-10">
        <img
          src={
            auth?.currentUser?.photoURL
              ? auth.currentUser.photoURL
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
          }
          className="rounded-full w-14"
        />

        <div className="flex flex-col gap-2 ">
          <span>{auth?.currentUser?.displayName}</span>
        </div>
      </div>
        {navSections.map((sec, i) => (
          <div
            className="flex items-center gap-3 text-lg p-4 cursor-pointer transition hover:bg-gray-900"
            key={i}
          >
            {sec.icon}
            <span className=' ml-2'>{sec.title}</span>
          </div>
        ))}
      </div>

      {/* kullanıcı bilgileri */}
      
      <button
onClick={() => signOut(auth) }
className="mx-2 text-red-700 mb-4 p-2 text-left"
>
Çıkış Yap
</button>
    </nav>
  );
};

export default Nav;

