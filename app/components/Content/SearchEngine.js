

function findVerse(query) {
  console.log('findVerse');
  var chapter, verse = query.split(":")
  console.log(chapter, verse);
  // var regex = new RegExp(nextAyah, "g")
  // quranDB.find({ i: regex}, this.doSomething);
  return {c:chapter}
}







export function QueryParser(query) {
  console.log('Query to parse : ' + query);
  findVerse(query)
  return
}
