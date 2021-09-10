declare interface Foo {
  bar: string;
  fooBar: string;
}

declare type Action = {
  Description: string;
  Name: string;
  Content: any;
  New: Boolean;
  NotionID: string;
  GoogleCalendarID: string;
  Archived: Boolean;
  Date: {
    start: {
      dateTime: string; //"2021-08-08T06:00:00.000Z"
      timeZone: "utc";
    };
    end: {
      dateTime: string | undefined;
      timeZone: "utc";
    };
  };
};

declare type Journal = {
    
}