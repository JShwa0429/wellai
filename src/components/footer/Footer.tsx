import React from 'react';
import { Row, Col, Button, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        style={{
          height: '50px',
          width: '100%',
          backgroundColor: 'white',
          borderTop: '0.5px solid lightgrey',
          textAlign: 'center',
          fontSize: '0.8em',
        }}
      >
        <Col>©SIPGANJI. ALL RIGHTS RESERVED</Col>
      </Row>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100vw;
  min-width: 1000px;
`;
