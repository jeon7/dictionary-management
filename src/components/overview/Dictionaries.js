import React, { Component } from 'react';
import db from '../../db';
import DictionariesTemplate from './DictionariesTemplate';
import DictionaryCreate from './DictionaryCreate';
import DictionaryList from './DictionaryList';

class Dictionaries extends Component {
  constructor() {
    super();
    this.state = {
      dictionaries: [],
    };
    this.handleDictionaryCreate = this.handleDictionaryCreate.bind(this);
    this.handleDictionaryDelete = this.handleDictionaryDelete.bind(this);
  }

  componentDidMount() {
    db.table('dictionaries')
      .toArray()
      .then((dictionaries) => {
        this.setState({ dictionaries });
      });
  }

  handleDictionaryCreate(title) {
    const dictionary = {
      title
    };

    db.table('dictionaries')
      .add(dictionary)
      .then((id) => {
        const newList = [...this.state.dictionaries, Object.assign({}, dictionary, { id })];
        this.setState({ dictionaries: newList });
      });
  }

  handleDictionaryDelete(id) {
    // delete all the records in the dictionary to delete
    let dictionaryDelete = this.state.dictionaries.filter((dictionary) => dictionary.id === id);
    let dictionaryTitleDelete = dictionaryDelete[0].title;

    db.table('records')
      .where("dictionary_title").anyOf(dictionaryTitleDelete)
      .delete()
      .then(() => {
        console.log('check records table');
      });

    // delete dictionary
    db.table('dictionaries')
      .delete(id)
      .then(() => {
        const newList = this.state.dictionaries.filter((dictionary) => dictionary.id !== id);
        this.setState({ dictionaries: newList });
      });
  }

  render() {
    return (
      <DictionariesTemplate>
        <DictionaryCreate
          handleDictionaryCreate={this.handleDictionaryCreate}
        />
        <DictionaryList
          dictionaries={this.state.dictionaries}
          handleDictionaryDelete={this.handleDictionaryDelete}
        />
      </DictionariesTemplate>
    );
  }
}

export default Dictionaries;
