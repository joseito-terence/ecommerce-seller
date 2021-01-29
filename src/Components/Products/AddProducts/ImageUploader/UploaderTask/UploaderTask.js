import React, { useState, useEffect } from 'react';
import { storageRef } from '../../../../../firebase';
import firebase from 'firebase';
import './UploadTask.css';

function UploaderTask({ id, handleDelete, image, shouldUploadImgs, getDownloadURL }) {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if(shouldUploadImgs){
      const file = image.file;
      const fileName = `${new Date()} - ${image.name}`;
      const metadata = { contentType: image.type, };
      
      const uploadTask = storageRef.child(fileName).put(file, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let prog = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log('Upload is ' + prog + '% done');
          setProgress(prog);
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
              console.log("User doesn't have permission to access the object");
              break;

            case 'storage/canceled':
              console.log("User canceled the upload");
              break;

            case 'storage/unknown':
            default: 
              console.log("Unknown error occurred, inspect error.serverResponse");
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            getDownloadURL(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  }, [shouldUploadImgs])


  return (
    <div className={`uploaderTask ${shouldUploadImgs && 'uploaderTask-uploading'}`} data-imgindex={id}>
      
        {shouldUploadImgs ? 
          <div className="progress">
            <div 
              className="progress-bar  progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              aria-valuenow={progress} 
              aria-valuemin="0" 
              aria-valuemax="100" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          :
          <span onClick={handleDelete}>&times;</span>
        }
        
      <img src={image.src} alt={image.name} />
    </div>
  )
}

export default UploaderTask
