import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdContentCopy, MdModeEdit, MdRemoveCircleOutline, MdSync } from 'react-icons/md';
import { FiLink } from 'react-icons/fi';
import { IoIosGitNetwork } from 'react-icons/io';

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

const DuplicatesWarning = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #FBB622;
`;

const ForksWarning = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #FBB622;
`;

const ChainWarning = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #FB673A;
`;

const CyclesWarning = styled.div`
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

const CloseBtn = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 500px 10px 465px;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #22b8cf;
  &:hover {
    background: skyblue};
  }
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
      <Link to='/'><CloseBtn> Close </CloseBtn></Link>
      <IconsDescriptionBlock>
        <IconsDescription>
          <label> View and Update Record </label>
          <EditBtn> <MdModeEdit />  <div>,  records </div></EditBtn>
        </IconsDescription>
        <IconsDescription>
          <label> Delete Record </label>
          <RemoveBtn> <MdRemoveCircleOutline /> </RemoveBtn>
        </IconsDescription>
        <IconsDescription>
          <label> Duplicates  </label>
          <DuplicatesWarning> <MdContentCopy /> </DuplicatesWarning>
        </IconsDescription>
        <IconsDescription>
          <label> Forks   </label>
          <ForksWarning> <IoIosGitNetwork /> </ForksWarning>
        </IconsDescription>
        <IconsDescription>
          <label> Chains   </label>
          <ChainWarning> <FiLink /> </ChainWarning>
        </IconsDescription>
        <IconsDescription>
          <label> Cycles   </label>
          <CyclesWarning> <MdSync /> </CyclesWarning>
        </IconsDescription>
      </IconsDescriptionBlock>

    </RecordsTemplateBlock>
  );
};

export default RecordsTemplate;