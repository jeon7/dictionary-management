import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import ModalAsk from '../common/ModalAsk';

const StyledInsertForm = styled.form`
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
    padding-left: 3.3rem;
    padding-right: 3.3rem;
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

class RecordAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary_title: this.props.selected_dictionary_title,
      domain: '',
      range: '',
      askModal: false,
      modalTitle: '',
      modalDescription: '',
    };
    this.recordInputRef = React.createRef();
    this.recordAdd = this.recordAdd.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.onCancelAskModal = this.onCancelAskModal.bind(this);
    this.onConfirmAskModal = this.onConfirmAskModal.bind(this);
  }

  componentDidMount() {
    this.recordInputRef.current.focus();
  }

  recordAdd(e) {
    // both domain and range must be given
    if (this.state.dictionary_title && this.state.domain && this.state.range) {
      // records validation check
      const isDuplicates = this.props.checkDuplicatesAddRecord(this.state.domain, this.state.range, this.state.dictionary_title);
      const isForks = this.props.checkForks(this.state.domain, this.state.range, this.state.dictionary_title);
      const isCycles = this.props.checkCycles(this.state.domain, this.state.range, this.state.dictionary_title);
      const isChains = this.props.checkChains(this.state.domain, this.state.range, this.state.dictionary_title);

      const textCycles = isCycles ? ' Cycles (Sever Error) !' : '';
      const textChains = isChains ? ' Chains! ' : '';
      const textForks = isForks ? ' Forks! ' : '';
      const textDuplicates = isDuplicates ? ' Duplicates! ' : '';
      const textConflicts = textCycles + textChains + textForks + textDuplicates;

      // can be multiple conflicts. ask once to confirm.
      if (isCycles || isChains || isForks || isDuplicates) {
        this.setState({
          askModal: true,
          modalTitle: textConflicts,
          modalDescription: 'Are you sure to save this dataset?',
        });
        // no conflict
      } else {
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
    // autofocus to input 
    this.recordInputRef.current.focus();
    e.preventDefault();
  }

  handleDomainChange(newDomain) {
    this.setState({ domain: newDomain });
  }

  handleRangeChange(newRange) {
    this.setState({ range: newRange });
  }

  onConfirmAskModal() {
    this.props.handleRecordAdd(
      this.state.dictionary_title,
      this.state.domain,
      this.state.range);
    this.setState({
      askModal: false,
      modalTitle: '',
      modalDescription: '',
      domain: '',
      range: '',
    });
  }

  onCancelAskModal() {
    this.setState({
      askModal: false,
      modalTitle: '',
      modalDescription: '',
      domain: '',
      range: '',
    });
  }

  render() {
    return (
      <>
        <StyledInsertForm onSubmit={this.recordAdd}>
          <input
            type="text"
            placeholder="Enter Domain"
            value={this.state.domain}
            onChange={(e) => this.handleDomainChange(e.target.value)}
            ref={this.recordInputRef}
          />
          <input
            type="text"
            placeholder="Enter Range"
            value={this.state.range}
            onChange={(e) => this.handleRangeChange(e.target.value)}
          />
          <button type="submit">
            <MdAdd />
          </button>
        </StyledInsertForm>
        <ModalAsk
          visible={this.state.askModal}
          title={this.state.modalTitle}
          description={this.state.modalDescription}
          onConfirm={this.onConfirmAskModal}
          onCancel={this.onCancelAskModal}
        />
      </>
    );
  }
}

RecordAdd.propTypes = {
  handleRecordAdd: PropTypes.func.isRequired,
  checkDuplicatesAddRecord: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordAdd;
