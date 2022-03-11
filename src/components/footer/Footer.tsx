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
          position: 'relative',
          height: '50px',
          width: '100%',
          backgroundColor: 'white',
          transform: 'translateY(-100%)',
          borderTop: '0.5px solid lightgrey',
          textAlign: 'center',
          fontSize: '0.8em',
        }}
      >
        ©SIPGANJI. ALL RIGHTS RESERVED
      </Row>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  height: 0;
  // min-height: 100%;
  // padding-bottom: 50px;
  // margin-top: 80px;
  width: 100vw;
  min-width: 1000px;
  color: #888;
  background-color: red;
  // position: relative;
`;
