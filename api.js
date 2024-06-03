const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3080;

app.use(cors());

async function readPDFAsBase64(filePath) {
  try {
      // Read the file
      const data = await fs.readFile(filePath);

      // Convert the file data to a base64 string
      const base64 = data.toString('base64');
      return base64;
  } catch (err) {
      console.error('Error reading file:', err);
      throw err; // Rethrow the error to be handled by the caller
  }
}

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
      const base64Data = await readPDFAsBase64(filePath);
      res.json({ Document: base64Data });
  } catch (err) {
      res.status(500).json({ error: 'Error reading file' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
