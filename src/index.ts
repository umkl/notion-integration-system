import { Client } from "@notionhq/client";
import { getAllPagesFromDatabase } from "./services/notion";
require("dotenv").config();

(() => {
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN,
  });
  const res = getAllPagesFromDatabase();//d
})();
