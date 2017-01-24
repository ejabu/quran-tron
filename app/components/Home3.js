// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="uk-grid">asda</div>
        <button className="uk-button-large">asda</button>
        <div className="pure-hidden-sm pure-hidden-md">asda</div>
        <div className="pure-visible-lg">hhalg</div>
        <div className="pure-visible-sm">hhasm</div>
        <div className="pure-visible-xs">hhaxs</div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
