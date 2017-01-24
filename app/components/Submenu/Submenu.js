// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Submenu.css';
import SearchBox from './SearchBox/SearchBox';

export default class Submenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      search: '',
      search2: '',
      index: 0
    };
  }

  renderTranslations(props, index, choosenIndex) {
    return (
      <div className={styles.item} key={index}>
        {/* <li key={index}  className={style}>{props.name}</li> */}
        {/* <textarea rows="1" /> */}
        <div >{props}</div>
      </div>
    );
  }
  render() {
    const items = this.props.translations;
    // const items = this.props.suggestions;
    const choosenIndex = this.state.index;
    console.log(this.props);
    return (
      <div className={styles.mainWrapper}>
        <div>
          <SearchBox {...this.props} />
          <grey>Search of</grey>
        </div>
        <div className={styles.itemBox}>
          {/* {items.map((item, index) => (this.renderTranslations(item, index, choosenIndex)))} */}
        </div>
      </div>
    );
  }
}
