
var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
var app = electron.remote.app




class QuranLoader {

    constructor(options) {

        this.callback
        if (process.env.NODE_ENV === 'development') {
          var exePath = app.getPath('exe')
          var path     = require('path');
          var hasil = path.join(exePath, "../assets/quranSearch2.db")
          console.log('development');
          console.log(hasil);
          this.quranDB = new Datastore({ filename: 'D:/quranSearch2.db', autoload: false, onload:function(error) {console.log('haha');} });
          this.quranDB.loadDatabase();

        } else {
          var exePath = app.getPath('exe')
          var path     = require('path');
          var hasil = path.join(exePath, "../assets/quranSearch2.db")
          console.log('production');
          console.log(hasil);
          this.quranDB = new Datastore({ filename: hasil, autoload: false, onload:function(error) {console.log('haha');} });
          this.quranDB.loadDatabase();
        }


    }

    play() {
        console.log('play');
        console.log(this.quranDB);
        // this.audio.play();
    }
    find(query, callback) {
        console.log('find');
        console.log(query);
        console.log(callback);
        // this.quranDB.find(query, callback());
        this.callback = callback;
        var regexBahasa = new RegExp('neraka', "i")
        var regexNo = {b: regexBahasa}
        this.quranDB.find(query, this.doSomething);

        // this.audio.play();
    }

    doSomething = (err, data) => {
      console.log('callback doSomething');
      if (err) return console.log(err);
      if (data===undefined) return console.log('undefined');
      console.log('data callbackDoSmth quran loader');
      this.callback(data);
    }

}

export default new QuranLoader({
});
