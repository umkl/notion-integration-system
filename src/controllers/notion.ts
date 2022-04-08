// import { ClientRequest } from "http";
// import { NotionIntegration } from "../repository/NotionIntegrations/NotionIntegration";

// require("dotenv").config();
// import https from "https";
// import axios from "axios";
// import { Client } from "@notionhq/client";

// export function fetchFromJournal() {
//   let token = process.env.NOTION_ACCESS_TOKEN;
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const bodyParameters = {
//     key: "value",
//   };

//   console.log(process.env)

//   axios
//     .get("https://api.notion.com/v1/databases", bodyParameters, config)
//     .then((response: { data: { url: any; explanation: any } }) => {
//       //   console.log(response.data.url);
//       //   console.log(response.data.explanation);
//     //   console.log(response.data);
//     })
//     .catch((error: any) => {
//     //   console.log(error);
//     });

//   // https.get('https://api.notion.com/v1/databases',(resp:any) =>{
//   //     let data = '';
//   //     //a chunk of data has been received
//   //     resp.on('data',(chunk:any)=>{
//   //         data += chunk;
//   //     });
//   //     //the whole response has been received. printing the result
//   //     resp.on('end', () => {
//   //         // console.log(JSON.parse(data).explanation);
//   //       });
//   // })
// }

// export const fetchAllDb = async (client: typeof Client) => {};

// export const fetchFromJournal = async (client: typeof Client) => {
//   const notion = new Client({
//     auth: process.env.NOTION_ACCESS_TOKEN,
//   });
//   const database_id = process.env.NOTION_JOURNAL_DATABASE_ID;
//   const payload = {
//     path: `databases/${database_id}/query`,
//     method: "POST",
//   };

//   const { results } = await notion.request(payload);

//   console.log(database_id);
//   console.log(results);
// };
