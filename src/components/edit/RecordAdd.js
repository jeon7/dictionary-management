import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
// import Records from './Records';

const StyledInsert = styled.div`
    display: flex;
    background: #495057;
    input {
      background: none;
      outline: none;
      border: none;
      padding: 0.5rem;
      font-size: 1.125rem;
      line-height: 1.5;
      color: white;
      border: 1px solid black;
      &::placeholder {
        color: #dee2e6;
      }
      flex: 1;
    }
    button{
      background: none;
      outline: none;
      border: none;
      background: #868e96;
      color: white;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: 0.1s background ease-in;
      &:hover {
        background: #abd5bd;
      }
    }
`;

class RecordAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary_title: this.props.selected_dictionary_title,
      domain: '',
      range: '',
    };
    this.recordAdd = this.recordAdd.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);

  }

  recordAdd() {
    // both domain and range must be given
    if (this.state.dictionary_title && this.state.domain && this.state.range) {

      // records validation check
      const isDuplicates = this.props.checkDuplicates(this.state.domain, this.state.range);
      const isForks = this.props.checkForks(this.state.domain, this.state.range);
      // const isCycles = this.checkCycles(this.state.domain, this.state.range);
      // const isChains = this.checkChains(this.state.domain, this.state.range);

      // TODO modal warning, save possible
      if (isDuplicates) {
        console.log('Duplicates!');
      }

      // TODO modal warning, save possible
      if (isForks) {
        console.log('Forks!');
      }


      this.props.handleRecordAdd(
        this.state.dictionary_title,
        this.state.domain,
        this.state.range);

      this.setState({
        domain: '',
        range: '',
      });
    }
  }

  handleDomainChange(newDomain) {
    this.setState({ domain: newDomain });
  }

  handleRangeChange(newRange) {
    this.setState({ range: newRange });
  }


  render() {
    return (
      <StyledInsert>
        <input
          type="text"
          placeholder="Enter Domain"
          value={this.state.domain}
          onChange={(e) => this.handleDomainChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Range"
          value={this.state.range}
          onChange={(e) => this.handleRangeChange(e.target.value)}
        />
        <button onClick={this.recordAdd}>
          <MdAdd />
        </button>
      </StyledInsert>
    );
  }
}

RecordAdd.propTypes = {
  handleRecordAdd: PropTypes.func.isRequired,
};

export default RecordAdd;
