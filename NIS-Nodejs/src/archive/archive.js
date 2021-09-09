//DEPRECATED TODO FETCHER

// const userAction = async () => {
//     const response = await fetch('https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks', {
//       method: 'GET',
//       headers: {
//         "X-Auth-Token":process.env.MICROSOFTTODOS_TOKEN,
//         'Content-Type': 'application/json'
//       }
//     });
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     console.log(myJson);
//   }
// userAction();

// const fetchMicrosoftTodos = () => {
//   axios(config)
//     .then(function (response) {
//       const results = JSON.parse(JSON.stringify(response.data));
//       const loiisl = typeof results;

//       results.value.map((x) => {
//         console.log(x.title);
//       });

//       console.log(results.value.length);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };



//execution

// getAllTasks();
// getAllTasks();




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



  // gci = new GoogleCalendarIntegration();
  // ni.updateAction("seas");
  // ni.deleteAction("ok");

  // ni.listActions();
  // cNotion = [];


    // console.log("start");
  // await authorizeFun();
  // console.log("After exec.");
  // listEvents(authenticationGoogle);
  // console.log("ok");



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
