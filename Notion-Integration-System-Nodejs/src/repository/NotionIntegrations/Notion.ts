const { Client, isNotionClientError } = require("@notionhq/client");
const dotenv = require("dotenv").config();

import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline";
import { RepositoryInterface } from "../RepositoryInterface";

let notionCredentials = require("./../../credentials/notion.json");
import { Action } from "./../../types/nis";

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
      // console.log(page.properties.Date);
      // console.log(page.properties.Name.title[0].text.content);
    });
    // console.log(ActionList);
  };

  getActions = async (): Promise<any[]> => {
    var ActionList: any[] = [];
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };
    const { results } = await this.notionClient.request(payload);
    await results.map((page: any) => {
      ActionList.push(page);
    });
    return ActionList;
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
      page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "xxxtreme loisl",
              },
            },
          ],
        },
      },
    });
  };

  transformInActions(notionElements: any[]): Action[] {
    var actions: Action[] = [];
    for (var i of notionElements) {
      var a: Action = {
        Name: i.properties.Name.title[0].text.content,
        Description: "",
        Content: undefined,
        New: false,
        NotionID: i.id,
        GoogleCalendarID: "",
        Archived: i.archived,
        Date:undefined,
      };
      actions.push(a);
    }
    return actions;
  }

  deleteAction = async (pageId: string) => {
    await this.notionClient.pages.update({
      page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
      archived: true,
    });
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
