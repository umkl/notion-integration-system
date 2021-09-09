function applyNNotionToCGoogleCalendar() {
    generateIdCGoogleCalendar();
    //checking cbuffer for updates and creations
    for (let i = 0; i < notionChBuffer.length; ++i) {
      if (idCGoogleCalendar.includes(notionChBuffer[i].GoogleCalendarID)) {
        //this is a existing one
        gci.updateEvent(notionChBuffer[i].GoogleCalendarID, notionChBuffer[i]);
      } else {
        // cGoogleCalendar.push(notionChBuffer[i]);
        cNotion[
          getCNotionIndexById(notionChBuffer[i].NotionID)
        ].GoogleCalendarID = gci.addEvent(notionChBuffer[i]);
        cGoogleCalendar.push(
          cNotion[getCNotionIndexById(notionChBuffer[i].NotionID)]
        );
      }
    }
    //checking left overs for deletion
  }