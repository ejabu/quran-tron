function findByIndex(query) {
  var splitter = query.split(":")
  return {c: splitter[0], v: splitter[1]}
  // var regexChapter = new RegExp(splitter[0], "g")
  // var regexVerse = new RegExp(splitter[1], "g")
  // return {c: regexChapter, v: regexVerse}
}
function findByKeyword(query) {
  // var regexBahasa = new RegExp(query, "g")
  var regexBahasa = new RegExp(" "+query+" ", "i")
  return {b: regexBahasa}
  // var regexVerse = new RegExp(splitter[1], "g")
  // return {c: regexChapter, v: regexVerse}
}


function update(verseIndex) {
  return {
    type: UPDATE,
    verseIndex: verseIndex

  };
}


export function QueryParser(query) {
  var neQuery = {c: 115, v: 1};
  if (query.indexOf(':') > -1) {
    neQuery = findByIndex(query)
  }
  else if (query) {
    neQuery = findByKeyword(query)
    dispatch(update(verseIndex));

  }

  return neQuery
}
