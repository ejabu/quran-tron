// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Submenu.css';
import SearchBox from './SearchBox/SearchBox';

@connect(state => ({ verseIndex: state.verseIndex , result: state.result}),)
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

  renderResult(item, index) {
    return (
      <div className={styles.item} key={index}>
        <div >{item.c} : {item.v}</div>
      </div>
    );
  }

  render() {
    const items = this.state.result;
    const { verseIndex, result } = this.props;
    return (
      <div className={styles.mainWrapper}>
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
