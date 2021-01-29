import React, { useState, useEffect } from 'react';
import { storageRef } from '../../../../firebase';
import firebase from 'firebase';
import './ImageUploader.css';

function ImageUploader({ shouldUploadImgs, setImageURLs }) {
  const [images, setImages] = useState([]);           // image files.
  const [highlight, setHighlight] = useState(false);  // highlight drag & drop area.

  const handleFileChange = ({ target }) => {
    const files = Array.from(target.files);

    let photosArr = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        photosArr.push({
          name: file.name,
          type: file.type, 
          size: file.size,
          src: reader.result, 
          file: file,
        })
        setImages([...images, ...photosArr]);
      });

      
    });
  }

  console.log(images);

  const handleDelete = ({ target }) => {
    const targetIndex = Number(target.parentElement.dataset.imgindex);

    setImages([...images.slice(0, targetIndex), ...images.slice(targetIndex + 1)]);
  }

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(false);
  }

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const dt = event.dataTransfer;
    handleFileChange({ target: { files: dt.files } });

    setHighlight(false);
  }

  useEffect(() => {
    if(shouldUploadImgs){

      images.forEach(image => {
        const file = image.file;
        const fileName = `${new Date()} - ${image.name}`;
        const metadata = { contentType: image.type, };
        
        const uploadTask = storageRef.child(fileName).put(file, metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //   case firebase.storage.TaskState.PAUSED: // or 'paused'
            //     console.log('Upload is paused');
            //     break;
            //   case firebase.storage.TaskState.RUNNING: // or 'running'
            //     console.log('Upload is running');
            //     break;
            // }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
            });
          }
        );
      });
      
    }
  }, [shouldUploadImgs])


  return (
    <div className='imageUploader'>
      <div className="imageUploader__progress modal show" data-bs-backdrop="static">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h1>Progress</h1>
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={`imageUploader__dropArea ${highlight && 'highlight'}`} 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className='imageUploader__fileUpload' htmlFor="images">DRAG & DROP</label>
        <input className="d-none" type="file" id="images" multiple onChange={handleFileChange} />
      </div>

      <div className="imageUploader__image-previews">
        {images.length > 0 && images.map((image, idx) => (
          <div className="imageUploader__image" key={idx} data-imgindex={idx}>
            <span onClick={handleDelete}>&times;</span>
            <img src={image.src} alt={image.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader
