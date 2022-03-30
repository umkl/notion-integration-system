import { Client } from "@notionhq/client";
import { getAllPagesFromDatabase } from "./services/notion";

require("dotenv").config();

(async () => {
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN,
  });
  const res = await getAllPagesFromDatabase(
    process.env.NOTION_ACTION_DATABASE_ID!
  );
  res.results.forEach((x => console.log(x.object)));
  
  // console.log();
})();
