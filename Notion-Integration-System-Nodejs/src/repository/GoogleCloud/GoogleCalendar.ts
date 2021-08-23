const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");
import { RepositoryInterface } from "./../RepositoryInterface";
import { Action } from "./../../types/nis";

export class GoogleCalendarIntegration implements RepositoryInterface {
  SCOPES: string[];
  TOKEN_PATH = path.resolve(
    __dirname,
    "./../../credentials/googleCloudToken.json"
  );
  CREDENTIALS_PATH = path.resolve(
    __dirname,
    "./../../credentials/googleCloud.json"
  );
  accessId: String = "";
  oAuth2Client: any = null;

  constructor() {
    this.SCOPES = ["https://www.googleapis.com/auth/calendar"];
  }

  init = () => {
    return new Promise<void>((resolve, reject): void => {
      fs.readFile(this.CREDENTIALS_PATH, (err: any, content: string) => {
        if (err) return console.log("Error loading client secret file:", err);
        this.authorize(JSON.parse(content), resolve);
      });
    });
  };

  authorize = async (
    credentials: {
      installed: { client_secret: any; client_id: any; redirect_uris: any };
    },
    callback: { (auth: any): void; (): void }
  ) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    fs.readFile(this.TOKEN_PATH, async (err: any, token: string) => {
      if (err) return this.getAccessToken();
      this.oAuth2Client.setCredentials(JSON.parse(token));
      callback();
    });
  };

  getAccessToken = () => {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code: any) => {
      rl.close();
      this.oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) return console.error("Error retrieving access token", err);
        this.oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err: any) => {
          if (err) return console.error(err);
          console.log("Token stored to", this.TOKEN_PATH);
        });
      });
    });
  };

  listEvents = () => {
    const calendar = google.calendar({
      version: "v3",
      auth: this.oAuth2Client,
    });
    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: new Date(2021,5,5,10,10,10,10).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err: string, res: { data: { items: any } }) => {
        if (err) return console.log("The API returned an error: " + err);
        const events = res.data.items;
        if (events.length) {
          console.log("Upcoming 10 events:");
          events.map(
            (
              event: any,
              i: any
            ) => {
              const start = event.start.dateTime || event.start.date;
              console.log(`${start} - ${event.summary}`);
              console.log(event.id);
            }
          );
        } else {
          console.log("No upcoming events found.");
        }
      }
    );
  };

  transformInActions(gcEvents: any[]):Action[]{
    var actions: Action[] = [];
    for(var i of gcEvents){
      var a:Action = {
        Description: "",
        Name: i.summary,
        Content: undefined,
        New: false,
        NotionID: "",
        GoogleCalendarID: "",
        Archived: false,
        Date: {
          start: {
            dateTime: i.start,
            timeZone: "utc"
          },
          end: {
            dateTime: i.end,
            timeZone: "utc"
          }
        }
      }
      actions.push(a);
    }
    return actions;
  }
   


  addEvent = (event: Action) => {
    const calendar = google.calendar({
      version: "v3",
      auth: this.oAuth2Client,
    });

    calendar.events.insert(
      {
        auth: this.oAuth2Client,
        calendarId: "primary",
        resource: {
          summary: event.Name,
          description: event.Description,
          start: event.Date!=undefined?event.Date.start:undefined,
          end: event.Date!=undefined?event.Date.end!=undefined?event.Date.end:undefined:undefined, 
          attendees: [],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
          colorId: 4,
          sendUpdates: "all",
          status: "confirmed",
        },
      },
      (err: any, res: { data: any }) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      }
    );
  };

  removeEvent = async (eventId: any) => {
    const calendar = google.calendar({
      version: "v3",
      auth: this.oAuth2Client,
    });

    await calendar.events.delete(
      {
        auth: this.oAuth2Client,
        eventId: eventId,
        calendarId: "primary",
      },
      (err: any, res: { data: any }) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.data+ "event deleted!!!");
        }
      }
    );
  };

  updateEvent = async (eventId:any) => {
    const calendar = google.calendar({
      version: "v3",
      auth: this.oAuth2Client,
    });

    await calendar.events.update(
      {
        auth: this.oAuth2Client,
        eventId: eventId,
        calendarId: "primary",
        resource:{
          summary:"xtremeee loisl",
          start: {
            dateTime: "2021-08-08T06:00:00.000Z",
            timeZone: "utc",
          },
          end: {
            dateTime: "2021-08-08T07:00:00.000Z",
            timeZone: "utc",
          },
          // "start": req.body.start_time,
        }
      }, 
      (err: any, res: { data: any }) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.data);
        }
      }
    );
  };
}
