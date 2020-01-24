import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';

const DictionaryListItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background: #495057;
  /* Link{
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
  } */
  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:nth-child(odd) {
    background: #eaf2f3;
  }
`;

const ItemTitle = styled.div`
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


const DictionaryListItem = ({ title, id, handleDictionaryTitleEdit, handleDictionaryDelete }) => {
  // TODO
  const onEdit = () => {
    // let willEdit = window.confirm('do you want to edit this dictionary?');
  }

  return (
    <DictionaryListItemBlock>
      {/* TODO */}
      <ItemTitle> {title} </ItemTitle>
      <Link to={`/edit/${title}`}> <MdModeEdit /> </Link>
      <RemoveBtn onClick={() => handleDictionaryDelete(id)}> <MdRemoveCircleOutline /> </RemoveBtn>
    </DictionaryListItemBlock>
  );
};

DictionaryListItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  // handleDictionaryTitleEdit: PropTypes.func.isRequired,
  handleDictionaryDelete: PropTypes.func.isRequired
};

export default DictionaryListItem;