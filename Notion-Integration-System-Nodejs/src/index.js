const dotenv = require("dotenv").config();
const { Client, isNotionClientError } = require("@notionhq/client");
const fetch = require("node-fetch");
var axios = require("axios");

var config = {
  method: "get",
  url: "https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks",
  headers: {
    Authorization:
      "Bearer EwBwA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAakGSqJd+36AeAFN3xC4I9NwpDJkKRtsB0DgTDKNeRyX2POK7J+WZRI1PUkG31oXc0MuPvbbH1UDY3ruVCP+NFGeV+mSaYpcEi8+oocVOKH0vS/nPO1WaNbvXLEKsAN/U4mk9NofJcPvafzqbJ4lVGlv1R2qUXbrGCxkh0haXkL3lDkoTuT22YrWZ5IPwBUoV3xN+dPOT6Z+1TuVySTlZSy4JjWzDBZFdP0vCZIeeFpvHVSzyo1VSMHpJRFkZAFaARnfw0gklupJpOFRZNXmLpbIeolger+ZQwmS2sE8MQjoRsV43uF6DhI+pw3dFanVsyZH5UMzlzBt0+C/GUIQtzUDZgAACJdrk7kOEo5qQALeMhOdgAM4m0tCv4OBWScoaJPcUnhpovANOeBAjNlZRPdMYv8EEnmaWHOW5JCabZ8Ey8BLA2ocqf5BoOW1hNl/hP1d96STNlxx55JhnsuHLiaWkCR+iuCVx+RyYL/5UAiQ3fqW3x1y9OcSkMNLOYeZFWemiex3pn64rFNenAojBYkgaEHljqjwyEh5S51CBDlnkJvzTG/RiAsH4bOSpsmFJfCuDKYUFP+64nVQbJsZf3r4tnQAI5KvBkuxSMlv7OXBpxBOio0o7giCPDuCTW0BJ1XJxjw7lh95Ml/VDdU+f8Y+uafhp0iqbp1V09YH2KxOJf6Vwt9cY06FPrE/XGq+TxIICq12mzhIsfGP4aFAUXTuGq7J1DStvaFf6MrEDbpwgxajy9Q0nSEAXunbruftCOUuOcL8A17ur14k/NugPdd7KWj5LqmGo0ihAqS0AYme6v59GT3gD0mY+7xRRtzYtj5DE4gbrsuLAU1uEr8nijzEqIW27tmsrOe9NBjm23aVNIkUug7BHH2EbED6SbaRoNuFTyP5ZAVN1y2p4UGXcnYAl5zoInbNb6A+i0dKLIrE/qbMb45zVP7wb91S3orKuhUeoYldc8z4JZ3ADMXVpy2V4p4+/MZX91K6W4c1KOje2+OZDygObq5qptJbzlmIV9fDizpCDhcpGFVY6CdHLl7rYn4j/UuNmAW5NFCPsNYyfb72tZMmwmTY3Lqz9WH3t+tZXTO3UXKUKiAIXoVDntFRsTMfDkqarJjf0REsXtaIAg==",
  },
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
      title: page.properties.Name.title[0].text.content,
    };
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

// const fetchMicrosoftTodos = () => {
//   axios(config)
//     .then(function (response) {
//       const results = JSON.parse(JSON.stringify(response.data));
//       const loiisl = typeof results;

//       results.value.map((x) => {
//         console.log(x.title);
//       });

//       console.log(results.value.length);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };



//execution

// getAllTasks();
// getAllTasks();



