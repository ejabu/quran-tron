/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Resizable from 'react-resizable-box';

import styles from './Home.css';
// import NavBar from './NavBar/NavBar';
import Submenu from './Submenu/Submenu';
import Result from './Result/Result';
import * as CounterActions from '../actions/counter';
import Content from './Content/Content';

@connect(
  state => ({
    counter: state.counter,
    suggestions: state.suggestions,
    translations: state.translations,
    posts: state.posts,
    result: state.result }),
  )
export default class Home extends Component {
  // KALAU INI GAK DI COMMENT, NAV BAR HARUS CONNECT LAGI. KALAU DI
  // COMMENT, tinggal pas {...this.props}
  // static propTypes = {
  //   counter: React.PropTypes.number.isRequired,
  // }

  constructor(props) {
    super(props);
    this.state = {
      width: '320px',
      query: '',
    };
  }

  searchCallback = (query) => {
    var toSet2 = { query:  query }
    console.log(this);
    console.log('toSet2');
    console.log(toSet2);
    this.setState(toSet2);
  }


  render() {
    var submenuStyle = {
      // background: "#eee",
      display: "inline-block",
      // background: "#fff",//backgroundsubmenu
      background: "#fafafa",//backgroundsubmenu
      height: "100%",
      width: "100%",
      borderRight: "1px solid rgba(0,0,0,.07)",

    };
    var kerupuk = {
      display: "inline-block",
      zIndex:"9",


    };
    var mainContentStyle = {
      // background: "#eee",
      background: "#fff",
      // border: "3px solid black",
      display: "inline-block",
      position: "absolute",
      top:"0px",
      left:this.state.width,
      right:"0px",
      bottom:"0px",
      zIndex:"5",
      overflowY:"auto",

    };
    var handleStyle = {
      right: {
        position: 'absolute',
        width: '60px',
        height: '100%',
        top: '50px',
        right: '-30px',
        cursor: 'ew-resize'
      },
    }

    var onResizeStopEja = function(direction, styleSize, clientSize, delta){
      console.log('eja')
      console.log(this)
      console.log(styleSize)
      console.log(delta)
      // this.setState({ width: (parseInt(this.state.width)-parseInt(delta.width))+'px' });
      console.log('calc('+this.state.width+' - '+delta.width+' )px');
      var toSet = { width: 'calc('+this.state.width+' - '+delta.width+'px )' }
      var width_awal = 320;
      var width_akhir = styleSize.width;
      var delta = width_awal - width_akhir
      // var toSet2 = { width: 'calc( 40% + '+ delta+ 'px )' }
      var toSet2 = { width:  styleSize.width+ 'px' }
      console.log(toSet2);
      this.setState(toSet2);

    }
    var isResizableDict = {top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
    return (
      <div className={styles.container}>

          <Resizable
          customClass="submenu"
          width={320}
          height={"100%"}
          minWidth={160}
          minHeight={160}
          maxWidth={480}
          maxHeight={480}
          isResizable={ isResizableDict }
          handleStyle = {handleStyle}
          customStyle={kerupuk}
          onResizeStop = {onResizeStopEja.bind(this)}
          >
            <div style={submenuStyle}>
              <Submenu searchCallback={this.searchCallback}/>
            </div>
          </Resizable>
          <div style={mainContentStyle}>
            <Content query={this.state.query}/>
          </div>
      </div>

    );
  }
}
