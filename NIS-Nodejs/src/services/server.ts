import { NotionIntegration } from "../repository/NotionIntegrations/NotionIntegration";

export const startJournalServer = () => {
  console.log("NIS-server starting...");
  journalLoop();
  // setInterval(journalLoop, 60000);
};

const journalLoop = async () => {
  // TODO: get all journal entries
  const ni: NotionIntegration = new NotionIntegration();
  const allCurrentJournalEntries = await ni.getEntries(
    process.env.NOTION_JOURNAL_DATABASE_ID
  );

  console.log(allCurrentJournalEntries);

  //TODO: check if journal entry is missing

  for

  //TODO: schedule a creation-event for a new journal at 1am next day.
};
