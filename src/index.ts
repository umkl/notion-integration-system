// import { fetchFromJournal } from "./controllers/notion";
// fetchFromJournal();


require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

(async ()=>{
  const res = await notion.databases.retrieve()
  console.log(res)//dsd
})