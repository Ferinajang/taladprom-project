import React, { useEffect,useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
      console.log(props.detail.imagesPD1);
      if (props.detail.imagesPD1 && props.detail.imagesPD1.length > 0) {
        let images = [];
        props.detail.imagesPD1 &&
          props.detail.imagesPD1.map((item) => {
            images.push({
              original: props.detail.imagesPD1,
              thumbnail:props.detail.imagesPD1,
            });
          });
        setImages(images);
      }
    });

 
   
    
  return (
    <div>
        <ImageGallery items={Images}/>
    </div>
  )
}

export default ProductImage