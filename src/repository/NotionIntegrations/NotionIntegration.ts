// import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline";
// import { RepositoryInterface } from "../RepositoryInterface";

// const dotenv = require("dotenv").config();
// const { Client, isNotionClientError } = require("@notionhq/client");

// export class NotionIntegration implements RepositoryInterface {
//   data: any[] = [];
//   accessId: string = process.env.NOTION_ACCESS_TOKEN ?? "";
//   action_database_id: string = process.env.NOTION_ACTION_DATABASE_ID ?? ""; 
//   notionClient: any;

//   constructor() {
//     this.init();
//   }

//   init(): void {
//     this.notionClient = new Client({
//       auth: this.accessId,
//     });
//   }

//   listUsers = async () => {
//     const listUserResponse = await this.notionClient.users.list();
//   };

//   getEntries = async (database_id: string|undefined) => {
//     if(database_id == undefined){
//       throw new Error('Please provide a DatabaseID!');
//       return;
//     }
//     const payload = {
//       path: `databases/${database_id}/query`,
//       method: "POST",
//     };
//     const { results } = await this.notionClient.request(payload);
//     return results;
//   };

//   addEntry = async (page: any) => {
//     await this.notionClient.pages.create({
//       parent: {
//         database_id: this.action_database_id,
//       },
//       properties: {
//         Name: {
//           title: [
//             {
//               text: {
//                 content: page.name,
//               },
//             },
//           ],
//         },
//       },
//     });
//   };

//   deleteEntry = async (pageId: string) => {
//     await this.notionClient.pages.update({
//       page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
//       archived: true,
//     });
//   };

//   listActions = async () => {
//     var ActionList: any[] = [];
//     const payload = {
//       path: `databases/${this.action_database_id}/query`,
//       method: "POST",
//     };

//     const { results } = await this.notionClient.request(payload);
//     await results.map((page: any) => {
//       ActionList.push(page);
//       console.log(page.properties.Date);
//     });
//   };

//   getActions = async (): Promise<any[]> => {
//     var ActionList: any[] = [];
//     const payload = {
//       path: `databases/${this.action_database_id}/query`,
//       method: "POST",
//     };
//     const { results } = await this.notionClient.request(payload);
//     await results.map((page: any) => {
//       ActionList.push(page);
//     });
//     return ActionList;
//   };

//   addAction = async (page: { name: any }) => {
//     await this.notionClient.pages.create({
//       parent: {
//         database_id: this.action_database_id,
//       },
//       properties: {
//         Name: {
//           title: [
//             {
//               text: {
//                 content: page.name,
//               },
//             },
//           ],
//         },
//       },
//     });
//     // this.notionClient.databases.query();
//     // this.notionClient.request;
//     // const {results} = await this.notionClient.reqest(payload);
//   };

//   updateAction = async (pageId: string) => {
//     await this.notionClient.pages.update({
//       page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
//       properties: {
//         Name: {
//           title: [
//             {
//               text: {
//                 content: "xxxtreme loisl",
//               },
//             },
//           ],
//         },
//       },
//     });
//   };

//   getCNotionIndexById(id: string): any {
//     // for (let x = 0; x < cNotion.length; x++) {
//     //   if (id == cNotion[x].NotionID) {
//     //     return x;
//     //   }
//     // }
//     // return undefined;
//   }

//   // transformInActions(notionElements: any[]): Action[] {
//   //   var actions: Action[] = [];
//   //   for (var i of notionElements) {
//   //     var a: Action = {
//   //       Name: i.properties.Name.title[0].text.content,
//   //       Description: "",
//   //       Content: undefined,
//   //       New: false,
//   //       NotionID: i.id,
//   //       GoogleCalendarID: "",
//   //       Archived: i.archived,
//   //       Date: {
//   //         start: {
//   //           dateTime:
//   //             i.properties.Date != undefined
//   //               ? i.properties.Date.date.start
//   //               : undefined,
//   //           timeZone: "utc",
//   //         },
//   //         end: {
//   //           dateTime:
//   //             i.properties.Date != undefined
//   //               ? i.properties.Date.date.end
//   //               : undefined,
//   //           timeZone: "utc",
//   //         },
//   //       },
//   //     };
//   //     if (
//   //       a.Date != undefined &&
//   //       a.Date.end.dateTime != undefined &&
//   //       a.Date.start.dateTime != undefined
//   //     ) {
//   //       actions.push(a);
//   //     }
//   //   }
//   //   return actions;
//   // }

//   deleteAction = async (pageId: string) => {
//     await this.notionClient.pages.update({
//       page_id: "80562bcf-295b-4fe8-977f-6dc80b69d3df",
//       archived: true,
//     });
//   };

//   store = async () => {
//     const payload = {
//       path: `databases/${this.action_database_id}/query`,
//       method: "POST",
//     };
//     const { results } = await this.notionClient.request(payload);
//     await results.map((page: any) => {
//       this.data.push(page);
//     });
//   };
// }
