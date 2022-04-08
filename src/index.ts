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

getAllPagesFromDatabase(process.env.NOTION_ACTION_DATABASE_ID!)


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