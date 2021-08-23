declare global {
  type Action = {
    Description: string;
    Name: string;
    Content: any;
    New: Boolean;
    NotionID: string;
    GoogleCalendarID: string;
    Archived: Boolean;
    Date: {
      start: {
        dateTime: String; //"2021-08-08T06:00:00.000Z"
        timeZone: "utc";
      };
      end: {
        dateTime: String;
        timeZone: "utc";
      };
    };
  };
}
