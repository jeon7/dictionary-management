import React, { Component } from 'react';
import db from '../../db';
import RecordsTemplate from './RecordsTemplate';
import RecordAdd from './RecordAdd';
import RecordList from './RecordList';


class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
    };
    this.handleRecordAdd = this.handleRecordAdd.bind(this);
    this.handleRecordUpdate = this.handleRecordUpdate.bind(this);
    this.handleRecordDelete = this.handleRecordDelete.bind(this);
  }

  componentDidMount() {
    db.table('records')
      .toArray()
      .then((records) => {
        this.setState({ records });
      });
  }

  handleRecordAdd(dictionary_title, domain, range) {
    const record = {
      dictionary_title,
      domain,
      range,
    };

    db.open().catch(function (e) {
      console.error("Open failed: " + e.stack);
    })

    db.table('records')
      .add(record)
      .then((id) => {
        const newList = [...this.state.records, Object.assign({}, record, { id })];
        this.setState({ records: newList });
      });
  }

  // handleRecordUpdate(id, done) {
  //   db.table('records')
  //     .update(id, { dictionary_title, domain, range })
  //     .then(() => {
  //       const recordToUpdate = this.state.records.find((record) => record.id === id);
  //       const newList = [
  //         ...this.state.records.filter((record) => record.id !== id),
  //         Object.assign({}, recordToUpdate, {  dictionary_title, domain, range  })
  //       ];
  //       this.setState({ records: newList });
  //     });
  // }

  // TODO test
  handleRecordUpdate(id) {
    window.confirm('hey');
  }


  handleRecordDelete(id) {
    db.table('records')
      .delete(id)
      .then(() => {
        const newList = this.state.records.filter((record) => record.id !== id);
        this.setState({ records: newList });
      });
  }

  render() {
    //test
    console.log("match.params: ");
    console.log(this.props.match.params.dictionary_title);

    let selected_dictionary_title = this.props.match.params.dictionary_title;

    return (
      <>
        <RecordsTemplate selected_dictionary_title={selected_dictionary_title}>
          <RecordAdd
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordAdd={this.handleRecordAdd}
          />
          <RecordList
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordUpdate={this.handleRecordUpdate}
            handleRecordDelete={this.handleRecordDelete}
          />
        </RecordsTemplate>

      </>
    );
  }
}

export default Records;
