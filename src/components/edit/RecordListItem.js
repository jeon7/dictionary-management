import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdWarning, MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';
import ModalRecordUpdate from './ModalRecordUpdate';
import ModalWarning from '../common/ModalWarning';
import ModalAsk from '../common/ModalAsk';

const RecordListItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background: #495057;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:nth-child(odd) {
    background: #eaf2f3;
  }
`;

const RecordContent = styled.div`
  margin-left: 0.5rem;
  flex: 1;
`;

const WarningBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #e97529;
  cursor: pointer;
  &:hover {
    color: #f8d072;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const EditBtn = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #2d84ac;
  cursor: pointer;
  &:hover {
    color: #7bb4ba;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const RemoveBtn = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const StyledInsert = styled.div`
    display: flex;
    padding: 0rem 1rem 1rem 1rem;
    input {
      background: none;
      outline: none;
      border: none;
      padding: 0.5rem;
      font-size: 1rem;
      line-height: 1.125;
      color: black;
      border: 0.5px solid darkgray;
      &::placeholder {
        color: darkgray;
      }
      flex: 1;
    }
`;

const RecordListItem = ({ id, domain, range,
  selected_dictionary_title,
  handleRecordUpdate,
  handleRecordDelete,
  checkDuplicates,
  checkForks,
  checkCycles,
  checkChains }) => {

  const [updateModal, setUpdateModal] = useState(false);
  const [domainUpdated, setDomainUpdated] = useState('');
  const [rangeUpdated, setRangeUpdated] = useState('');

  const [cyclesWarningModal, setCyclesWarningModal] = useState(false);
  const [askModal, setAskModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const onUpdateClick = () => {
    setUpdateModal(true);
  }

  // button in modal window for update 
  const onConfirmUpdate = () => {
    // both new domain and new range must be given
    if (domainUpdated && rangeUpdated) {

      // records validation check
      const isCycles = checkCycles(domainUpdated, rangeUpdated, selected_dictionary_title);

      // TODO make other functions (problem: new dataset also compares the dataset to be updated)
      // const isChains = checkChains(domainUpdated, rangeUpdated, selected_dictionary_title);
      // const isForks = checkForks(domainUpdated, rangeUpdated, selected_dictionary_title);
      // const isDuplicates = checkDuplicates(domainUpdated, rangeUpdated, selected_dictionary_title);
      // const textChains = isChains ? ' Chains! ' : '';
      // const textForks = isForks ? ' Forks! ' : '';
      // const textDuplicates = isDuplicates ? ' Duplicates! ' : '';
      // const text = textChains + textForks + textDuplicates;

      // Cycles warning, not possible to save
      if (isCycles) {
        setCyclesWarningModal(true);
        setModalTitle('Severe Error: Cycles!');
        setModalDescription('This dataset cannot be saved');
        // no conflict
      } else {
        setUpdateModal(false);
        handleRecordUpdate(id, domainUpdated, rangeUpdated);
        setDomainUpdated('');
        setRangeUpdated('');
      }
    }
  };

  const onCancelUpdate = () => {
    setUpdateModal(false);
    setDomainUpdated('');
    setRangeUpdated('');
  };

  const onCancelCyclesWarning = () => {
    setCyclesWarningModal(false);
    setModalTitle('');
    setModalDescription('');
    setDomainUpdated('');
    setRangeUpdated('');
  };

  const onConfirmAskModal = () => {
    setAskModal(false);
    setUpdateModal(false);
    handleRecordUpdate(id, domainUpdated, rangeUpdated);
    setModalTitle('');
    setModalDescription('');
    setDomainUpdated('');
    setRangeUpdated('');
  };

  const onCancelAskModal = () => {
    setAskModal(false);
    setModalTitle('');
    setModalDescription('');
    setDomainUpdated('');
    setRangeUpdated('');
  };

  const onChangeDomain = e => setDomainUpdated(e.target.value);
  const onChangeRange = e => setRangeUpdated(e.target.value);

  return (
    <>
      <RecordListItemBlock>
        <RecordContent> {domain} </RecordContent>
        <RecordContent> {range} </RecordContent>
        {/* TODO 경고 마크 component state 만들어서 visible  */}
        <WarningBtn > <MdWarning /> </WarningBtn>
        <EditBtn onClick={onUpdateClick}> <MdModeEdit /> </EditBtn>
        <RemoveBtn onClick={() => handleRecordDelete(id)}> <MdRemoveCircleOutline /> </RemoveBtn>
      </RecordListItemBlock>
      <ModalRecordUpdate
        visible={updateModal}
        onConfirm={onConfirmUpdate}
        onCancel={onCancelUpdate}>
        <StyledInsert>
          <label>Update Domain To: </label>
          <input
            type="text"
            name="domain"
            value={domainUpdated}
            placeholder={domain}
            onChange={onChangeDomain}
          />
        </StyledInsert>
        <StyledInsert>
          <label>Update Range To: </label>
          <input
            type="text"
            name="range"
            value={rangeUpdated}
            placeholder={range}
            onChange={onChangeRange}
          />
        </StyledInsert>
      </ModalRecordUpdate>
      <ModalWarning
        visible={cyclesWarningModal}
        title={modalTitle}
        description={modalDescription}
        onCancel={onCancelCyclesWarning}
      />
      <ModalAsk
        visible={askModal}
        title={modalTitle}
        description={modalDescription}
        onConfirm={onConfirmAskModal}
        onCancel={onCancelAskModal}
      />
    </>
  );
};

RecordListItem.propTypes = {
  id: PropTypes.number.isRequired,
  dictionary_title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  selected_dictionary_title: PropTypes.string.isRequired,
  handleRecordUpdate: PropTypes.func.isRequired,
  handleRecordDelete: PropTypes.func.isRequired,
  checkDuplicates: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordListItem;
