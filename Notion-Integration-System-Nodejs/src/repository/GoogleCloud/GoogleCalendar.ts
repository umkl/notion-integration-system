const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");
import { RepositoryInterface } from "./../RepositoryInterface";

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
        timeMin: new Date().toISOString(),
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
              event: { start: { dateTime: any; date: any }; summary: any },
              i: any
            ) => {
              const start = event.start.dateTime || event.start.date;
              console.log(`${start} - ${event.summary}`);
            }
          );
        } else {
          console.log("No upcoming events found.");
        }
      }
    );
  };
}
