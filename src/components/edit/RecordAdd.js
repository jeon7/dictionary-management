import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

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
      dictionary_title: this.props.dictionary_title,
      domain: '',
      range: '',
    };
    this.recordAdd = this.recordAdd.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleDomainChange(newDomain) {
    this.setState({ domain: newDomain });
  }

  handleRangeChange(newRange) {
    this.setState({ range: newRange });
  }

  recordAdd() {
    this.props.handleRecordAdd(
      this.state.dictionary_title,
      this.state.domain,
      this.state.range);

    // test
    console.log('state: ');
    console.log(this.state);

    this.setState({
      domain: '',
      range: '',
    });
    // test
    console.log('last state: ');
    console.log(this.state);
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
