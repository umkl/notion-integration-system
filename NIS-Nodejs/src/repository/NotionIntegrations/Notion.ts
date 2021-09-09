import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline";
import { RepositoryInterface } from "../RepositoryInterface";

const dotenv = require("dotenv").config();
const { Client, isNotionClientError } = require("@notionhq/client");

let notionCredentials = require("./../../credentials/notion/notion.json");

export class NotionIntegration implements RepositoryInterface {
  data: any[] = [];
  accessId: string = notionCredentials.notion_access_token;
  action_database_id: string = notionCredentials.notion_action_database_id;
  notionClient: any;

  constructor() {
    this.init();
  }

  init(): void {
    this.notionClient = new Client({
      auth: this.accessId,
    });
  }

  listUsers = async () => {
    const listUserResponse = await this.notionClient.users.list();
  };

  getEntries = async (database_id: string) => {
    var EntryList: any[];
    const payload = {
      path: `databases/${database_id}/query`,
      method: "POST",
    };
    const { results } = await this.notionClient.request(payload);
    return payload;
  };

  addEntry = async (page: any) => {
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
  };

  deleteEntry = async (pageId: string) => {
    await this.notionClient.pages.update({
      page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
      archived: true,
    });
  };

  listActions = async () => {
    var ActionList: any[] = [];
    const payload = {
      path: `databases/${this.action_database_id}/query`,
      method: "POST",
    };

    const { results } = await this.notionClient.request(payload);
    await results.map((page: any) => {
      ActionList.push(page);
      console.log(page.properties.Date);
    });
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

  // transformInActions(notionElements: any[]): Action[] {
  //   var actions: Action[] = [];
  //   for (var i of notionElements) {
  //     var a: Action = {
  //       Name: i.properties.Name.title[0].text.content,
  //       Description: "",
  //       Content: undefined,
  //       New: false,
  //       NotionID: i.id,
  //       GoogleCalendarID: "",
  //       Archived: i.archived,
  //       Date: {
  //         start: {
  //           dateTime:
  //             i.properties.Date != undefined
  //               ? i.properties.Date.date.start
  //               : undefined,
  //           timeZone: "utc",
  //         },
  //         end: {
  //           dateTime:
  //             i.properties.Date != undefined
  //               ? i.properties.Date.date.end
  //               : undefined,
  //           timeZone: "utc",
  //         },
  //       },
  //     };
  //     if (
  //       a.Date != undefined &&
  //       a.Date.end.dateTime != undefined &&
  //       a.Date.start.dateTime != undefined
  //     ) {
  //       actions.push(a);
  //     }
  //   }
  //   return actions;
  // }

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
