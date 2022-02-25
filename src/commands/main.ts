import chalk from 'chalk';
import fs from 'fs';
const { exec } = require("child_process");

export async function logHelloWorldWithOptions(options:any){
    console.log("Hello World");
    
    await exec("ls", (error:any, stdout:any, stderr:any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    console.log( chalk.green.bold('DONE'));
}


