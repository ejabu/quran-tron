// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Content.css';
import { updateVerseIndex } from '../../actions/verseIndex';
import { QueryParser } from './SearchEngine';

var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
var app = electron.remote.app

if (process.env.NODE_ENV === 'development') {
  var exePath = app.getPath('exe')
  var path     = require('path');
  var hasil = path.join(exePath, "../assets/quran.db")
  console.log('development');
  console.log(hasil);
  var quranDB = new Datastore({ filename: 'D:/quran.db', autoload: false, onload:function(error) {console.log('haha');} });

} else {
  var exePath = app.getPath('exe')
  var path     = require('path');
  var hasil = path.join(exePath, "../assets/quran.db")
  console.log('production');
  console.log(hasil);
  var quranDB = new Datastore({ filename: hasil, autoload: false, onload:function(error) {console.log('haha');} });

}

@connect(state => ({ verseIndex: state.verseIndex }),)
export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arabic: '',
      index:  0,
      bahasa:  '',
      chapter:  '',
      verse:  '',
    };
  }
  componentDidMount(){
    quranDB.loadDatabase(this.loadContent);
  }

  componentWillReceiveProps(nextProps){
    var neQuery = QueryParser(nextProps.query)
    quranDB.find(neQuery, this.doSomething);

  }

  prevIndex = (event) => {
    event.stopPropagation();
    var nextAyah = parseInt(this.state.index)-1
    var nextAyahStr = nextAyah.toString()
    var query = { i: nextAyahStr}
    quranDB.find(query, this.doSomething);
  }
  nextIndex = (event) => {
    event.stopPropagation();
    var nextAyah = parseInt(this.state.index)+1
    var nextAyahStr = nextAyah.toString()
    var query = { i: nextAyahStr}
    quranDB.find(query, this.doSomething);
  }
  doSomething = (err, data) => {
    if (err) return console.log(err);
    if (data===undefined) return console.log('undefined');
    const { dispatch } = this.props;
    this.setState({
      arabic: data[0]['a'],
      index:  data[0]['i'],
      bahasa:  data[0]['b'],
      chapter:  data[0]['c'],
      verse:  data[0]['v'],
    });
  }

  loadContent = () => {
    quranDB.find({ c: "20" , v: "2" }, this.doSomething);
  }
  // tesSearch = () => {
  //   quranDB.find({ c: "78" , v: "2" }, this.doSomething);
  // }

  render() {
    const { verseIndex } = this.props;
    const items = this.props.translations;
    const choosenIndex = this.state.index;
    return (
      <div>

          <div className={styles.buttonLeft}>
              <a onMouseDown={this.prevIndex.bind(this)} className="navigation float-left " ></a>
          </div>
          <div className={styles.buttonRight}>
              <a onMouseDown={this.prevIndex.bind(this)} className="navigation float-right " ></a>
          </div>
        <div className={styles.header}>
          <div className={styles.itemLabel} >QS</div>

          <div className={styles.item} >{this.state.chapter}:{this.state.verse}</div>
        </div>


        <div className={styles.transWrapper}>


          <div className={styles.content}>
            <div className={styles.arabic}>
              {this.state.arabic}
            </div>
            <div className={styles.bahasa}>
              {this.state.bahasa}
            </div>
          </div>
          {/* <div>
            <a onMouseDown={this.prevIndex.bind(this)} className="navigation float-left " ></a>
            <a onMouseDown={this.nextIndex.bind(this)} className="navigation float-right " ></a> */}
            {/* <a onMouseDown={this.tesSearch.bind(this)} className="navigation float-right " ></a> */}
          {/* </div> */}

        </div>
      </div>
    );
  }
}
