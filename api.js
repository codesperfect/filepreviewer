const express = require('express');
const axios = require('axios');
const app = express();
const port = 3080;
const morgan = require('morgan');
// Middleware to parse JSON bodies
app.use(express.json());
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(morgan('combined'));
app.use(cors());

// Common headers
const commonHeaders =  {
  'authority': 'arcticom.invokeinc.com',
  'accept': 'application/json',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE3NTc5NDU4LCJleHAiOjE3MTc2NjU4NTgsImp0aSI6ImY1NDQzNDA1LWQ4ZWUtNDlkZS1hOTNlLTlkMTU2Y2I4MGFhMSJ9.Q_Ataf7_NYjhbGFXeT_fPIvwmUxcrV1WXrLUCUChhDI',
  'cookie': 'JWT=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE3NTc5NDU4LCJleHAiOjE3MTc2NjU4NTgsImp0aSI6ImY1NDQzNDA1LWQ4ZWUtNDlkZS1hOTNlLTlkMTU2Y2I4MGFhMSJ9.Q_Ataf7_NYjhbGFXeT_fPIvwmUxcrV1WXrLUCUChhDI; ID=1',
  'if-none-match': 'W/"a24ca54bbd1ea01e846544db1389415d"',
  'referer': 'https://arcticom.invokeinc.com/applications/1',
  'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'macOS',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
  'x-csrf-token': '53yqOI4o9WjUarV/6OBDa0T2hZI39pur8xDF+zahcUXvLBJqq2RjnauFNFeSB2Os+Jaz6D1Ninaxzy/dJs7UAA=='
};

// Base URL
const baseURL = 'https://arcticom.invokeinc.com/';

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to handle call_kpi_data request
app.get('/api/arcticom/call_kpi_data', async (req, res) => {
    console.log('call kpi data')
  try {
    const response = await axios.get(`${baseURL}/api/arcticom/call_kpi_data`, {
      params: {
        application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
        ServiceArea: 'ALL',
        customer: 'ALL',
        userdef1a: 'ALL',
        userdef2a: 'ALL',
        locuserdef1a: 'ALL',
        locuserdef2a: 'ALL',
        addresscode: 'ALL',
        userdef3a: 'ALL',
        userdef4a: 'ALL',
        ExcludeCompletedCallsWithOpenInvoice: 0
      },
      headers: commonHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// New route to handle service_area_list request
app.get('/api/arcticom/service_area_list', async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/api/arcticom/service_area_list`, {
      params: {
        application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
      },
      headers: commonHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making request:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/arcticom/ac_manager_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/ac_manager_list`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });


app.get('/api/arcticom/expeditor_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/expeditor_list`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/api/activities', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/activities`, {
        params: {
          page: 1,
          'application_uuids[]': '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/api/arcticom/user_call_history_by_appt', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/user_call_history_by_appt`, {
        params: {
          UserDef1a: 'ALL',
          UserDef2a: 'ALL',
          status: 'FOLLOWUP',
          Service_Area: 'ALL',
          CUSTNMBR: 'ALL',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
          ExcludeCompletedCallsWithOpenInvoice: 0
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/company_configs/show', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/company_configs/show`, {
        params: {
          company_id: 1,
          table_id: '863763f2-9877-5713-8116-99932867411e'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  // Page 2

app.get('/api/arcticom/user_call_history_by_appt', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/user_call_history_by_appt`, {
        params: {
          UserDef1a: 'ALL',
          UserDef2a: 'ALL',
          status: 'FOLLOWUP',
          Service_Area: 'ALL',
          CUSTNMBR: 'ALL',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
          ExcludeCompletedCallsWithOpenInvoice: 0
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  
  // Page 3

app.get('/api/arcticom/service_call_cost', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/service_call_cost`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
          ServiceCallID: '240603-0008'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/arcticom/service_call_appt', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/service_call_appt`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
          Service_Call_ID: '240603-0008'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/arcticom/user_service_call_history', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/user_service_call_history`, {
        params: {
          Customer_Number: 'ALL',
          Address_Code: 'ALL',
          Service_Call_ID: '240603-0008',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/arcticom/service_area_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/service_area_list`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/arcticom/expeditor_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/expeditor_list`, {
        params: {
          userDef: 'ALL',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/arcticom/ac_manager_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/ac_manager_list`, {
        params: {
          userDef: 'ALL',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
       

app.get('/api/arcticom/call_notes_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/call_notes_list`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069',
          Service_Call_ID: '240603-0008'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/api/arcticom/user_service_call_history', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/user_service_call_history`, {
        params: {
          Customer_Number: 'ALL',
          Address_Code: 'ALL',
          Service_Call_ID: '240603-0008',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/arcticom/technician_info_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/technician_info_list`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/arcticom/servicecall_1a', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/servicecall_1a`, {
        params: {
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/arcticom/service_call_res_notes', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/service_call_res_notes`, {
        params: {
          Service_Call_ID: '240603-0008',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/arcticom/call_attachment_list', async (req, res) => {
    try {
      const response = await axios.get(`${baseURL}/api/arcticom/call_attachment_list`, {
        params: {
          ServiceCallID: '240603-0008',
          application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
        },
        headers: commonHeaders
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
});
  

app.get('/api/arcticom/service_call_appt', async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/api/arcticom/service_call_appt`, {
      params: {
        Service_Call_ID: '240603-0008',
        application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
      },
      headers: commonHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/arcticom/call_pricing_matrix_data', async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/api/arcticom/call_pricing_matrix_data`, {
      params: {
        ServiceCallID: '240603-0008',
        application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
      },
      headers: commonHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making request:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Download

app.get('/api/arcticom/call_attachment_doc_download', async (req, res) => {
  console.log(req.query);
  try {
    const response = await axios.get(`${baseURL}/api/arcticom/call_attachment_doc_download`, {
      params: {
        DocumentID: req.query.DocumentID,
        application_uuid: '98c75d33-86f9-44ac-83d9-b28ed490f069'
      },
      headers: commonHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making request:', error);
    res.status(500).send('Internal Server Error');
  }
});

const fileToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
          if (err) {
              return reject(err);
          }
          const base64 = Buffer.from(data).toString('base64');
          resolve(base64);
      });
  });
};

app.get('/fetch-image', async (req, res) => {
  try {
      const filePath = path.join(__dirname, 'invoice.pdf'); // Replace with your image path
      console.log(filePath)
      const base64Image = await fileToBase64(filePath);
      const fileName = path.basename(filePath);
      res.json({ Document: base64Image, id: fileName });
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch the image' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


