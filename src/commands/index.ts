#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

import { startJournalServer } from "../services/server";
import { initializeCredentials } from "./init";

program
  .version("0.0.1")
  .description(
    "An Integration System for putting your Notion-workspace to the next level."
  )
  .option("-t, --test", "Test")
  .option("-j, --journal", "Update journal")
  .option("-i, --init", "Initialize the credentials")
  .option("-c, --create", "Create new service")
  .option("-d, --install", "Install service on new location")
  .parse(process.argv);

program.addHelpText(
  "before",
  chalk.hex("#5D589A")(figlet.textSync("NIS-CLI", { horizontalLayout: "full" }))
);

// defining options
// var options = program.opts();

const options = { journal: true, init: false };

// if (options.lois == undefined) {
//   console.log("ok");
// }

// if (options.journal) {
//   startJournalServer();
// } else if (options.init) {
// }

// switch (options) {
//   case journal:
//     startJournalServer();
//     break;
//   case init:
// }

// if (options.pineapple) console.log('  - pineapple');
// if (options.bbq) console.log('  - bbq');
// if(options.h)
// if (options.help) {
//   console.log(
//     chalk.hex("#5D589A")(
//       figlet.textSync("NIS-CLI", { horizontalLayout: "full" })
//     )
//   );
// }
// const cheese: string = undefined === options.cheese
//     ? 'marble'
//     : options.cheese || 'no';
// console.log('  - %s cheese', cheese);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
