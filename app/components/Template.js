// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { meanNew, wordChanged } from '../actions/translations';
import NavBar from './NavBar/NavBar';

import styles from './Doc.css';

@connect(state => ({ counter: state.counter, suggestions: state.suggestions, translations: state.translations, posts: state.posts, result: state.result }),)
export default class Doc extends Component {
  constructor(props) {
    super(props);
    this.state = {

      extend: false
    };
  }


  render() {
    const { translations } = this.props;

    return (
      <div>
        <div className={styles.container}>
          <NavBar {...this.props} />
          <div className={styles.box10}>
            <div className={`${styles.con1} uk-flex uk-width-1-1`}>


            </div>


          </div>

        </div>
      </div>
    );
  }
}
