import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const RecordsTemplateBlock = styled.div`
  width: 812px;
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
    padding-right: 300px;
  }
`;

const CloseBtn = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 360px 400px 360px;
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
    </RecordsTemplateBlock>
  );
};

export default RecordsTemplate;