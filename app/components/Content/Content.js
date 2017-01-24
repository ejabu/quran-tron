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
    console.log('componentWillMount');
    console.log(this);
    quranDB.loadDatabase(this.loadContent);
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
    console.log('nextIndex');
    console.log(nextAyah);
    var regex = new RegExp(nextAyah, "g")
    quranDB.find({ i: regex}, this.doSomething);
  }
  doSomething = (err, data) => {
    if (err) return console.log(err);
    console.log(data);
    console.log('doSomething');
    if (data===undefined) return console.log('undefined');
    this.setState({
      arabic: data[0]['a'],
      index:  data[0]['i'],
      bahasa:  data[0]['b'],
      chapter:  data[0]['c'],
      verse:  data[0]['v'],
    });
  }

  loadContent = () => {
    quranDB.find({ c: /78/ , v: /2/ }, this.doSomething);
  }

  render() {
    const items = this.props.translations;
    const choosenIndex = this.state.index;
    console.log(this.props);
    return (
      <div className={styles.transWrapper}>
        <div>
          <div className={styles.arabic}>
            {this.state.arabic}
          </div>
          {this.state.index}
          {this.state.bahasa}
          {this.state.chapter}
          {this.state.verse}
        </div>
        <div>
          <a onMouseDown={this.prevIndex.bind(this)} className="navigation float-left " >H</a>
          <a onMouseDown={this.nextIndex.bind(this)} className="navigation float-right " >N</a>
        </div>

      </div>
    );
  }
}
