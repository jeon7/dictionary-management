import React from 'react';
import styled from 'styled-components';
import { MdModeEdit, MdRemoveCircleOutline } from 'react-icons/md';

const DictionariesTemplateBlock = styled.div`
  width: 512px;
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

const IconsDescriptionBlock = styled.div`
  padding-bottom: 50px;
`;

const IconsDescription = styled.div`
  width: 480px;
  margin-right: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end; 
  
  margin-top: 10px;
  padding-top: 10px;
`;

const EditBtn = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: #2d84ac;
`;

const RemoveBtn = styled.div`
  padding-left: 10px;
  display: flex;
  font-size: 1.5rem;
  color: red;
`;

const DictionariesTemplate = ({ children }) => {
  return (
    <DictionariesTemplateBlock>
      <Title> Dictionaries </Title>
      <Content> {children} </Content>
      <IconsDescriptionBlock>
        <IconsDescription>
          <label> Edit Dictionary </label>
          <EditBtn> <MdModeEdit /> </EditBtn>
        </IconsDescription>
        <IconsDescription>
          <label> Delete Dictionary </label>
          <RemoveBtn> <MdRemoveCircleOutline /> </RemoveBtn>
        </IconsDescription>
      </IconsDescriptionBlock>
    </DictionariesTemplateBlock>
  );
};

export default DictionariesTemplate;