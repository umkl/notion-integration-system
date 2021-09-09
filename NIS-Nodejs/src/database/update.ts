async function updateCNotionJSONData() {
    const jsonString = JSON.stringify(cNotion == undefined ? [] : cNotion);
    await fs.writeFile(
      path.resolve(__dirname, "./database/notion.json"),
      jsonString,
      (err: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      }
    );
  }
  
  function updateCGoogleCalendarJSONData() {
    const jsonString = JSON.stringify(
      cGoogleCalendar == undefined ? [] : cGoogleCalendar
    );
    // const jsonString = "lesgo";
    console.log(jsonString);
    fs.writeFileSync(
      path.resolve(__dirname, "./database/googleCalendar.json"),
      jsonString,
      "utf8"
    );
  }
  