const express = require("express");
const app = express();
const port = 4000;
import { GoogleCalendarIntegration } from "./repository/GoogleCloud/GoogleCalendar";
import { NotionIntegration } from "./repository/NotionIntegrations/Notion";
import { Action } from "./types/nis";
import path from "path";
const fs = require("fs");

// app.get("/", (req: any, res: any) => {
//   res.send("Hello world!");
// });

var ni: NotionIntegration;
var gci: GoogleCalendarIntegration;

var nNotion: Action[];
var cNotion: Action[];
var idCNotion: string[];
var idCGoogleCalendar: string[];
var cGoogleCalendar: Action[];
var nGoogleCalendar: Action[];
var notionChBuffer: Action[];

serverPreparation();
startServer();

// app.listen(port, async () => {
  // serverPreparation();
  // startServer();
// });a

// console.log("hello")

function applyNNotionToCGoogleCalendar() {
  generateIdCGoogleCalendar();
  //checking cbuffer for updates and creations
  for (let i = 0; i < notionChBuffer.length; ++i) {
    if (idCGoogleCalendar.includes(notionChBuffer[i].GoogleCalendarID)) {
      //this is a existing one
      gci.updateEvent(notionChBuffer[i].GoogleCalendarID, notionChBuffer[i]); 
    } else {
      // cGoogleCalendar.push(notionChBuffer[i]);
      cNotion[getCNotionIndexById(notionChBuffer[i].NotionID)].GoogleCalendarID = gci.addEvent(notionChBuffer[i]);
      cGoogleCalendar.push(cNotion[getCNotionIndexById(notionChBuffer[i].NotionID)]);
    }
  }
  //checking left overs for deletion
}

function getCNotionIndexById(id: string): any {
  for (let x = 0; x < cNotion.length; x++) {
    if (id == cNotion[x].NotionID) {
      return x;
    }
  }
  return undefined;
}

function getCGoogleCalendarById(id: string) {}

function generateIdCNotion() {
  idCNotion = [];
  for (var i = 0; i < ((cNotion == undefined)? 0:cNotion.length); ++i) {
    idCNotion.push(cNotion[i].NotionID);
  }
}

function generateIdCGoogleCalendar() {
  idCGoogleCalendar = [];
  for (var i = 0; i < cGoogleCalendar.length; ++i) {
    idCGoogleCalendar.push(cGoogleCalendar[i].GoogleCalendarID);
  }
}

function removeLeftoverCNotion() {}

async function init() {
  ni = new NotionIntegration();
  gci = new GoogleCalendarIntegration();
  await gci.init();
  
  notionChBuffer = [];
  cGoogleCalendar = [];
  nGoogleCalendar =[];
  cNotion = [];
  nNotion = [];

  initCNotion();
  initCGoogleCalendar();

  generateIdCNotion();
  generateIdCGoogleCalendar();
}

async function serverPreparation() {
  await init();
}

function startServer() {
  nicLoop();
  // setInterval(() => {
  //   nicLoop();
  // }, 60000);
}

async function nicLoop() {
   
  generateIdCNotion();//generate new check up ids
  notionChBuffer = []; //removing the previous changes
  nNotion = ni.transformInActions(await ni.getActions()); //getting the new Notion status
  extractNotionChanges(); //getting the changes(comparing with old status), left over ids are all ids of unknown elements
  applyNNotionToCGoogleCalendar(); //applying all new things to google calendar
 updateCGoogleCalendarJSONData(); 
  await updateCNotionJSONData();//writing it into json
  console.log("hundling!")
}

function extractNotionChanges() {
  for (var i = 0; i < nNotion.length; ++i) {
    if (idCNotion.includes(nNotion[i].NotionID)) {
      if (getCNotionIndexById(nNotion[i].NotionID) != undefined && nNotion[i] != cNotion[getCNotionIndexById(nNotion[i].NotionID)]) {
        notionChBuffer.push(nNotion[i]);
      }
      for (let x = 0; x < idCNotion.length; ++x) {
        if (idCNotion[x] == nNotion[i].NotionID) {
          delete idCNotion[x];
        }
      }
    } else {
      notionChBuffer.push(nNotion[i]);
    }
  }
  cNotion = nNotion;
}

function extractDifferences(berforeC: any[], afterC: any[]): any[] {
  var sortedB: any[] = berforeC.sort();
  var sortedA: any[] = afterC.sort();
  if (sortedB.length >= sortedA.length) {
    for (var i = 0; i < sortedB.length; i++) {
      if (sortedA[i] != sortedB[i]) {
      }
    }
  } else {
    for (var i = 0; i < sortedB.length; i++) {
      // if(sortedA[i] == sortedB[i])
    }
  }

  return [];
}

function initCNotion() {
  fs.readFile(
    path.resolve(__dirname, "./database/notion.json"),
    "utf8",
    (err: any, jsonString: any) => {
      if (err) {
        console.log("File read failed", err);
        return;
      }
      cNotion = JSON.parse(jsonString);
    }
  );
}

function initCGoogleCalendar() {
  fs.readFile(
    path.resolve(__dirname, "./database/googleCalendar.json"),
    "utf8",
    (err: any, jsonString: any) => {
      if (err) {
        console.log(err);
        return;
      }
      cGoogleCalendar = JSON.parse(jsonString);
    }
  );
}

async function updateCNotionJSONData() {
  const jsonString = JSON.stringify(cNotion==undefined?[]:cNotion);
  await fs.writeFile(
    path.resolve(__dirname, "./database/notion.json"),
    jsonString,
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
}

function updateCGoogleCalendarJSONData() {
  const jsonString = JSON.stringify(cGoogleCalendar==undefined?[]:cGoogleCalendar);
  // const jsonString = "lesgo";
  console.log(jsonString)
  fs.writeFileSync(
    path.resolve(__dirname, "./database/googleCalendar.json"),
    jsonString,
    'utf8'
  );
}

// var authorizeFun = () => {
//   return new Promise<void>((resolve, reject): void => {
//     fs.readFile(CREDENTIALS_PATH, (err: any, content: string) => {
//       if (err) return console.log("Error loading client secret file:", err);
//       authorize(JSON.parse(content), resolve);
//     });

//   });
// };

// const fs = require("fs");
// const readline = require("readline");
// const { google } = require("googleapis");
// var authenticationGoogle: any;

// // If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.resolve(
//   __dirname,
//   "./credentials/googleCloudToken.json"
// );
// const CREDENTIALS_PATH = path.resolve(
//   __dirname,
//   "./credentials/googleCloud.json"
// );

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(
//   credentials: {
//     installed: { client_secret: any; client_id: any; redirect_uris: any };
//   },
//   callback: { (auth: any): void; (): void }
// ) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err: any, token: string) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     authenticationGoogle = oAuth2Client;
//     callback();
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(
//   oAuth2Client: {
//     generateAuthUrl: (arg0: { access_type: string; scope: string[] }) => any;
//     getToken: (arg0: any, arg1: (err: any, token: any) => void) => void;
//     setCredentials: (arg0: any) => void;
//   },
//   callback: () => void
// ) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code: any) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err: any, token: any) => {
//       if (err) return console.error("Error retrieving access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", TOKEN_PATH);
//       });
//       authenticationGoogle = oAuth2Client;
//       callback();
//     });
//   });
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listEvents(auth: any) {
//   const calendar = google.calendar({ version: "v3", auth });
//   calendar.events.list(
//     {
//       calendarId: "primary",
//       timeMin: new Date().toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: "startTime",
//     },
//     (err: string, res: { data: { items: any } }) => {
//       if (err) return console.log("The API returned an error: " + err);
//       const events = res.data.items;
//       if (events.length) {
//         console.log("Upcoming 10 events:");
//         events.map(
//           (
//             event: { start: { dateTime: any; date: any }; summary: any },
//             i: any
//           ) => {
//             const start = event.start.dateTime || event.start.date;
//             console.log(`${start} - ${event.summary}`);
//           }
//         );
//       } else {
//         console.log("No upcoming events found.");
//       }
//     }
//   );
// }
