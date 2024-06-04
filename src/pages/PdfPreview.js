import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
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
    fetch('http://localhost:3080/fetch-data') // Replace with your Node.js server endpoint
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

      <Modal show={showModal} handleClose={handleClose} docid={currentdocid}>
        {pdfData && (
          <iframe
            src={`data:application/jpg;base64,${pdfData}`}
            width="100%"
            height="500px"
            title="Preview"
          />
        )}
      </Modal>
    </div>
  );
}

export default PdfPreview;
