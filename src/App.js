import React, { Component } from 'react';
import db from './db';

import DictionaryCreate from './DictionaryCreate';
import DictionaryList from './DictionaryList';
import DictionariesTemplate from './DictionariesTemplate';

class App extends Component {
  constructor() {
    super();
    this.state = { dictionaries: [] };
    this.handleDictionaryCreate = this.handleDictionaryCreate.bind(this);
    this.handleDictionaryEdit = this.handleDictionaryEdit.bind(this);
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
      title,
      done: false,
      // to save domains and ranges
      records: []
    };

    db.table('dictionaries')
      .add(dictionary)
      .then((id) => {
        const newList = [...this.state.dictionaries, Object.assign({}, dictionary, { id })];
        this.setState({ dictionaries: newList });
      });
  }

  handleDictionaryEdit(id, done) {
    db.table('dictionaries')
      .update(id, { done })
      .then(() => {
        const dictionaryToUpdate = this.state.dictionaries.find((dictionary) => dictionary.id === id);
        const newList = [
          ...this.state.dictionaries.filter((dictionary) => dictionary.id !== id),
          Object.assign({}, dictionaryToUpdate, { done })
        ];
        this.setState({ dictionaries: newList });
      });
  }

  handleDictionaryDelete(id) {
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
        <DictionaryCreate handleDictionaryCreate={this.handleDictionaryCreate} />
        <DictionaryList
          dictionaries={this.state.dictionaries}
          handleDictionaryEdit={this.handleDictionaryEdit}
          handleDictionaryDelete={this.handleDictionaryDelete}
        />
      </DictionariesTemplate>

    );
  }
}

export default App;
