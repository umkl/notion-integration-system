const dotenv = require("dotenv").config();
const { Client, isNotionClientError } = require("@notionhq/client");
const fetch = require("node-fetch");
var axios = require('axios');


var config = {
    method: 'get',
    url: 'https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks',
    headers: { 
      'Authorization': 'Bearer EwBwA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAUNdsQOI4IqklNX94flgzu4pbeykAppmHodtSsCkYcniTx+uZ9nxDF4oBiEXsFwopfZEetbJ68Cz7y/mvrBsTqfGkJMRkxF/Ji+mREI2MnCMFNHGn8GFlHdjgY9Zu5NG9jpl9C604enXJdgAz6ruOYlwo4U3WPoiinIYt2otT6VFjT1mmjI2w86RBBVZJHr9b7qeJSnWPm958gw5I9uXcQ+1pFgt0Chefr0ne9UV73cjr78IwOcP3SxWzVq4e71tsI+dfC5JZA+/1a7mdK2gEviK+fjFC1fAOi2SK0rcKGmlUNP9nY5rfl5DC4y2eZyJayX92wubLYQq46eTJQa5ZiQDZgAACIP+psk8E9fsQAJly4kT5NgFbfMbBdLt3tTWMvm4bPWdoGWU9ifkjzdunJErMctA3szVFIfl7E1N0+74Ay1mGG0iDVJCFy8DHFOe2x7BqaNl3pJ8/W/DLEXn/EhqX5B3fhl20oW0xqfjMgqkWbpG1LaAdrn9K9XbXzHL/S/9S8nLBUtWVt2GB6DldfE/Qf129anSdsKyrU4Cx/IdNA+W3M7eAaSxFIHpDPMfRzKH/1/L6jQf3AoHa/1e59+lC8p9SP3Y4id8/wf3eM34nWETURWy/r+WComffE+JplBPb/Z+Y1mUBbiMzkGqky4aJ77qLWY2Yyn8or+tSa2Q46s2TTn2eZotEqkh5e+PMiwXR82MWn714T1Xvm52sQra8Xn6n/74N972HjxqusgQf5HMdSgKVOvwbY44p1LB+FmAPHhWQ320Kq2Iw6R38sxIpb39/JbzeswESMPMcEbDg+rUCJmJvhis7H18pK91vJW77VJAqUhXXpQn/7eflQYafHgklrP1ongc7XF6AfFNcyUlEu2etFtB8z7jfCTJ8fvOX1jhySCaWhzU/9KLNPyS6jSxQkj2XDgOQKjXBo4esgsb0kBvMm4sR/lsxuZlyW7aR5ydxOTAl/Wm9dhTMHhnYOU7hQIA0Us//vfgtdzppn+mn2slxcgycBZKdlnAFESpGB+W4sokObt9nQQ7tT/lMtPpeRlQ0HbhlGO1p6b/hFptAIU/3QczkXks8HyePLF7JMWuJhGPpN+f8UOggD3g6Q+m+Fss9S79CzSg7faIAg=='
    }
  };

// const listDatabases = async () => {
//     const res = await notion.databases.list()
//     console.log(res);
// }

// listDatabases()


//NOTION

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getAllTasks = async () => {
  const payload = {
    path: `databases/${process.env.NOTION_ACTION_DATABASE_ID}/query`,
    method: "POST",
  };

  var { results } = await notion.request(payload);
  
  const tasks = await results.map((page) => {
    console.log(page.properties);
    return {
        id: page.id,
        title: page.properties.Name.title[0].text.content
    }
    // if(page.properties.Name.title[0].text.content == "create the notion-integration-system"){
    //     console.log(page.properties);
    // }
  });

};

const getTodos = async () => {};

//NOTION

const action = async () => {
  const response = await fetch("loisl");
  const myJson = await response.json();
};

let clientOptions = {};

// const userAction = async () => {
//     const response = await fetch('https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks', {
//       method: 'GET',
//       headers: {
//         "X-Auth-Token":process.env.MICROSOFTTODOS_TOKEN,
//         'Content-Type': 'application/json'
//       }
//     });
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     console.log(myJson);
//   }
// userAction();


axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//execution

// getAllTasks();
// getAllTasks();
