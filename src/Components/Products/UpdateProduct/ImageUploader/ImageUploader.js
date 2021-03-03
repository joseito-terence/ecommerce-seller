import React, { useState, useEffect } from 'react';
import UploaderTask from './UploaderTask';

function ImageUploader({ shouldUploadImgs, setShouldUploadImgs, dispatchImageURLs, isDisabled, state, setState }) {
  const [images, setImages] = useState([]);           // image files.
  const [highlight, setHighlight] = useState(false);  // highlight drag & drop area.
  const [downloadURLs, setDownloadURLs] = useState([]); 

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

  const handleDelete = ({ target }) => {
    const targetIndex = Number(target.parentElement.dataset.imgindex);

    setImages([...images.slice(0, targetIndex), ...images.slice(targetIndex + 1)]);
  }

  const markImageForDelete = index => {        // Function to handle deletion of existing images.
    setState({                                                      
      ...state,
      deleteQueue: [...state.deleteQueue, state.images[index]],                      // add it's url to the delete queue
      images: [...state.images.slice(0, index), ...state.images.slice(index + 1)],   // and remove it from the state.
    })
  }

  // Following functions are for the custom image drop area.
  const handleDrag = event => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(true);
  }

  const handleDragLeave = event => {
    event.preventDefault();
    event.stopPropagation();
    setHighlight(false);
  }

  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();

    const dt = event.dataTransfer;
    handleFileChange({ target: { files: dt.files } });

    setHighlight(false);
  }
  // --------------------------------------------------------


  const getDownloadURL = url => {
    // function to get the downloadUrl from the UploaderTask component.
    setDownloadURLs(downloadURLs => [...downloadURLs, url ]);
  }
 
  useEffect(() => {
    if(shouldUploadImgs && downloadURLs.length === images.length){       /* && images.length !== 0*/
      setShouldUploadImgs(false);
      setImages([]);
      dispatchImageURLs(downloadURLs);
      setDownloadURLs([]);
    }
  }, [shouldUploadImgs, downloadURLs])

  return (
    <div className='imageUploader'>
      <div 
        className={`imageUploader__dropArea ${highlight && 'highlight'} ${isDisabled && 'imageUploader__dropArea-disabled'}`} 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className='imageUploader__fileUpload' htmlFor="updaterImages">DRAG &amp; DROP</label>
        <input 
          className="d-none" 
          type="file" 
          id="updaterImages" 
          accept='image/*' 
          multiple 
          onChange={handleFileChange} 
          disabled={isDisabled} 
        />
      </div>

      {/* IMAGE PREVIEWS */}
      <div className="imageUploader__image-previews">
        {/* Images from the db. */
         state.images.map((image, idx) => (
          <div className="uploaderTask false" key={idx}>
            <span onClick={() => markImageForDelete(idx)}>&times;</span>
            <img src={image} alt={`image ${idx}`} />
          </div>
        ))}
        {/* New images for upload */
         images.length > 0 && images.map((image, idx) => (
          <UploaderTask 
            key={idx}
            id={idx}
            handleDelete={handleDelete}
            image={image}
            shouldUploadImgs={shouldUploadImgs}
            getDownloadURL={getDownloadURL}
          />
        ))}
      </div>
      {(shouldUploadImgs && !images) && <p className="text-danger">
        *Images Required
      </p>}
    </div>
  )
}

export default ImageUploader
