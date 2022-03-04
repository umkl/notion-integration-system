// import { fetchFromJournal } from "./controllers/notion";
// fetchFromJournal();
import { Client } from "@notionhq/client";

require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

(async () => {
  const databaseId = process.env.NOTION_ACTION_DATABASE_ID!;
  const res = await notion.databases.retrieve({ database_id: databaseId });
  console.log(res); //dsd
})();
