//IMPORTS 
import { GoogleCalendarIntegration } from "./repository/GoogleCloud/GoogleCalendar";
import { NotionIntegration } from "./repository/NotionIntegrations/Notion";
// import { Action } from "./types/nis";
import path from "path";

const fs = require("fs");
const express = require("express");

//CONTSTANTS
const app = express();
const port = 4000;

//declaring variables
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


