// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './SearchBox.css';
import { resultChanged } from '../../../actions/verseIndex';
import { QueryParser } from './SearchEngine';

var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
var quranDB = new Datastore({ filename: 'D:/quranSearchNew.db', autoload: false, onload:function(error) {console.log('haha');} });

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
    const { dispatch } = this.props;
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        if (event.target.value.indexOf(':') > -1) {
          this.props.searchCallback(event.target.value)
        }
        else{
          var neQuery = QueryParser(event.target.value)
          quranDB.find(neQuery, this.doSomething);
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
  render() {
    const items = this.props.suggestions;
    const choosenIndex = this.state.index;
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.box9 + " searchBox"}>
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
