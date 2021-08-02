//DEPRECATED TODO FETCHER

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



