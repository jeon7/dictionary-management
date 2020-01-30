import React from 'react';
import styled from 'styled-components';
import { MdContentCopy, MdModeEdit, MdRemoveCircleOutline, MdSync } from 'react-icons/md';
import { FiLink } from 'react-icons/fi';
import { IoIosGitNetwork } from 'react-icons/io';
import PropTypes from 'prop-types';
import Button from "../common/Button";

const RecordsTemplateBlock = styled.div`
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const Title = styled.div`
  background: #22b8cf;
  color: white;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: white;
`;

const Attribute = styled.div`
  display: flex;
  background: gray;
  height: 3rem;
  justify-content: left;
  
  h2{
    font-size: 1.25rem;
    color: white;
    padding-left: 15px;
    padding-right: 360px;
  }
`;

const IconsDescriptionBlock = styled.div`
  padding-bottom: 50px;
`;

const IconsDescription = styled.div`
  width: 950px;
  margin-right: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end; 
  margin-top: 10px;
  padding-top: 10px;
`;

const WarningYello = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #FBB622;
`;

const WarningOrange = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #FB673A;
`;

const EditBtn = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #2d84ac;
  div{
    font-size: 1.2rem;
  }
`;

const RemoveBtn = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: red;
`;

const CloseBlock = styled.div`
  margin-top: 1.25rem;
`;

const CloseBtn = styled(Button)`
  font-size: 1.25rem;
  text-decoration: none;
  margin-left: 460px;
`;

const RecordsTemplate = ({ selected_dictionary_title, children }) => {
  return (
    <RecordsTemplateBlock>
      <Title> {selected_dictionary_title} </Title>
      <Attribute>
        <h2>Domain</h2>
        <h2>Range</h2>
      </Attribute>
      <Content> {children} </Content>
      <CloseBlock><CloseBtn to='/'>Close</CloseBtn></CloseBlock>
      <IconsDescriptionBlock>
        <IconsDescription>
          <label> Update Record </label>
          <EditBtn> <MdModeEdit />  <div>,  records </div></EditBtn>
        </IconsDescription>
        <IconsDescription>
          <label> Delete Record </label>
          <RemoveBtn> <MdRemoveCircleOutline /> </RemoveBtn>
        </IconsDescription>
        <IconsDescription>
          <label> Duplicates  </label>
          <WarningYello> <MdContentCopy /> </WarningYello>
        </IconsDescription>
        <IconsDescription>
          <label> Forks   </label>
          <WarningYello> <IoIosGitNetwork /> </WarningYello>
        </IconsDescription>
        <IconsDescription>
          <label> Chains   </label>
          <WarningOrange> <FiLink /> </WarningOrange>
        </IconsDescription>
        <IconsDescription>
          <label> Cycles   </label>
          <WarningOrange> <MdSync /> </WarningOrange>
        </IconsDescription>
      </IconsDescriptionBlock>
    </RecordsTemplateBlock>
  );
};

RecordsTemplate.propTypes = {
  selected_dictionary_title: PropTypes.string.isRequired,
};

export default RecordsTemplate;