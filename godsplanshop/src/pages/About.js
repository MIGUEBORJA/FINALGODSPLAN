import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

function About(){
  
  const images =[
    {
      original: 'https://picsum.photos/id/1018/1000/600',
      thumbnail: 'https://picsum.photos/id/1018/250/150'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600',
      thumbnail: 'https://picsum.photos/id/1015/250/150'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600',
      thumbnail: 'https://picsum.photos/id/1019/250/150'
    }
  ]

  return(
    <div style={{width: "60vw", margin: "auto", paddingTop: "3vw"}}>
      <ImageGallery items={images}
      />
    </div>
  )
}

export default About;