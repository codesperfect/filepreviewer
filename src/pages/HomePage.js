// fetch("https://arcticomaria.invokeinc.com/api/arcticom/call_attachment_list?ServiceCallID=230531-0054&application_uuid=a068ed87-b4ad-47de-b350-a25b77834f10&session_id=43", {
//   "headers": ,
//   "body": null,
//   "method": "GET"
// });

import { useEffect, useState } from "react";


const COOKIES = {
    "accept": "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ta;q=0.7",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE2ODM5ODUxLCJleHAiOjE3MTY5MjYyNTEsImp0aSI6IjBkNDEyZjU2LTcxYzEtNDJhYi04MTkwLTA5MTIwNzExYjQwOCJ9._DmyMWWInKe1L6XFDhwLB5KBdi2ka8l62vkKWRoNk8U",
    "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "yCkSLXTmZ9Gdg7jfhUOaHq3/xg2tz/A3HYaLVyuaElfoyG3/npHw0QI90IA4iS5gdWvTW8s5MFKeaJEX6kaA/Q==",
    "cookie": "JWT=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzE2ODM5ODUxLCJleHAiOjE3MTY5MjYyNTEsImp0aSI6IjBkNDEyZjU2LTcxYzEtNDJhYi04MTkwLTA5MTIwNzExYjQwOCJ9._DmyMWWInKe1L6XFDhwLB5KBdi2ka8l62vkKWRoNk8U; ID=3; SESSION_ID=43",
    "Referer": "https://arcticomaria.invokeinc.com/applications/40/activities/230531-0054",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }


const HomePage = () =>{
    const [files,setFiles] = useState([]);

    useEffect(()=>{

        fetch("https://arcticomaria.invokeinc.com/api/arcticom/call_attachment_list?ServiceCallID=230531-0054&application_uuid=a068ed87-b4ad-47de-b350-a25b77834f10&session_id=43",{
            "headers":COOKIES,
            "body": null,
            "method": "GET"
        }).then(async(response)=>{
            setFiles(await response.json());
          }).catch((error)=>console.log(error));
        
    },[]);

    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

export default HomePage;