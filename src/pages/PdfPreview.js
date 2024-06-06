import React, { useEffect, useState } from 'react';
// import Modal from '../Modal';
import Modal from 'react-modal';
import Spinner from 'react-bootstrap/Spinner';
// import { Modal, Button } from 'react-bootstrap';
// import FilePreviewer from 'react-file-previewer';
import { Button, CircularProgress, LinearProgress } from '@mui/material';

const PdfPreview = () => {
  const [pdfData, setPdfData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadModel, setloadModel] = useState(false);
  const [documents,setDocuments] = useState([]);
  const [currentdocid,setCurrentDocid] = useState(null);
  const [currentDocId, setCurrentDocId] = useState('');
 
  useEffect(() => {
    setDocuments(["24101"]);
    // fetch('http://localhost:3080/fetch-data/24101') // Replace with your Node.js server endpoint
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.Document) {
    //       setPdfData(data.Document);
    //     }
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleShow = (docid) => {
    setloadModel(true);
    fetch('http://localhost:3080/api/arcticom/call_attachment_doc_download?DocumentID=73319&application_uuid=065b7662-3927-4134-820c-b4c9a3f0bab4') // Replace with your Node.js server endpoint
      .then(response => response.json())
      .then(data => {
        if (data.Document) {
          setPdfData(data.Document);
          setCurrentDocid(docid);
          setloadModel(false);
          setShowModal(true);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
   
  }
  const handleClose = () => setShowModal(false);
  
  return (
    <div>
    <h1 style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'5%'}}>Files to Preview</h1>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        
         {loadModel && (<>
         <CircularProgress disableShrink />
         <h3>Loading File</h3>
         </>)}

    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'5%'}}>    
        {documents.map(docs=>(
            <Button variant="outlined" 
            onClick={()=>handleShow(docs)}
            // onMouseEnter={handleShow(docs)}
            // onMouseLeave={handleClose()}
            style={{margin:'10px'}}>
                Show File
            </Button>
        ))}
     </div>

     

      <Modal
          isOpen={showModal}
          contentLabel="Image Preview"
          className="modal"
          overlayClassName="overlay"
          style={{
            content: {
              width: 'auto',
              height: 'auto',
             
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
        {pdfData && (
            <iframe
              src={`data:application/pdf;base64,${pdfData}`}
              width="150%"
              height="500px"
              title="Preview"
            />
          )}
      </Modal>
    </div>
  );
}

export default PdfPreview;
