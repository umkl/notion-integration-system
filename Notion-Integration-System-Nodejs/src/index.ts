const express = require('express')
const app = express()
const port = 4000
import {GoogleCalendarIntegration} from './repository/GoogleCloud/GoogleCalendar';
import { NotionIntegration } from './repository/NotionIntegrations/Notion';


app.get('/', (req: any, res: any)=>{
    // var gci: GoogleCalendarIntegration = new GoogleCalendarIntegration();
    // gci.listEvents;
    var ni: NotionIntegration = new NotionIntegration();
    ni.listActions();
    res.send('Hello world!')

})

app.listen(port, () =>{
    console.log('ok')
})
