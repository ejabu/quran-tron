// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Submenu.css';
import SearchBox from './SearchBox/SearchBox';
import { hideMenu } from '../../actions/layout';

@connect(state => ({ verseIndex: state.verseIndex , result: state.result}),)
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
    const { verseIndex, result } = this.props;
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.buttonMenu} onMouseDown={this.hideMenu.bind(this)}>
          Hide
          <a className="float-left " ></a>
        </div>
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
