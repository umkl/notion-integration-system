const dotenv = require("dotenv").config();
const { Client, isNotionClientError } = require("@notionhq/client");
const fetch = require("node-fetch");

// const listDatabases = async () => {
//     const res = await notion.databases.list()
//     console.log(res);
// }

// listDatabases()

//NOTION

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getAllTasks = async () => {
  const payload = {
    path: `databases/${process.env.NOTION_ACTION_DATABASE_ID}/query`,
    method: "POST",
  };

  var { results } = await notion.request(payload);

  const tasks = await results.map((page) => {
    console.log(page.properties);
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
    };
    // if(page.properties.Name.title[0].text.content == "create the notion-integration-system"){
    //     console.log(page.properties);
    // }
  });
};

const getTodos = async () => {};

//NOTION

const action = async () => {
  const response = await fetch("loisl");
  const myJson = await response.json();
};

let clientOptions = {};