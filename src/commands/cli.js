import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs){
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

async function promptForMissingOptions(options){
  const defaultTemplate = 'Javascript';
}

export function cli(args){
  let options = parseArgumentsIntoOptions(args);  
}



