// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { meanNew, wordChanged } from '../actions/translations';
import WordList from './WordList/WordList';
import Examples from './Examples/Examples';
import NavBar from './NavBar/NavBar';

import styles from './Qamus.css';

@connect(state => ({ counter: state.counter, suggestions: state.suggestions, translations: state.translations, posts: state.posts, result: state.result }),)
export default class Qamus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 'us',
      to: 'id',
      word: '',
      mean: '',
      extend: false
    };
  }

  // componentWillMount() {
  //   const { translations } = this.props;
  //   this.setState({ mean: translations[0] });
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   // const { translations } = nextState;
  //   console.log(nextState);
  //   console.log(nextProps);
  //   console.log(nextProps.translations);
  //   const translations = nextProps.translations;
  //
  //   console.log('translations');
  //   console.log(translations);
  //   if (translations === undefined) {
  //     console.log('empty');
  //     this.setState({ mean: '' });
  //   } else {
  //     console.log('isi');
  //
  //     this.setState({ mean: translations[0] });
  //   }
  //   return true;
  // }
  componentWillReceiveProps(nextProps) {
    const translations = nextProps.translations;
    this.setState({ mean: translations[0] });
    console.log(translations);
  }
  translate(from = false, to = false, word = false) {
    const { dispatch } = this.props;
    const nfrom = (from === false)
      ? this.state.from
      : from;
    const nto = (to === false)
      ? this.state.to
      : to;

    console.log(nfrom, nto, word);
    if (word === false || word === undefined || word === '') {
      this.setState({ word: '' });
    } else {
      wordChanged(dispatch, nfrom, nto, word);
    }
  }
  addNew(mean) {
    const { dispatch } = this.props;
    const from = this.state.from;
    const to = this.state.to;
    const word = this.state.word;
    meanNew(dispatch, from, to, word, mean);
  }

  handleKeyDown = (event) => {
    const { dispatch } = this.props;
    const word = this.state.word;
    console.log(event.key);
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        console.log('kepencet');
        // Kalau gak ada isinya, gak bakal ke trigger
        this.setState({ extend: true });
        this.translate(false, false, word);
      }
    }// else if (event.key === 'Tab') {
    //   console.log('move');
    // } else {
    //   // this.setState({ extend: false });
    // }
  }
  handleNew = (event) => {
    const { dispatch } = this.props;
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        this.addNew(event.target.value);
        event.target.value = '';
      }
    }
  }
  handleChange(event) {
    this.setState({ word: event.target.value, mean: '' });
  }
  wordChange(lang, event) {
    const from = this.state.from;
    const to = this.state.to;
    const word = this.state.word;
    const mean = this.state.mean;
    this.setState({ from: lang, mean: '', extend: false });
    this.translate(lang, to, word);

    // Jika FROM nya sama dengan TO yang sekarang, maka di FLIP
    // if (lang === to) {
    //   // JIKA sekarang punya arti, nah artinya ini dijaddin WORD
    //   if (mean !== undefined) {
    //     console.log('meansebenarnya');
    //     console.log(mean);
    //     this.translate(lang, from, mean);
    //     this.setState({ from: lang, to: from, word: mean });
    //   } else {
    //     this.setState({ from: lang, to: from, word: '' });
    //   }
    // } else if (word !== undefined) {
    //   this.translate(lang, to, word);
    //   this.setState({ from: lang, mean: '' });
    // }
  }
  meanChange(lang, event) {
    const from = this.state.from;
    const to = this.state.to;
    const word = this.state.word;
    const mean = this.state.mean;
    this.setState({ to: lang, mean: '' });
    this.translate(from, lang, word);
    // if (lang === from) {
    //   if (mean !== undefined) {
    //     this.translate(to, lang, mean);
    //     this.setState({ from: to, to: lang, word: mean });
    //   }
    // } else if (word !== '') {
    //   this.translate(from, lang, word);
    //   this.setState({ to: lang, mean: '' });
    // }
  }

  render() {
    const { translations } = this.props;
    const wordEnglish = (this.state.from === 'us')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;
    const wordArabic = (this.state.from === 'sa')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;
    const wordBahasa = (this.state.from === 'id')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;
    const meanEnglish = (this.state.to === 'us')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;
    const meanArabic = (this.state.to === 'sa')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;
    const meanBahasa = (this.state.to === 'id')
      ? `${styles.choose} ${styles.choosen}`
      : styles.choose;

    const fromArabic = (this.state.from === 'sa')
        ? `${styles.word} ${styles.arabicInput}`
        : styles.word;
    const toArabic = (this.state.to === 'sa')
        ? `${styles.meaning} ${styles.arabicInput}`
        : styles.meaning;

    return (
      <div>
        <div className={styles.container}>
          <NavBar {...this.props} />
          <div className={styles.box10}>
            <div className={`${styles.con1} uk-flex uk-width-1-1`}>
              <div className={`${styles.conn1} uk-flex uk-width-1-2`}>
                <div className={`${styles.chooseCnt}`}>
                  <div onClick={this.wordChange.bind(this, 'us')} className={wordEnglish}>
                    English
                  </div>
                  <div onClick={this.wordChange.bind(this, 'sa')} className={wordArabic}>
                    Arabic
                  </div>
                  <div onClick={this.wordChange.bind(this, 'id')} className={wordBahasa}>
                    Bahasa
                  </div>
                </div>
                <div className={'uk-flex uk-width-1-1'}>
                  <textarea maxLength="50" className={fromArabic} rows="3" onKeyDown={this.handleKeyDown.bind(this)} value={this.state.word} onChange={this.handleChange.bind(this)} type="text" />
                </div>
              </div>
              <div className={`${styles.conn2} uk-flex uk-width-1-2`}>
                <div className={`${styles.chooseCnt}`}>
                  <div onClick={this.meanChange.bind(this, 'us')} className={meanEnglish}>
                    English
                  </div>
                  <div onClick={this.meanChange.bind(this, 'sa')} className={meanArabic}>
                    Arabic
                  </div>
                  <div onClick={this.meanChange.bind(this, 'id')} className={meanBahasa}>
                    Bahasa
                  </div>
                </div>
                <div className={'uk-flex uk-width-1-1'}>
                  <textarea maxLength="50" className={toArabic} rows="3" disabled type="text" value={this.state.mean} />
                </div>
              </div>
            </div>

            <div className={`${styles.con1} uk-flex uk-width-1-1`}>
              <div className={`${styles.conn1} uk-flex uk-width-1-2`}>
                {this.state.extend && <div>

                  <Examples currentWord={this.state.word} />

                </div>}
              </div>
              {this.state.extend && <div className={`${styles.transWrapper} uk-flex uk-width-1-2`}>

                <WordList {...this.props} currentWord={this.state.word} />
                <input placeholder="Add New Definition" onKeyDown={this.handleNew.bind(this)} className={'uk-width-1-1'} />
              </div>}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
