const express = require('express');
const axios = require('axios');
const app = express();
const port = 3080;
const morgan = require('morgan');
// Middleware to parse JSON bodies
app.use(express.json());

app.use(morgan('combined'));

// Common headers
const commonHeaders = {
  'authority': 'arcticom.invokeinc.com',
  'accept': 'application/json',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,ta;q=0.7',
  'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE3NDkxMzgwLCJleHAiOjE3MTc1Nzc3ODAsImp0aSI6IjEwOWQ0ZDdhLThjZWQtNGVkMy1hNzE4LTJhNzRlMjkzZmNjMCJ9.Jgdq2HH6kjQSJOP-sLPD47LL_xiDzFIA-uXvUDuvmrc',
  'cookie': 'JWT=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE3NDkxMzgwLCJleHAiOjE3MTc1Nzc3ODAsImp0aSI6IjEwOWQ0ZDdhLThjZWQtNGVkMy1hNzE4LTJhNzRlMjkzZmNjMCJ9.Jgdq2HH6kjQSJOP-sLPD47LL_xiDzFIA-uXvUDuvmrc; ID=1',
  'referer': 'https://arcticom.invokeinc.com/applications/35',
  'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
  'sec-ch-ua-mobile': '?1',
  'sec-ch-ua-platform': '"Android"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
  'x-csrf-token': '9GMvKh6+Q95PIfzrOG4TjGXtHrECVZIYRpI34mtrTZBV0jGehl28bldnKBEzUhP2tvEfTawWNwYnRr6il52n6Q=='
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



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
