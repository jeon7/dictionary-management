import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';
import ModalRecordUpdate from './ModalRecordUpdate';

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

const RemoveBtn = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const EditBtn = styled.div`
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
  handleRecordUpdate,
  handleRecordDelete,
  checkDuplicates,
  checkForks,
  checkCycles,
  checkChains }) => {

  const [updateModal, setUpdateModal] = useState(false);
  const [domainUpdated, setDomainUpdated] = useState('');
  const [rangeUpdated, setRangeUpdated] = useState('');

  const onUpdateClick = () => {
    setUpdateModal(true);
  }

  // button in modal window for update  
  const onCancel = () => {
    setUpdateModal(false);
    setDomainUpdated('');
    setRangeUpdated('');
  };

  // button in modal window for update 
  const onConfirm = () => {
    // both new domain and new range must be given
    if (domainUpdated && rangeUpdated) {
      setUpdateModal(false);
      handleRecordUpdate(id, domainUpdated, rangeUpdated);
      setDomainUpdated('');
      setRangeUpdated('');
    }
  };
  const onChangeDomain = e => setDomainUpdated(e.target.value);
  const onChangeRange = e => setRangeUpdated(e.target.value);

  return (
    <RecordListItemBlock>
      {/* TODO 경고 마크 component state 만들어서  */}
      <RecordContent> {domain} </RecordContent>
      <RecordContent> {range} </RecordContent>
      {/* TODO */}
      <EditBtn onClick={onUpdateClick}> <MdModeEdit /> </EditBtn>
      <RemoveBtn onClick={() => handleRecordDelete(id)}> <MdRemoveCircleOutline /> </RemoveBtn>
      <ModalRecordUpdate
        visible={updateModal}
        onConfirm={onConfirm}
        onCancel={onCancel}>
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
    </RecordListItemBlock>
  );
};

RecordListItem.propTypes = {
  id: PropTypes.number.isRequired,
  dictionary_title: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  handleRecordUpdate: PropTypes.func.isRequired,
  handleRecordDelete: PropTypes.func.isRequired,
  checkDuplicates: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordListItem;
