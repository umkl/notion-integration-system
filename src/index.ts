// import { fetchFromJournal } from "./controllers/notion";
// // fetchFromJournal();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

(async () => {
  const databaseId = "044b33e9-fda4-4c9b-b943-e0750fa4931a";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();
