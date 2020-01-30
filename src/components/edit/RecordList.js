import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RecordListItem from './RecordListItem';

const RecordListBlock = styled.div`
  min-height: 320px;
  max-height: 2000px;
  overflow-y: auto;
`;

const RecordList = ({
  records,
  selected_dictionary_title,
  handleRecordUpdate,
  handleRecordDelete,
  checkDuplicatesMarkRecord,
  checkForks,
  checkCycles,
  checkChains }) => {
  let dictionaryRecords = records.filter(record => record.dictionary_title === selected_dictionary_title);
  return (
    <RecordListBlock>
      {dictionaryRecords.map((record) =>
        <RecordListItem
          key={record.id}{...record}
          selected_dictionary_title={selected_dictionary_title}
          handleRecordUpdate={handleRecordUpdate}
          handleRecordDelete={handleRecordDelete}
          checkDuplicatesMarkRecord={checkDuplicatesMarkRecord}
          checkForks={checkForks}
          checkCycles={checkCycles}
          checkChains={checkChains}
        />)}
    </RecordListBlock>
  );
};

RecordList.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    dictionary_title: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
  })),
  selected_dictionary_title: PropTypes.string.isRequired,
  handleRecordUpdate: PropTypes.func.isRequired,
  handleRecordDelete: PropTypes.func.isRequired,
  checkDuplicatesMarkRecord: PropTypes.func.isRequired,
  checkForks: PropTypes.func.isRequired,
  checkCycles: PropTypes.func.isRequired,
  checkChains: PropTypes.func.isRequired,
};

export default RecordList;
