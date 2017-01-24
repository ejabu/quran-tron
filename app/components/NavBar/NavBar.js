/* eslint-disable no-unused-vars */
// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import styles from './NavBar.css';
import SearchBox from './SearchBox/SearchBox';

var remote = require('electron').remote;
var fs = require('fs');
var Datastore = require('nedb');
// var db = new Datastore();
var db = new Datastore({ filename: 'G:/quran.db', autoload: true });
var Papa = require('babyparse');

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: 'haha'
    };
  }
  collapse(event) {
    this.setState({ expanded: false });
  }
  addPost = (event) => {
    event.stopPropagation();
    this.props.dispatch(push('/counter'));
  }
  addPost2 = (event) => {
    event.stopPropagation();

    this.props.dispatch(push('/qamus'));
  }
  addPost3 = (event) => {
    event.stopPropagation();

    this.props.dispatch(push('/doc'));
  }
  addPost5 = (event) => {
    event.stopPropagation();
    console.log(remote)
    console.log(fs)
    var filepath = "G:/eja.txt"
    var content;
    fs.readFile(filepath, 'utf8', this.doSomething)
    // var text = fs.readFileSync(filepath,'utf8')
    // this.setState({ data: text });
  }
  addPost6 = (event) => {
    event.stopPropagation();
    console.log(remote)

    var scott = {
        name: 'Scott',
        twitter: '@ScottWRobinson'
    };


    db.insert(scott, function(err, doc) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
    });

    // console.log(fs)
    // var filepath = "G:/eja.txt"
    // var content;
    // fs.readFile(filepath, 'utf8', this.doSomething)
    // var text = fs.readFileSync(filepath,'utf8')
    // this.setState({ data: text });
  }
  addPost7 = (event) => {
    event.stopPropagation();
    console.log(remote)

    db.find({ name: 'Scott' }, function (err, docs) {
        console.log(docs);
    });
    db.find({ b: {$regex: /neraka/} }, function (err, docs) {
        console.log(docs);
    });
    db.find({ b: {$regex: /syaitan/} }, function (err, docs) {
        console.log(docs);
    });
    db.find({ name: {$regex: /ot/} }, function (err, docs) {
        console.log(docs);
    });
    db.find({ c: "114" , v: "2" } , function (err, docs) {
        console.log(docs);
    });
  }
  addPost8 = (event) => {
    event.stopPropagation();
    console.log(remote)
    console.log(fs)
    var filepath = "G:/eja9.txt"
    var content = fs.readFileSync(filepath, 'utf8');
    console.log(content);
    Papa.parse(content, {
        delimiter: "\t",
        // step: function(row){
        //     console.log("Row: ", row.data);
        // },
        complete: function(results, file) {
        	// console.log("Parsing complete:", results);
          for (var i = 0; i < results.data.length-1; i++) {
            // console.log(results.data[i]);
            var scott = {
                c: results.data[i][0],
                v: results.data[i][1],
                a: results.data[i][2],
                i: results.data[i][3],
                b: results.data[i][4],
            };

            db.insert(scott, function(err, doc) {
                console.log('Inserted', doc.name, 'with ID', doc._id);
            });

          }
        }
    });
  }

  // doSomething2 = (err, data) => {
  //   if (err) return console.log(err);
  //   console.log(err)
  //   console.log(this)
  //   console.log(data)
  //   parsed = babyparse.parse(data);
  //   console.log(parsed);
  //   console.log('text')
  //   // this.setState({ data: data });
  // }
  doSomething = (err, data) => {
    if (err) return console.log(err);
    console.log(err)
    console.log(this)
    console.log(data)
    console.log('text')
    this.setState({ data: data });
  }
  expand(event) {
    console.log('expand');
    this.setState({ expanded: true });
  }

  render() {
    return (
      <div className={styles.nav}>

        {/* <div className="uk-grid">
          <div className="uk-width-1-2" onClick={this.handleClick.bind(this)}>
            <Link to="/counter">to Counter {this.props.counter}</Link>
          </div>
          <div className="uk-width-1-2"><SearchBox {...this.props} /></div>
        </div> */}
        <div className="uk-grid">

          <div className={styles.searchContainer}>

            <button className={styles.logo} onBlur={this.collapse.bind(this)} onFocus={this.expand.bind(this)}>AYSAAR</button>
            {this.state.expanded &&
              <div className={styles.dropdown}>
                <div onMouseDown={this.addPost.bind(this)} >Add Post</div>
                <div onMouseDown={this.addPost2.bind(this)} >Mufradaat</div>
                <div onMouseDown={this.addPost3.bind(this)} >Document</div>
                <div onMouseDown={this.addPost5.bind(this)} >Try Def5</div>
                <div onMouseDown={this.addPost6.bind(this)} >Try Def6</div>
                <div onMouseDown={this.addPost7.bind(this)} >Find</div>
                <div onMouseDown={this.addPost8.bind(this)} >Add Quran</div>
              </div>}
              {this.state.data}
            <SearchBox {...this.props} />
          </div>

        </div>

      </div>
    );
  }
}
