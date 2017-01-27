// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Submenu.css';
import SearchBox from './SearchBox/SearchBox';

var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
var quranDB = new Datastore({ filename: 'D:/quranSearch.db', autoload: false, onload:function(error) {console.log('haha');} });

@connect(state => ({ verseIndex: state.verseIndex }),)
export default class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      search: '',
      search2: '',
      index: 0,
      result:[],
    };
  }
  componentDidMount(){
    quranDB.loadDatabase();
  }
  componentDidUpdate(nextProps, nextStates){
    const { verseIndex } = this.props;
    quranDB.find(nextProps.verseIndex, this.doSomething);
  }
  doSomething = (err, data) => {
    if (err) return console.log(err);
    if (data===undefined) return console.log('undefined');
    console.log('doSomething');
    console.log(data);
    // this.setState(
    //   {
    //     result : data
    //   }
    // )
    // const { dispatch } = this.props;
    // console.log(data);
    // // updateVerseIndex(dispatch, data[0])
    // this.setState({
    //   arabic: data[0]['a'],
    //   index:  data[0]['i'],
    //   bahasa:  data[0]['b'],
    //   chapter:  data[0]['c'],
    //   verse:  data[0]['v'],
    // });
  }
  renderTranslations(props, index) {
    return (
      <div className={styles.item} key={index}>
        {/* <li key={index}  className={style}>{props.name}</li> */}
        {/* <textarea rows="1" /> */}
        <div >{props}</div>
      </div>
    );
  }

  render() {
    const items = this.state.result;
    // const items = this.props.suggestions;
    const { verseIndex } = this.props;
    console.log(verseIndex);
    // let tes = verseIndex.b.toString()
    return (
      <div className={styles.mainWrapper}>
        <div>
          <SearchBox {...this.props} />
          <grey>Search of </grey>
        </div>
        <div className={styles.itemBox}>
          {items.map((item, index) => (this.renderResult(item, index)))}
        </div>
      </div>
    );
  }
}
