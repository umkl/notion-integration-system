const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const clientId =
  "258537530933-5710v0gf3nratqct6ot09650uvomrnca.apps.googleusercontent.com";
const clientSecret = "pY9O0_ugrXFXPa-J29CYD55u"; //clientkey

const oAuth2Client = new OAuth2(clientId, clientSecret);

const refreshToken =
  "1//04eHEgqaGbF8_CgYIARAAGAQSNwF-L9IrVWrOn9nDkbyoRKOgaO1spJCclZ8VosSTH8p_hpOyMzSPVrq2_5rtkQhr0dwrQBEemqE";

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
  summary: "Meet with David",
  location: "295 California St, San Francisco, CA 94111",
  description:
    "Meeting with David to talk about the new client project and how to add the google calendar api.",
  start: {
    dateTime: eventStartTime,
    timeZone: "America/Denver",
  },
  end: {
    dateTime: eventEndTime,
    timeZone: "America/Denver",
  },
  colorId: 1,
};

calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
    //   timeZone: "America/Denver",
      items: [
        {
          id: "1_private",
        },
      ],
    },
  },
  (err, res) => {
      return console.log(res)
    // if (err) return console.error("Free Busy query error:", err);

    // const eventsArr = res.data.calendars.primary.busy;

    // if (eventsArr.length === 0)
    //   return calendar.event.insert(
    //     { calendarId: "primary", resource: event },
    //     (err) => {
    //       if (err) {
    //         return console.error("Calendar Event Creation Error: ", err);
    //       }
    //       return console.log("Calendar Event Created.");
    //     }
    //   );
    // return console.log("Sorry I am busy");
  }
);
