// const { Client } = require("@notionhq/client");

// const notion = new Client({
//   auth: process.env.NOTION_ACCESS_TOKEN,
// });

const getDatabase = async (dbId:string) => await notion.databases.retrieve({ database_id: dbId });  

const getPage = async (pageId: string) => await notion.pages.retrieve({ page_id: pageId });