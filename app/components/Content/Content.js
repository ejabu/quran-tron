// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Content.css';
var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
// var db = new Datastore();
var quranDB = new Datastore({ filename: 'G:/quran.db', autoload: false, onload:function(error) {console.log('haha');} });
import { QueryParser } from './SearchEngine';


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
    var regex = new RegExp(nextAyah, "g")
    quranDB.find({ i: regex}, this.doSomething);
  }
  nextIndex = (event) => {
    event.stopPropagation();
    var nextAyah = parseInt(this.state.index)+1
    var regex = new RegExp(nextAyah, "g")
    quranDB.find({ i: regex}, this.doSomething);
  }
  doSomething = (err, data) => {
    if (err) return console.log(err);
    if (data===undefined) return console.log('undefined');
    console.log('data');
    console.log(data);
    this.setState({
      arabic: data[0]['a'],
      index:  data[0]['i'],
      bahasa:  data[0]['b'],
      chapter:  data[0]['c'],
      verse:  data[0]['v'],
    });
  }

  loadContent = () => {
    quranDB.find({ c: /78/ , v: /38/ }, this.doSomething);
  }
  // tesSearch = () => {
  //   quranDB.find({ c: "78" , v: "2" }, this.doSomething);
  // }

  render() {
    const items = this.props.translations;
    const choosenIndex = this.state.index;
    return (
      <div className={styles.transWrapper}>

        <div className={styles.header}>
        {this.state.chapter}:{this.state.verse}

        </div>
        <div className={styles.content}>
          <div className={styles.arabic}>
            {this.state.arabic}
          </div>
          <div className={styles.bahasa}>
            {this.state.bahasa}
          </div>
        </div>
        <div>
          <a onMouseDown={this.prevIndex.bind(this)} className="navigation float-left " ></a>
          <a onMouseDown={this.nextIndex.bind(this)} className="navigation float-right " ></a>
          {/* <a onMouseDown={this.tesSearch.bind(this)} className="navigation float-right " ></a> */}
        </div>

      </div>
    );
  }
}
