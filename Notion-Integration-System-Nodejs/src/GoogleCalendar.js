const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';
//The file toke.json stores the user's access and refresh tokens, and is created automatically when the authorization flow completes for the first time.

//Load clieint scretes from a local file
fs.readFile('credentials.json', (err, content) =>{
    if(err) return console.log("error: ",err);
    authorize(JSON.parse(content), listEvents);    
});

function authorize(credentials, callback){
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
}


