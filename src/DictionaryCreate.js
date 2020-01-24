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

class DictionaryCreate extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.createDictionary = this.createDictionary.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({ value: newValue });
  }

  createDictionary() {
    this.props.handleDictionaryCreate(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <StyledInsert>
        <input
          type="text"
          placeholder="enter the name of dictionary to create."
          value={this.state.value}
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <button type="button" onClick={this.createDictionary}>
          <MdAdd />
        </button>
      </StyledInsert>
    );
  }
}

DictionaryCreate.propTypes = {
  handleDictionaryCreate: PropTypes.func.isRequired,
};

export default DictionaryCreate;