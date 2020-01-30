import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdContentCopy, MdModeEdit, MdRemoveCircleOutline, MdSync } from 'react-icons/md';
import { FiLink } from 'react-icons/fi';
import { IoIosGitNetwork } from 'react-icons/io';
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
  margin-left: 0.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  color: #2d84ac;
  cursor: pointer;
  &:hover {
    color: #7bb4ba;
  }
`;

const IconArea = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 135px;
  float: right;
`;

const WarningYello = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #FBB622;
`;

const WarningOrange = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #FB673A;
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
  margin-right: 0;
  display: flex;
  float: right;
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
    :focus {
    border-color: #FA5246;
    border-style: solid;
    border-width: 3px;
    border-radius: 1px;
    }
  }
`;

const RecordListItem = ({ id, domain, range,
  selected_dictionary_title,
  handleRecordUpdate,
  handleRecordDelete,
  checkDuplicatesMarkRecord,
  checkForks,
  checkCycles,
  checkChains }) => {

  const [updateModal, setUpdateModal] = useState(false);
  const [domainUpdated, setDomainUpdated] = useState('');
  const [rangeUpdated, setRangeUpdated] = useState('');

  const [isCycles, setIsCycles] = useState(false);
  const [isChains, setIsChains] = useState(false);
  const [isForks, setIsForks] = useState(false);
  const [isDuplicates, setIsDuplicates] = useState(false);

  useEffect(() => {
    const isCycles = checkCycles(domain, range, selected_dictionary_title);
    const isChains = checkChains(domain, range, selected_dictionary_title);
    const isForks = checkForks(domain, range, selected_dictionary_title);
    const isDuplicates = checkDuplicatesMarkRecord(domain, range, selected_dictionary_title);

    setIsCycles(isCycles);
    setIsChains(isChains);
    setIsForks(isForks);
    setIsDuplicates(isDuplicates);
  });

  const onUpdateClick = () => {
    setUpdateModal(true);
  };

  // button in modal window for update 
  const onConfirmUpdate = () => {
    // both new domain and new range must be given
    if (domainUpdated && rangeUpdated) {
      setUpdateModal(false);
      handleRecordUpdate(id, domainUpdated, rangeUpdated);
      setDomainUpdated('');
      setRangeUpdated('');
    }
  };

  const onCancelUpdate = () => {
    setUpdateModal(false);
    setDomainUpdated('');
    setRangeUpdated('');
  };

  // for record update
  const onChangeDomain = e => setDomainUpdated(e.target.value);
  const onChangeRange = e => setRangeUpdated(e.target.value);

  return (
    <>
      <RecordListItemBlock>
        <RecordContent onClick={onUpdateClick}> {domain} </RecordContent>
        <RecordContent onClick={onUpdateClick}> {range} </RecordContent>
        <IconArea>
          {isDuplicates && <WarningYello > <MdContentCopy /> </WarningYello>}
          {isForks && <WarningYello > <IoIosGitNetwork /> </WarningYello>}
          {isChains && <WarningOrange > <FiLink /> </WarningOrange>}
          {isCycles && <WarningOrange > <MdSync /> </WarningOrange>}
          <EditBtn onClick={onUpdateClick}> <MdModeEdit /> </EditBtn>
          <RemoveBtn onClick={() => handleRecordDelete(id)}> <MdRemoveCircleOutline /> </RemoveBtn>
        </IconArea>
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
            autoFocus={true}
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
  checkDuplicatesMarkRecord: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordListItem;
