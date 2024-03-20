import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

function About(){
  
  const images =[
    {
      original: '../img/bannerslider.jpeg',
      thumbnail: '../img/bannerslider.jpeg'
    },
    {
      original: '../img/bannerslider3.jpeg',
      thumbnail: '../img/bannerslider3.jpeg'
    },
    {
      original: '../img/bannerslider2.jpeg',
      thumbnail: '../img/bannerslider2.jpeg'
    }
  ]

  return(
    <div style={{width: "100%", margin: "auto",}}>
      <ImageGallery items={images}
      />
    </div>
  )
}

export default About;