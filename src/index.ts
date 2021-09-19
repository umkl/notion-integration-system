// //IMPORTS
// import { GoogleCalendarIntegration } from "./repository/GoogleCloud/GoogleCalendar";
// import { NotionIntegration } from "./repository/NotionIntegrations/NotionIntegration";
// // import { Action } from "./types/nis";
// import path from "path";

// const fs = require("fs");
// const express = require("express");

// //CONTSTANTS
// const app = express();
// const port = 4000;

// //declaring variables
// // var ni: NotionIntegration;
// // var gci: GoogleCalendarIntegration;
// // var nNotion: Action[];
// // var cNotion: Action[];
// // var idCNotion: string[];
// // var idCGoogleCalendar: string[];
// // var cGoogleCalendar: Action[];
// // var nGoogleCalendar: Action[];
// // var notionChBuffer: Action[];

// serverPreparation();
// startServer();

// // app.listen(port, async () => {
// // serverPreparation();
// // startServer();
// // });a

// // console.log("hello")

// function main() {}

// main();

// function getCGoogleCalendarById(id: string) {}

// // async function init() {
// //   ni = new NotionIntegration();
// //   gci = new GoogleCalendarIntegration();
// //   await gci.init();

// //   notionChBuffer = [];
// //   cGoogleCalendar = [];
// //   nGoogleCalendar = [];
// //   cNotion = [];
// //   nNotion = [];

// //   initCNotion();
// //   initCGoogleCalendar();

// //   generateIdCNotion();
// //   generateIdCGoogleCalendar();
// // }

// // async function serverPreparation() {
// //   await init();
// // }

// function startServer() {
//   nicLoop();
//   // setInterval(() => {
//   //   nicLoop();
//   // }, 60000);
// }

// async function nicLoop() {
//   generateIdCNotion(); //generate new check up ids
//   notionChBuffer = []; //removing the previous changes
//   nNotion = ni.transformInActions(await ni.getActions()); //getting the new Notion status
//   extractNotionChanges(); //getting the changes(comparing with old status), left over ids are all ids of unknown elements
//   applyNNotionToCGoogleCalendar(); //applying all new things to google calendar
//   updateCGoogleCalendarJSONData();
//   await updateCNotionJSONData(); //writing it into json
// }

