import React, { useState, useCallback, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdContentCopy, MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';
import { FiLink } from 'react-icons/fi';
import { IoIosGitNetwork } from 'react-icons/io';
import ModalRecordUpdate from './ModalRecordUpdate';
import ModalWarning from '../common/ModalWarning';

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

const DuplicatesWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #f2d666;
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const ForksWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #f18e2f;
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const ChainWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ec5538;
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

  const [cyclesWarningModal, setCyclesWarningModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const [isChains, setIsChains] = useState(false);
  const [isForks, setIsForks] = useState(false);
  const [isDuplicates, setIsDuplicates] = useState(false);

  // TODO consider useCallback, missing dependency?
  useEffect(() => {
    const isChains = checkChains(domain, range, selected_dictionary_title);
    const isForks = checkForks(domain, range, selected_dictionary_title);
    const isDuplicates = checkDuplicatesMarkRecord(domain, range, selected_dictionary_title);

    setIsChains(isChains);
    setIsForks(isForks);
    setIsDuplicates(isDuplicates);

  });

  const onUpdateClick = useCallback(() => {
    setUpdateModal(true);
  }, [updateModal]);

  // button in modal window for update 
  const onConfirmUpdate = () => {
    // both new domain and new range must be given
    if (domainUpdated && rangeUpdated) {
      // records validation check
      const isCycles = checkCycles(domainUpdated, rangeUpdated, selected_dictionary_title);
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

  // for record update
  const onChangeDomain = e => setDomainUpdated(e.target.value);
  const onChangeRange = e => setRangeUpdated(e.target.value);

  return (
    <>
      <RecordListItemBlock>
        <RecordContent onClick={onUpdateClick}> {domain} </RecordContent>
        <RecordContent onClick={onUpdateClick}> {range} </RecordContent>
        <IconArea>
          {isDuplicates && <DuplicatesWarning > <MdContentCopy /> </DuplicatesWarning>}
          {isForks && <ForksWarning > <IoIosGitNetwork /> </ForksWarning>}
          {isChains && <ChainWarning > <FiLink /> </ChainWarning>}
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
      <ModalWarning
        visible={cyclesWarningModal}
        title={modalTitle}
        description={modalDescription}
        onCancel={onCancelCyclesWarning}
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
  checkDuplicatesMarkRecord: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordListItem;
