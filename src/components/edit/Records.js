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
    this.checkDuplicatesAddRecord = this.checkDuplicatesAddRecord.bind(this);
    this.checkDuplicatesMarkRecord = this.checkDuplicatesMarkRecord.bind(this);
    this.checkForks = this.checkForks.bind(this);
    this.checkCycles = this.checkCycles.bind(this);
    this.checkChains = this.checkChains.bind(this);
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

  handleRecordUpdate(id, domain, range) {
    db.table('records')
      .update(id, { domain, range })
      .then(() => {
        const recordToUpdate = this.state.records.find((record) => record.id === id);
        let newList = [
          ...this.state.records.filter((record) => record.id !== id),
          Object.assign({}, recordToUpdate, { domain, range })
        ];
        // sort by id 
        newList.sort((a, b) => a['id'] - b['id']);
        this.setState({ records: newList });
      })
  }

  handleRecordDelete(id) {
    db.table('records')
      .delete(id)
      .then(() => {
        const newList = this.state.records.filter((record) => record.id !== id);
        this.setState({ records: newList });
      });
  }

  checkDuplicatesAddRecord(newDomain, newRange, selected_dictionary_title) {
    // records in same dictionary
    const selected_records = this.state.records.filter((record) =>
      record.dictionary_title === selected_dictionary_title);

    // records with same domain
    const records_same_domain = selected_records.filter((record) =>
      newDomain === record.domain);

    // duplicates: records with same domain and same range
    const records_duplicates = records_same_domain.filter((record) =>
      newRange === record.range);

    if (records_duplicates.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkDuplicatesMarkRecord(newDomain, newRange, selected_dictionary_title) {
    // records in same dictionary
    const selected_records = this.state.records.filter((record) =>
      record.dictionary_title === selected_dictionary_title);

    // records with same domain
    const records_same_domain = selected_records.filter((record) =>
      newDomain === record.domain);

    // duplicates: records with same domain and same range
    const records_duplicates = records_same_domain.filter((record) =>
      newRange === record.range);

    //test
    console.info('JSON.stringify(records_duplicates): ' + JSON.stringify(records_duplicates));

    if (records_duplicates.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  checkForks(newDomain, newRange, selected_dictionary_title) {
    // records in same dictionary
    const selected_records = this.state.records.filter((record) =>
      record.dictionary_title === selected_dictionary_title);

    // records with same domain
    const records_same_domain = selected_records.filter((record) =>
      newDomain === record.domain);

    // forks: records with same domain and different range
    const records_forks = records_same_domain.filter((record) =>
      newRange !== record.range);

    if (records_forks.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkCycles(newDomain, newRange, selected_dictionary_title) {
    if (newDomain === newRange) {
      return false;
    }

    // records in same dictionary
    const selected_records = this.state.records.filter((record) =>
      record.dictionary_title === selected_dictionary_title);

    // domain-range conflict: new domain = same range in records
    const records_domain_range_conflict = selected_records.filter((record) =>
      newDomain === record.range);

    // cycles: new range = same domain in domain-range conflict records
    const records_cycles = records_domain_range_conflict.filter((record) =>
      newRange === record.domain);

    if (records_cycles.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkChains(newDomain, newRange, selected_dictionary_title) {
    if (newDomain === newRange) {
      return false;
    }
    // records in same dictionary
    const selected_records = this.state.records.filter((record) =>
      record.dictionary_title === selected_dictionary_title);

    // domain-range conflict 1
    const records_domain_range_conflict1 = selected_records.filter((record) =>
      newDomain === record.range && record.domain !== record.range);

    // chain case 1
    const records_chain1 = records_domain_range_conflict1.filter((record) =>
      newRange !== record.domain);

    // domain-range conflict 2
    const records_domain_range_conflict2 = selected_records.filter((record) =>
      newRange === record.domain && record.domain !== record.range);

    // chain case 2
    const records_chain2 = records_domain_range_conflict2.filter((record) =>
      newDomain !== record.range);

    if (records_chain1.length > 0 || records_chain2.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let selected_dictionary_title = this.props.match.params.dictionary_title;

    return (
      <>
        <RecordsTemplate selected_dictionary_title={selected_dictionary_title}>
          <RecordAdd
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordAdd={this.handleRecordAdd}
            checkDuplicatesAddRecord={this.checkDuplicatesAddRecord}
            checkForks={this.checkForks}
            checkCycles={this.checkCycles}
            checkChains={this.checkChains}
          />
          <RecordList
            records={this.state.records}
            selected_dictionary_title={selected_dictionary_title}
            handleRecordUpdate={this.handleRecordUpdate}
            handleRecordDelete={this.handleRecordDelete}
            checkDuplicatesMarkRecord={this.checkDuplicatesMarkRecord}
            checkForks={this.checkForks}
            checkCycles={this.checkCycles}
            checkChains={this.checkChains}
          />
        </RecordsTemplate>
      </>
    );
  }
}

export default Records;
