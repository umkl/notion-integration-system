import { Client } from "@notionhq/client"
// import { DatabasesQueryResponse } from '@notionhq/client/build/src/api-endpoints';

const getDatabase = async (dbId: string, notion: any) => {
  await notion.databases.retrieve({ database_id: dbId });
};

const getAllPagesFromDatabase = async (
  dbId: string
): Promise<any> => {
  const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  const response = await notion.databases.query({
    database_id: dbId!,
  });
  console.log(response.results);
  return response;
};

const getPage = async (pageId: string, notion: any) => {
  const resp = await notion.pages.retrieve({ page_id: pageId });
  return resp;
};

const getKeyByDbName = (dbname: string): string =>{
  if(dbname == "actions"){
    return process.env.NOTION_ACTION_DATABASE_ID!
  }
  throw new Error("nope");
  
}

export { getDatabase, getAllPagesFromDatabase, getPage, getKeyByDbName};