import React from 'react'
import Slider from './components/slider'
import slidevideo from "./components/ravi.mp4";
const App = () => {



 const slides=[
  'https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small_2x/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg',

  'https://images.pexels.com/photos/585752/pexels-photo-585752.jpeg?cs=srgb&dl=pexels-ifreestock-585752.jpg&fm=jpg',

  'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg',

  'https://cdn.wallpapersafari.com/11/64/xU9nlb.jpg'
  ];
  return (
    <>
    <h1>Slider technique</h1>
    <div className='max-w-lg mx-auto my-5'>

    <Slider autoslide={true}>
    {[
      ...slides.map((s,i)=>(
        <img key={i} src={s}/>
      )),
      <video src={slidevideo} autoPlay muted loop></video>
    ]}
    </Slider>
    </div>

    <div>
      <button>modal</button>
    </div>
    </>
  )
}

export default App