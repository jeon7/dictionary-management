import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import DictionaryListItem from './DictionaryListItem';

const DictionaryListBlock = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const DictionaryList = ({ dictionaries, handleDictionaryTitleEdit, handleDictionaryDelete }) => {
  return (
    <DictionaryListBlock>
      {dictionaries.map((dictionary) =>
        <DictionaryListItem
          key={dictionary.id}
          {...dictionary}
          // handleDictionaryTitleEdit={handleDictionaryTitleEdit}
          handleDictionaryDelete={handleDictionaryDelete}
        />)}
    </DictionaryListBlock>
  );
};

DictionaryList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  // handleDictionaryTitleEdit: PropTypes.func.isRequired,
  handleDictionaryDelete: PropTypes.func.isRequired
};

export default DictionaryList;