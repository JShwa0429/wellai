import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Row, Col, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { nicknameChange } from 'features/myPageSlice';

const logoName = 'WellAi.';

const Header = () => {
  const navigate = useNavigate();
  const access = Cookies.get('refresh');
  const nickname = useSelector((state: RootState) => state.myPage.nickname);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const handleSignOut = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    dispatch(nicknameChange(''));
    navigate('/');
  };
  const onSearch = () => {
    if (search.length) {
      navigate('/search', { state: search });
      setSearch('');
    } else {
      message.info('검색어를 입력해주세요');
    }
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  return (
    <Wrapper scrollLocation={scrollPosition}>
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
            <Col
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                marginRight: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link to={'/course'}>{'코스탐색'}</Link>
            </Col>
            {access ? (
              <Col
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginRight: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link to={'/mypage/report'}>{'마이페이지'}</Link>
              </Col>
            ) : null}

            <Col>
              <Input
                suffix={<SearchOutlined />}
                placeholder="검색"
                allowClear
                value={search}
                onPressEnter={() => onSearch()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)}
                style={{ width: 170, borderRadius: '20px' }}
              />
            </Col>
            {!access ? (
              <>
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
              </>
            ) : (
              <>
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
                    onClick={handleSignOut}
                  >
                    로그아웃
                  </Button>
                </Col>
                {nickname && (
                  <Col
                    style={{
                      position: 'absolute',
                      right: '-45px',
                      width: '33px',
                      height: '33px',
                      borderRadius: '75px',
                      backgroundColor: '#8aaae5',
                      textAlign: 'center',
                      lineHeight: '33px',
                      color: 'white',
                    }}
                  >
                    {nickname?.slice(0, 1)}
                  </Col>
                )}
              </>
            )}
          </Row>
        </Col>
      </Row>
      <LoginModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </Wrapper>
  );
};

type WrapperProps = {
  scrollLocation: number;
};
const Wrapper = styled.div<WrapperProps>`
  padding: 10px 60px;
  width: 100vw;
  min-width: 1000px;
  height: 80px;
  color: #444;
  border-bottom: ${({ scrollLocation }) => (scrollLocation > 1 ? '1px solid lightgray' : '')};
  position: fixed;
  background-color: ${({ scrollLocation }) => (scrollLocation > 1 ? 'white' : 'transparent')};
  transition: background 0.5s, border 0.5s;
  z-index: 999;
`;

export default Header;
