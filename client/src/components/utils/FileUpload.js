import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  
  const onDelete =(image)=>{
      const currentIndex=Images.indexOf(image);
      let newImage = [...Images]
      newImage.splice(currentIndex,1)
      setImages(newImage)
      props.refreshFunction(newImage)
      console.log("Ff");
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    Axios.post("/api/product/uploadImage", formData, config).then(
      (response) => {
        if (response.data.success) {
          setImages([...Images, response.data.image]);
          props.refreshFunction([...Images, response.data.image]);
        } else {
          alert("Failed to save the Image in Server");
        }
      }
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          widt: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
          {Images.map((image,index)=>(
              <div onClick={()=>onDelete(image)}>
                  <img style={{minWidth:'300px', width:'300px' , height:'240px'}} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}></img>

              </div>
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
