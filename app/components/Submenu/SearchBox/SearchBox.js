// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './SearchBox.css';
import { queryChanged, resultChanged } from '../../../actions/suggestions';
import { QueryParser } from './SearchEngine';

@connect(state => ({ verseIndex: state.verseIndex }),)
export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      search2: '',
      index: 0
    };
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const query = event.target.value;
    this.setState({ search: event.target.value, search2: event.target.value });
  }

  handleKeyDown = (event) => {
    const { dispatch } = this.props;
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        if (event.target.value.indexOf(':') > -1) {
          this.props.searchCallback(event.target.value)
        }
        else{
          console.log('bukan :');
          QueryParser(dispatch, event.target.value)
          // var neQuery = QueryParser(event.target.value)
          // console.log(neQuery);
        }
      }
    }
  }

  render() {
    const items = this.props.suggestions;
    const choosenIndex = this.state.index;
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.box9 + " searchBox"}>
            <a className="searchBox"></a>
          </div>
          <div className={styles.box10}>
            <input type="text" value={this.state.search}  onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)} />
          </div>
        </div>

      </div>
    );
  }
}
