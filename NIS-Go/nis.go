package nis

import (
	"log"
	"github.com/kjk/notionapi"
)

client := &notionapi.Client{}
pageID := "c969c9455d7c4dd79c7f860f3ace6429"
page, err := client.DownloadPage(pageID)
if err != nil {
    log.Fatalf("DownloadPage() failed with %s\n", err)
}