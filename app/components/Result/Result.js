/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Result.css';

export default class Result extends Component {
  Comment(props, index) {
    // console.log('props');
    // console.log(props);
    // console.log(index);
    return (
      <div key={index}>
        <div className={styles.wrapper} >
          <div className={styles.top_container}>
            <div className={styles.title}>{props.surname}
            </div>
            <div className={styles.cob}>{props.surname}
            </div>
            <div className={styles.cob1}>{props.surname}
            </div>
          </div>
          <div className={styles.bottom_container}>
            <div className={styles.cob2}>{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname}{props.surname} {props.surname}{props.surname} {props.surname}{props.surname}{props.surname}{props.surname}
            </div>
            <div className={styles.cob3}>LEARN MORE
            </div>
          </div>
        </div>
      </div>

    );
  }

  render() {
    const items = this.props.result;
    // console.log(items);
    return (
      <div className={styles.column}>
        {/* <div>asd</div> */}
        {items.map((item, index) => (this.Comment(item, index)))}
      </div>

    );
  }
}
