import React, { Component } from 'react';
import db from '../../db';
import DictionariesTemplate from './DictionariesTemplate';
import DictionaryCreate from './DictionaryCreate';
import DictionaryList from './DictionaryList';


class Dictionaries extends Component {
  constructor() {
    super();
    this.state = { dictionaries: [] };
    this.handleDictionaryCreate = this.handleDictionaryCreate.bind(this);
    // TODO 테이블이름 수정 / 링크걸어 테이블 수정 
    // this.handleDictionaryTitleEdit = this.handleDictionaryTitleEdit.bind(this);
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

  // TODO 테이블이름 수정 
  // handleDictionaryTitleEdit(id, done) {
  //   db.table('dictionaries')
  //     .update(id, { done })
  //     .then(() => {
  //       const dictionaryToUpdate = this.state.dictionaries.find((dictionary) => dictionary.id === id);
  //       const newList = [
  //         ...this.state.dictionaries.filter((dictionary) => dictionary.id !== id),
  //         Object.assign({}, dictionaryToUpdate, { done })
  //       ];
  //       this.setState({ dictionaries: newList });
  //     });
  // }

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
          // handleDictionaryTitleEdit={this.handleDictionaryTitleEdit}
          handleDictionaryDelete={this.handleDictionaryDelete}
        />
      </DictionariesTemplate>

    );
  }
}

export default Dictionaries;
