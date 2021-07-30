const dotenv = require('dotenv').config()
const { Client, isNotionClientError } = require('@notionhq/client')
const fetch = require("node-fetch");
const https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'GET',
    'hostname': 'graph.microsoft.com',
    'path': '/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks',
    'headers': {
      'Authorization': 'Bearer EwBwA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAfTiHRYK04tey6hFTYMbJvj3AvNj1yEFBygvbU19P1W4kJpS6XLpILN3WrQ3ud3MqKo59sx5sfG1ka7+f0+wACGbUYtmXyo9nz+Qlo1JAfc0rOW8ScVfcrvk3SH6IYi/WoWj3c1Htg0MTyJhS9+GMGQGj39Ggj62PBfNU82+IxWfy3ahM4liiQ7U3SvalVQBX3F7IKp8Udm+p/D6Lfy7IosQqZN8B/5JXr/qNlt+hQWVmGHRR9kinBt/Nj2X4G0WOipru6a/JsvBu+wG6Ju3A35pESeYo2sELMXJBULfIVa3Kp4MVB9J5UmTR3xYmHDtLnMRMR2lfQwJyhvckX2qZoADZgAACHKaWs2HQ/rrQALlXRPwTI7JaZ41FS+rJLcDG009FMOC28OR+VqoQSZ4mFLq2hX9A9/kk25SXvPHOfEABzWJ9noimfE9Zkym0eMO7jfrU2ZDP4kYKDxkE1OqWpQoj3GnQyiEluUKhyJP6GHG89uO7fDqe23mALNOiPTH52jcVaHDcRfkCvwyhcXJq2steoejVQQAW4LwP50Y+oeX8aR9zIKc3Twv4PAjg0466E8k9F58CrLRjN3TwCrQTO08VN195xj3WdP/j6ZWrYcly2OqOTpaLpVIhieijD/pE2/w6knZs+jurrPdWDLKBDDufPzzQhQ06b6yoltOyF7XS5AiJc41tFXawLP0rA/Gvt282XUXP4hwcNmgtcaT8kw//S2h+Z5YumMkJ04IQhGU3C3skRBB5hy0WEFA3QyHCd7Bpxr8+I7rOMmDNLYq2G0DTg1Y3k/okaEwyqn2qAwI3l4SGPNJ0UVAqBk2rqj+PbfzywMXucH+ocQhA3xzok73WDXzKyQSFeEEGk7aouPQzB2sQ/7kOURtFydqBY6sbM4vpuBy8El7QVivqksL5iWFbKvTx9sSmhnmcH5PkePD23uzul/rKF+ZS/6xSUUCEPTIMHVhEaDqAGZeKsNPRcTjjUGNzlwmU0Ls1Hxh+yb65om/yuKDtj/WxJMviHn6AK8TUeDD7aOj9LgHNjJfgUUXiqPC8fN+Rs8jUKibBJW21Oqn8rFMuevYk90LL9RbE6OpgypjyrX9gXACul6SdqFKI2UEhpmQ+VYNA57xIJWIAg=='
    },
    'maxRedirects': 20
  };
  




// const listDatabases = async () => {
//     const res = await notion.databases.list()
//     console.log(res);
// }

// listDatabases()

//NOTION

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})


const getMicrosoftTodoTasks = async () => {
    const payload = {
        path: `databases/${process.env.NOTION_ACTION_DATABASE_ID}/query`,
        method: 'POST'
    }
    
    const data = await notion.request(payload)
    console.log(data)
}

const getTodos = async () => {
    
}

//NOTION

const action = async () =>{
    const response = await fetch('loisl');
    const myJson = await response.json();
}

let clientOptions = {}


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


var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });

req.end();


// getMicrosoftTodoTasks();