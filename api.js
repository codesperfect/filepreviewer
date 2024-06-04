const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { fromPath } = require('pdf2pic');
const { PDFDocument } = require('pdf-lib');
const sharp = require('sharp');
const puppeteer = require('puppeteer');
const app = express();
const port = 3080;
const path = require('path');

const { createCanvas, loadImage } = require('canvas');

const options = {
	density: 100,
	saveFilename: 'untitled',
	format: 'png',
	width: 600,
	height: 600,
};
const convert = fromPath('file.pdf', options);
const pageToConvertAsImage = 1;

app.use(cors());


const readPdfAndConvertFirstPageToImage = async (pdfPath) => {
  try {
    const options = {
      density: 100, // output pixels per inch
      saveFilename: 'untitled', // output file name
      savePath: './output', // output file location
      format: 'png', // output file format
      width: 600, // output width
      height: 600 // output height
    };

    const storeAsImage = fromPath(pdfPath, options);
    const pageToConvertAsImage = 1;

    const response = await storeAsImage(pageToConvertAsImage);

    if (response ) {
      // Read the generated image file
      const imagePath = path.resolve(response.path);
      const imageData = await fs.readFile(imagePath);

      // Convert image data to base64
      const base64Image = imageData.toString('base64');
      return base64Image;
    }  else {
      throw new Error('Failed to convert PDF to image');
    }
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    throw error;
  }
};

app.get('/fetch-data/:docid', async (req, res) => {
  try {
    var docid = req.params.docid;
    const response = await fetch("https://arcticomaria.invokeinc.com/api/arcticom/call_attachment_doc_download?DocumentID="+docid+"&application_uuid=a068ed87-b4ad-47de-b350-a25b77834f10&session_id=43", {
        "headers": {
          "accept": "application/json",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ta;q=0.7",
          "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE2ODM5ODUxLCJleHAiOjE3MTY5MjYyNTEsImp0aSI6IjBkNDEyZjU2LTcxYzEtNDJhYi04MTkwLTA5MTIwNzExYjQwOCJ9._DmyMWWInKe1L6XFDhwLB5KBdi2ka8l62vkKWRoNk8U",
          "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrf-token": "Qq7DibUhL4pNelqR5//MPyxCzZCxcDYKrn01O0ArbYJawxInOjsQ21qECfoqE97E/fr11NQXGBX2KY4MczR3Qw=="
        },
        "referrer": "https://arcticomaria.invokeinc.com/applications/40/activities/230531-0054",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/fetch-data/', async (req, res) => {
  const docId = req.params.docid;
  const filePath = `file.pdf`; // Construct the file path based on the document ID

  try {
      const base64Data = await getFirstPageAsImage(filePath);
      res.json({ Document: base64Data });
  } catch (err) {
      res.status(500).json({ error: 'Error reading file' });
  }
});

app.get('/fetch-image/', async (req, res) => {
  const docId = req.params.docid;
  const filePath = `invoice.pdf`; // Construct the file path based on the document ID

  try {
      const base64Data = await readPdfAndConvertFirstPageToImage(filePath);
      res.json({ Document: base64Data , id:'file.pdf'});
  } catch (err) {
      res.status(500).json({ error: 'Error reading file' });
  }
});

const files = [{name:'invoice.pdf',type:'pdf',id:0},{name:'image.jpg',type:'jpg',id:1},{name:'image.png',type:'png',id:2}]

app.get('/download-file/:id', (req, res) => {
  var fileid = req.params.id;
  const filePath = path.join(__dirname, files[fileid].name); // Adjust the path to your file
  res.download(filePath, files[fileid].name, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

app.get('/files', async(req,res)=>{
  res.json(files);
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
