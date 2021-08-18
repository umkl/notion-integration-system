const { Client, isNotionClientError } = require("@notionhq/client");
const dotenv = require("dotenv").config();

import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline";
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
    var ActionList: any[] = [];
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };

    const { results } = await this.notionClient.request(payload);
    await results.map((page: any) => {
      ActionList.push(page);
      console.log(page);
    });
    // console.log(ActionList);
  };

  listUsers = async () => {
    const listUserResponse = await this.notionClient.users.list();
  };

  addAction = async (page: { name: any }) => {
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

  updateAction = async (pageId: string) => {
    await this.notionClient.pages.update({
      page_id: 'fasjdf'
    })
  };

  deleteAction = async (pageId: string) => {
    await this.notionClient.pages.update({
      page_id: pageId,
      archived:true
    })
  };

  store = async () => {
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };
    const { results } = await this.notionClient.request(payload);
    await results.map((page: any) => {
      this.data.push(page);
    });
  };
}
