// @flow
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {meanNew, wordChanged} from '../actions/translations';
import NavBar from './NavBar/NavBar';

import styles from './Doc.css';
//a.replace( /[\u064f]/g, "")

@connect(state => ({counter: state.counter, suggestions: state.suggestions, translations: state.translations, posts: state.posts, result: state.result}),)
export default class Doc extends Component {
  constructor(props) {
    super(props);
    this.state = {

      value: '',
      noharakat: ''
    };
  }

  clearHarakat(jumlah) {
    jumlah=jumlah.replace(/[\u064b-\u065b]/g, "")
    return jumlah
  }
  noHarakat() {
    const value2 = this.state.value;
    var value3 = this.clearHarakat(value2)
    this.setState({ noharakat: value3});

  }
  handleChange(event) {
      this.setState({value: event.target.value});
    }
  render() {
    const {translations} = this.props;

    return (
      <div>
        <div className={styles.container}>
          <NavBar {...this.props}/>
          <div className={styles.box10}>
            <div className={`${styles.con1} uk-flex uk-width-1-1`}>
              <div className={'uk-flex uk-width-1-1'}>
                <textarea maxLength="50" onChange={this.handleChange.bind(this)} value={this.state.value} className={styles.arabicInput} rows="3" type="text"/>
              </div>
              <div className={'uk-flex uk-width-1-1'}>
                <div >

                  <div onClick={this.noHarakat.bind(this)}>
                    Clear Harakat
                  </div>

                </div>
              </div>
              <div className={'uk-flex uk-width-1-1'}>
                <textarea maxLength="50" value={this.state.noharakat} className={styles.arabicInput} rows="3" type="text"/>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}
