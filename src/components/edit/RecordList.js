import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import RecordListItem from './RecordListItem';

const RecordListBlock = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const RecordList = ({ records,
  dictionary_title,
  // handleRecordUpdate, 
  handleRecordDelete }) => {
  let dictionaryRecords = records.filter(record => record.dictionary_title === dictionary_title);


  return (
    <RecordListBlock>
      {dictionaryRecords.map((record) =>
        <RecordListItem
          key={record.id}
          {...record}
          // handleRecordUpdate={handleRecordUpdate}
          handleRecordDelete={handleRecordDelete}
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
  // handleRecordUpdate: PropTypes.func.isRequired,
  handleRecordDelete: PropTypes.func.isRequired
};

export default RecordList;
