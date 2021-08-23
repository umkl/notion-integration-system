const express = require("express");
const app = express();
const port = 4000;
import { GoogleCalendarIntegration } from "./repository/GoogleCloud/GoogleCalendar";
import { NotionIntegration } from "./repository/NotionIntegrations/Notion";

import path from "path";

app.get("/", (req: any, res: any) => {
  // var gci: GoogleCalendarIntegration = new GoogleCalendarIntegration();
  // gci.listEvents;
  res.send("Hello world!");
});

var ni: NotionIntegration;
var gci: GoogleCalendarIntegration;

// var cdata: any[];

var nNotion: any[];
var cNotion: any[];
var idCNotion: any[];
var cGoogleCalendar: any[];
var idCGoogleCalendar: any[];
var chBuffer: any[];

app.listen(port, async () => {
  // console.log("start");
  // await authorizeFun();
  // console.log("After exec.");
  // listEvents(authenticationGoogle);
  // console.log("ok");
  ni = new NotionIntegration();

  // gci = new GoogleCalendarIntegration();
  // ni.updateAction("seas");
  // ni.deleteAction("ok");

  // ni.listActions();
  // cNotion = [];

  chBuffer = [];
  nNotion = await ni.getActions(); //imagine cNotion is 1 2 3 and now there came 1 2 3 4 in
  for (var i = 0; i < nNotion.length; ++i) {
    //checking appropriate pairs
    if (idCNotion.includes(nNotion[i].id)) {
      //checking if the newNotion element does already exist
      if (nNotion[i] != getCNotionById(nNotion[i].id)) {
        //checking if the entry was manipulated
        chBuffer.push(nNotion[i]);
      }
      for (let x = 0; x < idCNotion.length; ++x) {
        if (x == nNotion[i].id) {
          delete idCNotion[x];
        }
      }
    } else {
      chBuffer.push(nNotion[i]);
    }
  }

  //changebuffer contains all the manipulation and creation of elements
  //idCNotion contains all the ids of deleted elements

  // cGoogleCalendar = await
  // await gci.init();
  // gci.updateEvent("_65130ci56cqjcb9p6kojcb9k6osj8ba260rk6ba460sjici360ok4h1i68");
  // gci.listEvents();
  // cGciEvents = gci.listEvents

  // gci.addEvent();
  // var page = {
  //   name: "hello",
  // };
  // ni.addAction(page);
  // startServer();

  // console.log("1");
  // await gci.init();
  // console.log("2");
  // gci.listEvents();
});

function applyNotionToGoogleCalendar() {
  generateIdCGoogleCalendar();
  for (let i = 0; i < chBuffer.length; ++i) {
    if (idCGoogleCalendar.includes(chBuffer[i].id)) {
      
    }else{
      gci.addEvent(chBuffer[i]);
    }
  }
}

function getCNotionById(id: string) {}

function getCGoogleCalendarById(id: string) {

}

function generateIdCNotion() {
  idCNotion = [];
  for (var i = 0; i < cNotion.length; ++i) {
    idCNotion.push(cNotion[i].id);
  }
}

function generateIdCGoogleCalendar() {
  idCGoogleCalendar = [];
  for (var i = 0; i < cGoogleCalendar.length; ++i) {
    idCGoogleCalendar.push(cGoogleCalendar[i].id);
  }
}

function removeLeftoverCNotion() {}

// function

function startServer() {
  // setInterval(() => {
  //   ni.store();
  //   // var oldData = cdata;
  //   var newData = ni.data;
  //   var newEntries = extractDifferences(oldData, newData);
  // }, 60000);
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
