import React, { useState } from 'react';
import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';

type link = {
  to: string;
  text: string;
};

const links: link[] = [
  { to: '/course', text: '코스탐색' },
  { to: '/community', text: '커뮤니티' },
];

const logoName = 'WellAi.';

const Header = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
    navigate('/search', { state: e.currentTarget.value });
  };
  return (
    <Wrapper>
      <Row justify="space-between" align="middle">
        <Col
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
          }}
        >
          <Link to="/">{logoName}</Link>
        </Col>
        <Col>
          <Row>
            {links.map((link) => (
              <Col
                key={link.text}
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginRight: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link to={link.to}>{link.text}</Link>
              </Col>
            ))}
            <Col>
              <Input
                suffix={<SearchOutlined />}
                placeholder="검색"
                allowClear
                onPressEnter={onSearch}
                style={{ width: 170, borderRadius: '20px' }}
              />
            </Col>
            <Col
              style={{
                marginLeft: '30px',
              }}
            >
              <Button
                type="primary"
                style={{
                  width: '100px',
                  borderRadius: '5px',
                }}
                onClick={() => setIsModalVisible(true)}
              >
                로그인
              </Button>
            </Col>
            <Col
              style={{
                marginLeft: '7px',
              }}
            >
              <Button
                type="primary"
                style={{
                  width: '100px',
                  borderRadius: '5px',
                }}
                onClick={() => navigate('/signup')}
              >
                회원가입
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <LoginModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 10px 60px;
  width: 100vw;
  min-width: 1000px;
  height: max-content;
  color: #574240;
  border-bottom: 1px solid lightgray;
  text-deco
`;

export default Header;
