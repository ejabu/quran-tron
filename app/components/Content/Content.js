// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Content.css';
import { updateVerseIndex } from '../../actions/verseIndex';
import { QueryParser } from './SearchEngine';
import { showMenu } from '../../actions/layout';

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

@connect(state => ({ verseIndex: state.verseIndex, layout: state.layout}),)
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
    if (data.length > 0){
      this.setState({
        arabic: data[0]['a'],
        index:  data[0]['i'],
        bahasa:  data[0]['b'],
        chapter:  data[0]['c'],
        verse:  data[0]['v'],
      });
    }

  }

  showMenu = (event) => {
    const { dispatch } = this.props;
    event.stopPropagation();
    dispatch(showMenu());
  }

  loadContent = () => {
    quranDB.find({ c: "20" , v: "2" }, this.doSomething);
  }
  // tesSearch = () => {
  //   quranDB.find({ c: "78" , v: "2" }, this.doSomething);
  // }


  // componentDidMount() {
  //   const height = document.getElementById('haha').clientHeight;
  //   console.log(height);
  //   // this.setState({ height });
  // }


  // calcHeight(node) {
  //         if (node) {
  //           console.log(node.offsetHeight);
  //         }
  //     }


  render() {
    const { verseIndex, layout } = this.props;
    const items = this.props.translations;
    const choosenIndex = this.state.index;
    return (
      <div>


        <div className={styles.header}>
          {(layout.submenu == "hide") && <div className={styles.buttonMenu}>
            <a onMouseDown={this.showMenu.bind(this)} className="navicon"></a>
            {/* <a onMouseDown={this.showMenu.bind(this)} className="arrowRight "></a> */}
          </div>}
          <div className={styles.itemLabel+" noselect cursorSelect"}>QS</div>

          <div className={styles.item+" noselect cursorSelect"} >{this.state.chapter}:{this.state.verse}</div>
        </div>

        <div className={styles.buttonLeft}>
            <a onMouseDown={this.prevIndex.bind(this)} className="navigation arrowLeft " ></a>
        </div>
        <div className={styles.buttonRight}>
            <a onMouseDown={this.nextIndex.bind(this)} className="navigation arrowRight " ></a>
        </div>

        {/* untuk nambah baiikin height value <div ref={(node) => this.calcHeight(node)} className={styles.transWrapper}> */}
        <div className={styles.transWrapper}>


          <div className={styles.content}>
            { layout.font == "OLD_FONT" ?
              <div className={styles.arabic}>
                {this.state.bahasa}
              </div>
                :
              <div className={styles.arabic}>
                {this.state.arabic}
              </div>

            }

            <div className={styles.bahasa}>
              {this.state.bahasa}
            </div>
          </div>
          {/* <div>
            <a onMouseDown={this.prevIndex.bind(this)} className="navigation arrowLeft " ></a>
            <a onMouseDown={this.nextIndex.bind(this)} className="navigation arrowRight " ></a> */}
            {/* <a onMouseDown={this.tesSearch.bind(this)} className="navigation arrowRight " ></a>
          </div>*/}

        </div>
      </div>
    );
  }
}
