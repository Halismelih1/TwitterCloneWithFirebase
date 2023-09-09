import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../Firebase/config';
import { BsCardImage } from 'react-icons/bs';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {toast} from "react-toastify"


const TweetForm = () => {


    const tweetCollections = collection(db,"tweets")

    // resmi yükler ve url'ini döndürür
  const uploadImage = async (image) => {
    if (!image) return null;

    // sotage'da dosya yer ayarlama
    const storageRef = ref(
      storage,
      `${new Date().getTime()}${image.name}`
    );

    // dosyayı yükleme
    const url = await uploadBytes(storageRef, image)
      // yüklemenin bittiği anda resmin url'ne erişme
      .then((response) => getDownloadURL(response.ref));

    //fonksiyonun çağrıldığı yere url gönderme
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // yazı varmı kontrol etme
    if (!textContent) {
      toast.info('Tweet içeriği ekleyin..');
      return;
    }

    // resmi stoage'ekleyip url'ne erişir
    const url = await uploadImage(imageContent);

    // kolleksiyona döküman ekler
    addDoc(tweetCollections, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        picture: auth.currentUser.photoURL
          ? auth.currentUser.photoURL
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
      },
      likes: [],
    });

    // inputları temizleme
    e.target[0].value = '';
    e.target[1].value = null;
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-2 border-gray-900"
    >
      <img
        className="rounded-full h-[50px]"
        src={
          auth?.currentUser?.photoURL
            ? auth.currentUser.photoURL
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
        }
      />

      <div className="w-full">
        <input
          className="w-full my-2 text-gray-400 outline-none bg-black placeholder:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />

        <div className="flex justify-between h-[45px]">
          <div className=" hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label className="cursor-pointer" htmlFor="file-inp">
              <BsCardImage />
            </label>

            <input className="hidden" id="file-inp" type="file" />
          </div>

          <button className="bg-blue-600 px-4  rounded-full transition hover:bg-blue-500">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;