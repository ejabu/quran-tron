// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './SearchBox.css';
import { queryChanged, resultChanged } from '../../../actions/suggestions';

export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      search: '',
      search2: '',
      index: 0
    };
  }

  collapse(event) {
    this.setState({ expanded: false });
  }
  expand(event) {
    this.setState({ expanded: true });
  }
  handleMouseEnter(index, obj, event) {
    this.setState({
      index: index + 1
    });
  }

  handleOptionsClick(index, proxy, event) {
    const { dispatch } = this.props;
    event.preventDefault();
    const firstEl = {
      name: this.state.search2
    };
    const options = [
      ...[firstEl],
      ...this.props.suggestions
    ];
    this.passQuery();

    this.setState({
      search: options[index + 1].name,
      index: index + 1,
      expanded: false
    });
  }
  handleChange(event) {
    console.log('handleChange');
    const { dispatch } = this.props;
    const query = event.target.value;
    if (this.timeout_suggest) {
      clearTimeout(this.timeout_suggest);
    }
    if (this.timeout_result) {
      clearTimeout(this.timeout_result);
    }
    if (event.target.value !== '') {
      this.timeout_suggest = setTimeout(() => {
        console.log('timeout_suggest');

        queryChanged(dispatch);
      }, 250);
      this.timeout_result = setTimeout(() => {
        console.log('timeout_result');

        this.delayPassQuery(query);
      }, 2500);
    }
    this.setState({ search: event.target.value, search2: event.target.value, index: 0 });
  }


  arrowUp() {
    const firstEl = {
      name: this.state.search2
    };
    const options = [
      ...[firstEl],
      ...this.props.suggestions
    ];

    let newIndex = this.state.index;
    if (newIndex > 0) {
      newIndex -= 1;
    } else {
      newIndex = options.length - 1;
    }
    this.setState({ search: options[newIndex].name, index: newIndex });
    this.delayPassQuery(options[newIndex].name);
  }
  arrowDown() {
    const firstEl = {
      name: this.state.search2
    };
    const options = [
      ...[firstEl],
      ...this.props.suggestions
    ];

    let newIndex = this.state.index;
    if (newIndex < options.length - 1) {
      newIndex += 1;
    } else {
      newIndex = 0;
    }
    this.setState({ search: options[newIndex].name, index: newIndex });
    this.delayPassQuery(options[newIndex].name);
  }
  passQuery() {
    const { dispatch } = this.props;
    const firstEl = {
      name: this.state.search2
    };
    const options = [
      ...[firstEl],
      ...this.props.suggestions
    ];
    const index = this.state.index;
    resultChanged(dispatch, options[index].name);
  }
  delayPassQuery(query) {
    const { dispatch } = this.props;
    const index = this.state.index;
    resultChanged(dispatch, query);
  }
  handleKeyDown = (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        this.passQuery();
      }
    } else if (event.keyCode === 38) {
      this.arrowUp();
    } else if (event.keyCode === 40) {
      this.arrowDown();
    }
  }
  renderSuggestions(props, index, choosenIndex) {
    let style;
    if (choosenIndex === index + 1) {
      style = styles.chosen;
    }
    return (
      <li key={index} onMouseDown={this.handleOptionsClick.bind(this, index)} onMouseEnter={this.handleMouseEnter.bind(this, index)} className={style}>{props.name}</li>
    );
  }
  render() {
    const items = this.props.suggestions;
    const choosenIndex = this.state.index;
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.box9}>
            <a>{}</a>
          </div>
          <div className={styles.box10}>
            <input type="text" value={this.state.search} onKeyDown={this.handleKeyDown.bind(this)} onBlur={this.collapse.bind(this)} onFocus={this.expand.bind(this)} onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        {this.state.expanded && <div className={styles.box2}>
          <ul>
            {items.map((item, index) => (this.renderSuggestions(item, index, choosenIndex)))}
          </ul>
        </div>}
      </div>
    );
  }
}
