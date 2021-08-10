const { Client, isNotionClientError } = require("@notionhq/client");
const dotenv = require("dotenv").config();

import { RepositoryInterface } from "../RepositoryInterface";

let notionCredentials = require("./../../credentials/notion.json");

export class NotionIntegration implements RepositoryInterface {
  constructor() {
    this.init();
  }

  data: any[] = [];
  notionClient: any;
  accessId: string = notionCredentials.notion_access_token;
  action_database_id: string = notionCredentials.notion_action_database_id;
  init(): void {
    this.notionClient = new Client({
      auth: this.accessId,
    });
  }

  listActions = async () => {
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };

    const { results } = await this.notionClient.request(payload);
    await results.map((page: any) => {
      this.data.push(page);
    });
    console.log(this.data);
  };

  listUsers = async () => {
    const listUserResponse = await this.notionClient.users.list();
  };

  addAction = async (page: any) => {
    await this.notionClient.pages.create({
      parent: {
        database_id: this.action_database_id,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: page.name,
              },
            },
          ],
        },
      },
    });
    // this.notionClient.databases.query();
    // this.notionClient.request;
    // const {results} = await this.notionClient.reqest(payload);
  };
}
