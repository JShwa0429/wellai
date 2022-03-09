import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Menu } from 'antd';
import { shallowEqual } from 'react-redux';
import { LikeOutlined, CommentOutlined, PieChartOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
import * as myPageAction from 'features/myPageSlice';
import styled from 'styled-components';
type menu = {
  name: string;
  menuKey: string;
  icon: any;
};

const MenuList: menu[] = [
  { name: '운동리포트', menuKey: '/mypage/report', icon: <PieChartOutlined /> },
  { name: '좋아요', menuKey: '/mypage/like', icon: <LikeOutlined /> },
  { name: '내 댓글', menuKey: '/mypage/comment', icon: <CommentOutlined /> },
  { name: '내 정보 변경', menuKey: '/mypage/edit', icon: <EditOutlined /> },
];

const MyPageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [nickname, setNickname] = useState(undefined);
  const { nickname } = useAppSelector((state) => state.myPage, shallowEqual);
  useEffect(() => {
    const getUserNickName = async () => {
      if (Cookies.get('access')) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access')}` || false;
      }
      await axios.get('/users/option').then(
        (result) => dispatch(myPageAction.nicknameChange(result.data.nickname)),
        // setNickname(result.data.nickname),
      );
    };
    if (nickname === undefined) {
      getUserNickName();
    }
  }, []);
  return (
    <Wrapper style={{ width: 280, height: 'max-content', position: 'fixed', left: 0 }}>
      <Row
        style={{
          height: '100px',
          fontSize: '20px',
          color: '#574240',
          fontWeight: 'bold',
          paddingLeft: '20px',
          borderRight: '1px solid #f0f0f0',
          borderLeft: '1px solid #f0f0f0',
        }}
        justify="start"
        align="middle"
      >
        <Col style={{ marginRight: '5px' }}>🧘‍♀️</Col>
        <Col style={{ letterSpacing: '1.5px' }}>{nickname} 님</Col>
      </Row>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="vertical"
        style={{
          minHeight: 'calc(100vh - 80px - 100px)',
          borderLeft: '1px solid #f0f0f0',
        }}
        onSelect={({ key }) => navigate(key)}
      >
        {MenuList.map((item) => (
          <Menu.Item
            key={item.menuKey}
            icon={item.icon}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <Row>{item.name}</Row>
          </Menu.Item>
        ))}
      </Menu>
    </Wrapper>
  );
};

export default MyPageLayout;

const Wrapper = styled.div`
  li.ant-menu-item {
    padding-left: 60px;
  }
`;
