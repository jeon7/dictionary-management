import React, { Component } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

const StyledInsertForm = styled.form`
  display: flex;
  background: #495057;
  border-color: #3B545B;
  border-style: solid;
  border-width: 1px;
  border-radius: 1px;
  
  input {
    background: none;
    outline: none;
    /* border: none; */
    border-color: transparent;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;

    :focus {
    border-color: #FA5246;
    border-style: solid;
    border-width: 3px;
    border-radius: 1px;
    }

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

    :focus {
    border-color: #FA5246;
    border-style: solid;
    border-width: 3px;
    border-radius: 1px;
    }

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

  createDictionary(e) {
    // dictionary name must be given
    if (this.state.value) {
      this.props.handleDictionaryCreate(this.state.value);
      this.setState({ value: '' });
    }
    e.preventDefault();
  }

  render() {
    return (
      <StyledInsertForm onSubmit={this.createDictionary}>
        <input
          type="text"
          placeholder="enter the name of dictionary to create."
          value={this.state.value}
          onChange={(e) => this.handleChange(e.target.value)}
          autoFocus={true}
        />
        <button type="submit">
          <MdAdd />
        </button>
      </StyledInsertForm>
    );
  }
}

DictionaryCreate.propTypes = {
  handleDictionaryCreate: PropTypes.func.isRequired,
};

export default DictionaryCreate;