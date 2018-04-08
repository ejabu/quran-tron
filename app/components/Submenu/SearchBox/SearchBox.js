// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './SearchBox.css';
import { resultChanged } from '../../../actions/verseIndex';
import { QueryParser } from './SearchEngine';

import path from 'path';
var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
var app = electron.remote.app

if (process.env.NODE_ENV === 'development') {
  //base directory is different during development mode
  //we should use process.cwd() rather than app.getPath
  //see this https://github.com/chentsulin/electron-react-boilerplate/issues/374
  const basic_dir = process.cwd()
  var db_file_path = path.join(basic_dir, "/assets/quranSearch.db")
  var quranDB = new Datastore({ filename: db_file_path, autoload: false, onload:function(error) {console.log('haha');} });

} else {
  var exePath = app.getPath('exe')
  var hasil = path.join(exePath, "../assets/quranSearch.db")
  var quranDB = new Datastore({ filename: hasil, autoload: false, onload:function(error) {console.log('haha');} });

}

@connect(state => ({ verseIndex: state.verseIndex , result: state.result}),)
export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      search2: '',
      index: 0
    };
  }
  componentDidMount(){
    quranDB.loadDatabase();
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const query = event.target.value;
    this.setState({ search: event.target.value, search2: event.target.value });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        if (event.target.value.indexOf(':') > -1) {
          this.props.searchCallback(event.target.value)
        }
        else{
          var neQuery = QueryParser(event.target.value)

          // Keeping only the given fields but removing _id
          // db.find({ planet: 'Mars' }, { planet: 1, system: 1, _id: 0 }, function (err, docs) {
            // docs is [{ planet: 'Mars', system: 'solar' }]
          // });
          quranDB.find(neQuery, { c: 1, v: 1, _id: 0 }).sort({i:1}).exec(this.doSomething)
          // , { c: 1, _id: 0 }
        }
      }
    }
  }

  doSomething = (err, data) => {
    if (err) return console.log(err);
    if (data===undefined) return console.log('undefined');
    const { dispatch } = this.props;
    resultChanged(dispatch,data)
  }

  buttonSearchClick = (event) => {
    event.stopPropagation();
    if (this.state.search.indexOf(':') > -1) {
      this.props.searchCallback(this.state.search)
    }
    else{
      var neQuery = QueryParser(this.state.search)
      quranDB.find(neQuery, { c: 1, v: 1, _id: 0 }).sort({i:1}).exec(this.doSomething)

    }
  }
  render() {
    const items = this.props.suggestions;
    const choosenIndex = this.state.index;
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.box9 + " searchBox"} onClick={this.buttonSearchClick.bind(this)}>
            <a className="searchBox"></a>
          </div>
          <div className={styles.box10}>
            <input type="text" value={this.state.search}  onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)} />
          </div>
        </div>

      </div>
    );
  }
}
