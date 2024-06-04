// src/ImageUpload.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../ImageUpload.css'; // Import CSS for styling
import { Button } from '@mui/material';

const ImageUpload2 = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [filename, setFilename] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const loadFiles = async() =>{
    try {
      if (preview == null){
      const response = await fetch('http://localhost:3081/files/');
      const data = await response.json();
      setFiles(data);
      console.log(files);
      }
    }catch(err){}
  }

  useState(async()=>{
    await loadFiles();
  },[]);

  const fetchImageFromServer = async () => {
    try {
      if (preview == null){
      const response = await fetch('http://localhost:3081/fetch-image/');
      const data = await response.json();
      setImage(data.Document);
      setFilename(data.id);
      setPreview(`data:image/jpeg;base64,${data.Document}`);
      }
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:3081/download-file';
    link.setAttribute('download', 'invoice.pdf'); // Set the download attribute with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseEnter = () => {
    fetchImageFromServer();
    setModalIsOpen(true);
  };

  const handleMouseLeave = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="image-upload-container" >
      <Button onMouseEnter={handleMouseEnter}  onClick={handleDownload} variant='contained' autoCapitalize={false} onMouseOut={handleMouseLeave} onMouseLeave={handleMouseLeave} style={{margin:'10px'}} >
        Fetch Pdf
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Image Preview"
        className="modal"
        overlayClassName="overlay"
        style={{
          content: {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            backdropFilter: 'blur(10px)', // Blur effect
            WebkitBackdropFilter: 'blur(10px)', // Blur effect for Safari
            borderRadius: '10px',
            padding: '20px',
      top: '50%',
      transform: 'translate(-100%, -50%)',
          },}}
      >

        {preview && (
          <img src={preview} alt={filename} className="image-preview" width='100%' height='110%'/>
        )}
        
      </Modal>
    </div>
  );
};

export default ImageUpload2;
