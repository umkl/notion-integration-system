// var axios = require("axios");

// var config = {
//     method: "get",
//     url: "https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks",
//     headers: {
//       Authorization:
//         "Bearer EwBwA8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAARUAqaWA4zIpQOKB6PltdrlqLLbQbPBTrBpwLTwy0m02+yaD6VfchyIRWhqV5ksIoblTz/64H79W6T62jtTocTcLpxu1JSzyOgKDGijoiWE/+Sk8JneP0MIVbWFR1Uk7wBzTar+5Xxb1bShwDvbztsDkqvZm7BZ1vDERfhfAbOpjf9Nc6LIvYqAFCYrg+7yn/sG5X2xocITzkX9q3QSeHx2U4o5YgowEtxT1pKUDjqLqS5zIYMZxdkjA1D78M8LKrfwlvj8f6TvUOsHf4kPdeDDUxDO5tuSbHvoGwckchHrqAREf31Kt8ymF0tukc05RYhWDM4YTVxTvpCjfwcqeZDcDZgAACNO7Q66ZnARtQALGC5rXnBiAPbf25wFOR1JK/ETRoxvHAeQx5u8TRPtHg0vR6BSyQJkqNqBSFWe/G0QhyHomgcyZktxQp+gsDbLcb7vEkXe/hxS6rvwUoSqKNEWEGsZG82v4lHe4myQEnxCm8asFwzUXvVPFKzadwsVvP355Zqj0d1EU91pZ/EQBY8joCyRSjtHOwAAzi42iOzi8+qCxgfvKTXNMD4RSRcPb61XaV0/jypoD83b1SycJxsHkgt9Q1J/xhV8RfcR+9tnJ8C5xHtYK8vk5TVaIUzH5pdiwOvAO7tjeUogaZx6noUv6uLzc54KUY6gmT5SFhM2r0hpyV5fLa+4S0bL7WaSoq+Wqx+EBoHFIErVjvzpOSelfQdJf3Qv5GLOeHEI3ePvlvIF7RO/tQT2Ep5ad0O79+tpybbK8bOINWR4rpC0tolplB3U2VtWdwMzS736KJkIxzZf/RvHh2r/pQoNvuVWyU0puyv4/I+q89dwA7BVFmKL/rjKjac9rl/C8iOndhIs8sS3he74Isy0uDIEC9wBtSjMBouxuvxkFAfeedVAL7ymCZIK3YQs5T6B6EBFtUTngX7wWBZtjiwDio16wBVGP1iZ+ENj/FktYfpwkOhZztv0HjfbOln6Ega0RZgpej6z0syPmsD51YDHbkuV7vsNXu/2PwxUpzY18DMv3UGK7tD+JZ6+m2FIu3TvCTRE+GMZzHCVY8N8Y7xZmGI2q2+JLsldMwKSKwOVDDYGpFrRjJO8tYZGqomwYXObwgW+qslKIAg==",
//     },
//   };

// // const userAction = async () => {
// //   const response = await fetch(
// //     "https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItZDc4My1hNzgwLTAwAi0wMAoALgAAA-TFHFdcrWdKr7VuOxefRroBAL21XYPGhyRGh0GI6v_IpJUAAAIBEgAAAA==/tasks",
// //     {
// //       method: "GET",
// //       headers: {
// //         "X-Auth-Token": process.env.MICROSOFTTODOS_TOKEN,
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// //   const myJson = await response.json(); //extract JSON from the http response
// //   // do something with myJson
// //   console.log(myJson);
// // };
// // userAction();

// const fetchMicrosoftTodos = () => {
//   axios(config)
//     .then(function (response) {
//       const results = JSON.parse(JSON.stringify(response.data));
//     //   const loiisl = typeof results;

//       results.value.map((x) => {
//         console.log(x.title);
//       });

//       console.log(results.value.length);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //execution

// fetchMicrosoftTodos();
