// import { fetchFromJournal } from "./controllers/notion";
// // fetchFromJournal();

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

(async () => {
  const databaseId = process.env.NOTION_ACTION_DATABASE_ID;
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();
