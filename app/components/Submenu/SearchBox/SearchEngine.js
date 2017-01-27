import { searchQuery } from '../../../actions/verseIndex';


function findByIndex(query) {
  var splitter = query.split(":")
  return {c: splitter[0], v: splitter[1]}
  // var regexChapter = new RegExp(splitter[0], "g")
}
function findByKeyword(query) {
  var regexBahasa = new RegExp(query, "i")
  return {b: regexBahasa}
}

export function QueryParser(query) {
  console.log('Query to parse : ' + query);
  var neQuery = {c: 115, v: 1};
  if (query.indexOf(':') > -1) {
    neQuery = findByIndex(query)
  }
  else if (query) {
    neQuery = findByKeyword(query)
    // searchQuery(dispatch, neQuery)
  }

  return neQuery
}
