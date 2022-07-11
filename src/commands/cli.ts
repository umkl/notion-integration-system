import arg from 'arg';
import { getAllPagesFromDatabase, getKeyByDbName } from '../services/notion';

require("dotenv").config();

function parseArgumentsIntoOptions(rawArgs: any){
  const args = arg(
    {
      '--git':Boolean,
      '--yes':Boolean,
      '--install':Boolean,
      '-g':'--git',
      '-y':'--yes',
      '-i':'--install'
    },
    {
      argv:rawArgs.slice(2)
    }
  );
  return{
    skipPrompts: args['--yes']|| false,
    git: args['--git'] || false,
    template: args._[0]
  }
}

// async function promptForMissingOptions(options: any){
//   const defaultTemplate = 'Javascript';
//   if (options.skipPrompts){
//     return {
//       ...options,
//       template: options.template || defaultTemplate
//     }
//   }
  
//   // const questions = []
//   if (!options.template){
//     // questions.push({
//     //   type
//     // })
//   }
// }

export function cli(args: any){
  var res = parseArgumentsIntoOptions(args)
  console.log(res)
  // let options = parseArgumentsIntoOptions(args);  
  getAllPagesFromDatabase(getKeyByDbName(args[2]))
  // getAllPagesFromDatabase(process.env.NOTION_ACTION_DATABASE_ID!)
}


// export function cli(args){
//   console.log(args)
// }