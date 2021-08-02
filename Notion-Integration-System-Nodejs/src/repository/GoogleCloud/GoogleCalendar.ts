const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");
import { RepositoryInterface } from "./../RepositoryInterface";

export class GoogleCalendarIntegration implements RepositoryInterface {
  constructor() {
    this.init();
  }

  credentialsPath: String = "../../credentials/googleCloud.json";
  accessId: String = "jalksdf";
  // appSecret?: String | undefined;
  SCOPES = ["https://www.googleapis.com/auth/calendar"];
  TOKEN_PATH = "./../../credentials/googleCloudToken.json";

  init = () => {
    // Load client secrets from a local file.
    fs.readFile(path.resolve(__dirname,"../../credentials/googleCloud.json"), (err: any, content: any) => {
      if (err) return console.log("Error loading client secret file:", err);
      this.authorize(JSON.parse(content));
    });
    
  };

  authorize = (credentials: any) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    fs.readFile(path.resolve(__dirname,"../../credentials/googleCloudToken.json"), (err: any, token: any) => {
      if (err) return this.getAccessToken(oAuth2Client);
      oAuth2Client.setCredentials(JSON.parse(token));
      this.listEvents(oAuth2Client);
    });
  };

  getAccessToken = (oAuth2Client: any) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.SCOPES,
    });
    console.log("Authorize with this URL:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter code: ", (code: any) => {
      rl.close();
      oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err: any) => {
          if (err) return console.error(err);
          console.log("Token stored to", this.TOKEN_PATH);
        });
        this.listEvents(oAuth2Client);
      });
    });
  };

  listEvents = (auth: any) => {
    const calendar = google.calendar({ version: "v3", auth: auth });
    calendar.calendarList.list({}, (err: any, result: { data: any }) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Output: " + JSON.stringify(result.data, null, 2)); // or JSON.stringify(result.data)
      }
    });
  };
}

// // If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = "token.json";

// // Load client secrets from a local file.
// fs.readFile("credentials.json", (err: any, content: any) => {
//   if (err) return console.log("Error loading client secret file:", err);
//   // Authorize a client with credentials, then call the Google Calendar API.
//   authorize(JSON.parse(content), listEvents);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials: any, callback: any) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err: any, token: any) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client: any, callback: any) {
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
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// // function listEvents(auth) {
// //   const calendar = google.calendar({ version: "v3", auth });
// //   calendar.events.list(
// //     {
// //       calendarId: "primary",
// //       timeMin: new Date().toISOString(),
// //       maxResults: 10,
// //       singleEvents: true,
// //       orderBy: "startTime",
// //     },
// //     (err, res) => {
// //       if (err) return console.log("The API returned an error: " + err);
// //       const events = res.data.items;
// //       if (events.length) {
// //         console.log("Upcoming 10 events:");
// //         events.map((event, i) => {
// //           const start = event.start.dateTime || event.start.date;
// //           console.log(`${start} - ${event.summary}`);
// //         });
// //       } else {
// //         console.log("No upcoming events found.");
// //       }
// //     }
// //   );
// // }

// function listEvents(auth: any) {
//   // const calendar = google.calendar({ version: "v3", auth });
//   // calendar.events.list({}, (err, res) => {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log("Output: " + result.data); // or JSON.stringify(result.data)
//   //   }
//   // });
//   const calendar = google.calendar({ version: "v3", auth: auth });

//   // calendar.calendars.

//   calendar.calendarList.list({}, (err: any, result: any) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Output: " + JSON.stringify(result.data, null, 2)); // or JSON.stringify(result.data)
//     }
//   });
// }

// // [END calendar_quickstart]

// module.exports = {
//   SCOPES,
//   listEvents,
// };
