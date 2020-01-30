import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DictionaryListItem from './DictionaryListItem';

const DictionaryListBlock = styled.div`
  min-height: 320px;
  max-height: 1500px;
  overflow-y: auto;
`;

const DictionaryList = ({ dictionaries, handleDictionaryDelete }) => {
  return (
    <DictionaryListBlock>
      {dictionaries.map((dictionary) =>
        <DictionaryListItem
          key={dictionary.id}
          {...dictionary}
          handleDictionaryDelete={handleDictionaryDelete}
        />)}
    </DictionaryListBlock>
  );
};

DictionaryList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  handleDictionaryDelete: PropTypes.func.isRequired,
};

export default DictionaryList;