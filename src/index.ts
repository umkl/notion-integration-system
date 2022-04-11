// import { Client } from "@notionhq/client";
import { getAllPagesFromDatabase } from "./services/notion";
// import { getAllPagesFromDatabase } from "./services/notion";

require("dotenv").config();

// (async () => {
//   const res = await getAllPagesFromDatabase(
//     process.env.NOTION_ACTION_DATABASE_ID!
//   );
  
//   // res.results.forEach(x => console.log(x.object));
//   // console.log();
// })();

// const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
// console.log(process.env.NOTION_ACCESS_TOKEN);

// getAllPagesFromDatabase(process.env.NOTION_ACTION_DATABASE_ID!)

(async () => {
    const res = await fetch("https://api.notion.com/v1/pages/b2120391-c195-44da-b28b-6787b631bbbf",{
        headers: {
            'Notion-Version': '2022-02-22',
            'Authorization': `Bearer ${process.env.NOTION_ACCESS_TOKEN}`
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        },
        method: "GET",
        // body: JSON.stringify({a: 1, b: 2})
    })
        

    const data = await res.json()

})()

// (async () => {
//   // const databaseId = '668d797c-76fa-4934-9b05-ad288df2d136';
//   const databaseId = process.env.NOTION_ACTION_DATABASE_ID;
//   // const response = await notion.databases.retrieve({database_id: databaseId!})
//   const response = await notion.databases.query({
//     database_id: databaseId!,
//     filter: {
//       or: [
     
//       ],
//     },
//     sorts: [
      
//     ],
//   });
//   console.log(response);
//   // console.log(response.object);
// })();