function findVerse(query) {
  console.log('findVerse');
  var splitter = query.split(":")
  return {c: splitter[0], v: splitter[1]}
  // var regexChapter = new RegExp(splitter[0], "g")
  // var regexVerse = new RegExp(splitter[1], "g")
  // return {c: regexChapter, v: regexVerse}
}

export function QueryParser(query) {
  console.log('Query to parse : ' + query);
  var neQuery = {c: 115, v: 1};
  if (query.indexOf(':') > -1) {
    neQuery = findVerse(query)
  }

  return neQuery
}
