import { Client } from "@notionhq/client";

const getDatabase = async (dbId: string, notion: any) => {
  await notion.databases.retrieve({ database_id: dbId });
};

export const getAllPagesFromDatabase = async () => {
  const databaseId = process.env.NOTION_ACTION_DATABASE_ID;
  const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  const response = await notion.databases.query({
    database_id: databaseId!,
  });
  console.log(response);
};

const getPage = async (pageId: string, notion: any) => {
  const resp = await notion.pages.retrieve({ page_id: pageId });
  return resp;
};

export default getDatabase;
