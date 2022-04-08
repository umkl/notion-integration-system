// import arg from 'arg';
// import inquirer from 'inquirer';
// import { fetchFromJournal } from '../controllers/notion';

// function parseArgumentsIntoOptions(rawArgs:any){
//     const args = arg(
//         {
//             '--init':Boolean,
//             '--yes': Boolean,
//             '--install':Boolean,
//             '-i':'--init',
//             '-y':'--yes'
//         },
//         {
//             argv:  rawArgs.slice(2)
//         }
//     );
//     return {
//         skipPrompts: args['--yes'] || false,
//         git: args['--init'] || false,
//         template: args._[0],
//         runInstall: args['--install'] || false,
//       };
// }

// async function promptForMissingOptions(options: { skipPrompts: any; git: any; template: any; runInstall?: boolean; }) {
//     const defaultTemplate = 'JavaScript';
//     if (options.skipPrompts) {
//       return {
//         ...options,
//         template: options.template || defaultTemplate,
//       };
//     }
//     const questions = [];
//     if (!options.template) {
//       questions.push({
//         type: 'list',
//         name: 'template',
//         message: 'Please choose which project template to use',
//         choices: ['JavaScript', 'TypeScript'],
//         default: defaultTemplate,
//       });
//     }
//     if (!options.git) {
//       questions.push({
//         type: 'confirm',
//         name: 'git',
//         message: 'Initialize a git repository?',
//         default: false,
//       });
//     }
   
//     const answers = await inquirer.prompt(questions);
//     return {
//       ...options,
//       template: options.template || answers.template,
//       git: options.git || answers.git,
//     };
//    }

// export async function cli(args:any){
//     // let options:any = parseArgumentsIntoOptions(args);
//     // options = await promptForMissingOptions(options);
//     // await logHelloWorldWithOptions(options);
//     fetchFromJournal();
//     console.log("lul");
//   }

