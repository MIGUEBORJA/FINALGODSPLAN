import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import '../styles/About.css';

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
    <div  className='carroussel'>
      <ImageGallery items={images} className='content'
      />
    </div>
  )
}

export default About;