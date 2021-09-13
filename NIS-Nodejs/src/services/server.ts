import { NotionIntegration } from "../repository/NotionIntegrations/NotionIntegration";

export const startJournalServer = () => {
  console.log("NIS-server starting...");
  setInterval(journalLoop, 60000);
};

const journalLoop = () => {
  // TODO: get all journal entries
  const ni: NotionIntegration = new NotionIntegration();
  const allCurrentJournalEntries = ni.getEntries(
    process.env.journal_database_id ?? ""
  );

  //TODO: check if journal entry is missing
  //TODO: schedule a creation-event for a new journal at 1am next day.
};
