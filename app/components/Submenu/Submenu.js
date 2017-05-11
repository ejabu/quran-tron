// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Submenu.css';
import SearchBox from './SearchBox/SearchBox';
import { hideMenu } from '../../actions/layout';
import { toggleFont } from '../../actions/layout';
import {remote} from 'electron';

@connect(state => ({ verseIndex: state.verseIndex , result: state.result, layout: state.layout}),)
export default class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuHide: false,
      search: '',
      search2: '',
      index: 0,
      result:[],
    };
  }
  hideMenu = (event) => {
    const { dispatch } = this.props;
    event.stopPropagation();
    dispatch(hideMenu());
  }
  toggleFont = (event) => {
    const { layout, dispatch } = this.props;
    event.stopPropagation();
    dispatch(toggleFont(layout));
  }
  smallMenu = (event) => {
    var win = remote.getCurrentWindow();
    var nextBound = {
      'x':96,
      'y':61,
      'width':540,
      'height':560
    }
    win.setBounds(nextBound);
    const { dispatch } = this.props;
    event.stopPropagation();
    dispatch(hideMenu());
  }
  bigMenu = (event) => {
    var win = remote.getCurrentWindow();
    var nextBound = {
      'x':96,
      'y':61,
      'width':1074,
      'height':603
    }
    win.setBounds(nextBound);
  }
  // fullMenu = (event) => {
  //   var win = remote.getCurrentWindow();
  //   win.setFullScreen(true)
  // }
  buttonResultClick = (par1, par2, event) => {
    event.stopPropagation();
    this.props.searchCallback(`${par1}:${par2}`)
  }

  renderResult(item, index) {
    return (
      <div className={styles.items} key={index} onClick={this.buttonResultClick.bind(this,item.c,item.v)}>
        <div className={styles.itemLabel} >QS</div>

        <div className={styles.item} >{item.c} : {item.v}</div>
      </div>
    );
  }

  render() {
    const items = this.state.result;
    const { layout, verseIndex, result } = this.props;

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.buttonMenu} onMouseDown={this.hideMenu.bind(this)}>
          Hide
          <a className="arrowLeft" ></a>
        </div>
        <div className="uk-float-right">
          <div className={styles.buttonMenu} onMouseDown={this.toggleFont.bind(this)}>
            { layout.font == "OLD_FONT" ?  <a className="" >A</a> : <a className="" >B</a> }
          </div>
          <div className={styles.buttonMenu} onMouseDown={this.smallMenu.bind(this)}>

            <a className="smaller " ></a>
          </div>
          <div className={styles.buttonMenu} onMouseDown={this.bigMenu.bind(this)}>

            <a className="larger " ></a>
          </div>
        </div>
        {/* <div className={styles.buttonMenu} onMouseDown={this.fullMenu.bind(this)}>
          Full
          <a className="arrowLeft " ></a>
        </div> */}
        <div>
          <SearchBox {...this.props} />
          <grey>Search Result {result.length}</grey>
        </div>
        <div className={styles.itemBox}>
          {result.map((item, index) => (this.renderResult(item, index)))}
        </div>
      </div>
    );
  }
}
