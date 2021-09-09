function extractDifferences(berforeC: any[], afterC: any[]): any[] {
  var sortedB: any[] = berforeC.sort();
  var sortedA: any[] = afterC.sort();
  if (sortedB.length >= sortedA.length) {
    for (var i = 0; i < sortedB.length; i++) {
      if (sortedA[i] != sortedB[i]) {
      }
    }
  } else {
    for (var i = 0; i < sortedB.length; i++) {
      // if(sortedA[i] == sortedB[i])
    }
  }

  return [];
}

function extractNotionChanges() {
  for (var i = 0; i < nNotion.length; ++i) {
    if (idCNotion.includes(nNotion[i].NotionID)) {
      if (
        getCNotionIndexById(nNotion[i].NotionID) != undefined &&
        nNotion[i] != cNotion[getCNotionIndexById(nNotion[i].NotionID)]
      ) {
        notionChBuffer.push(nNotion[i]);
      }
      for (let x = 0; x < idCNotion.length; ++x) {
        if (idCNotion[x] == nNotion[i].NotionID) {
          delete idCNotion[x];
        }
      }
    } else {
      notionChBuffer.push(nNotion[i]);
    }
  }
  cNotion = nNotion;
}
