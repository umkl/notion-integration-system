const { Client, isNotionClientError } = require("@notionhq/client");
const dotenv = require("dotenv").config();

import { RepositoryInterface } from "../RepositoryInterface";

let notionCredentials = require("./../../credentials/notion.json");

export class NotionIntegration implements RepositoryInterface {
  constructor() {
    this.init();
  }
  notionClient: any;
  accessId: string = notionCredentials.notion_access_token;
  action_database_id: string = notionCredentials.notion_action_database_id;

  init(): void {
      console.log(notionCredentials)
    this.notionClient = new Client({
      auth: this.accessId
    });
  }

  listActions = async () => {
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };

    const { results } = await this.notionClient.request(payload);

    await results.map((page: any) => {
      console.log(page.properties);
      return {

      };
      //   if(page.properties.Name.title[0].text.content == "create the notion-integration-system"){
      //     console.log(page.properties);
      // }
    });
  };
}
