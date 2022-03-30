// declare interface Foo {
//   bar: string;
//   fooBar: string;
// }

// enum Options {
//   JOURNAL,
//   INIT
// }

// declare type Journal = {
//   Length: Date;
//   Actions: any[];
//   Events: any[];
//   Goals: any[];
// }

// declare type Action = {
//   Description: string;
//   Name: string;
//   Content: any;
//   New: Boolean;
//   NotionID: string;
//   GoogleCalendarID: string;
//   Archived: Boolean;
//   Date: {
//     start: {
//       dateTime: string; //"2021-08-08T06:00:00.000Z"
//       timeZone: "utc";
//     };
//     end: {
//       dateTime: string | undefined;
//       timeZone: "utc";
//     };
//   };
// };

// declare type Journal = {
// }

// To parse this data:
//
//   import { Convert, Page } from "./file";
//
//   const page = Convert.toPage(json);

export interface Page {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
}

// // Converts JSON strings to/from your types
// export class Convert {
//   public static toPage(json: string): Page {
//     return JSON.parse(json);
//   }

//   public static pageToJson(value: Page): string {
//     return JSON.stringify(value);
//   }
// }
