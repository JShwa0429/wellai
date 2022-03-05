import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Menu } from 'antd';
import { shallowEqual } from 'react-redux';
import { LikeOutlined, CommentOutlined, PieChartOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
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
  const { nickname } = useAppSelector((state) => state.myPage, shallowEqual);
  // useEffect(() => {});
  return (
    <Wrapper style={{ width: 332, height: 'max-content' }}>
      <Row
        style={{
          height: '100px',
          fontSize: '30px',
          color: '#574240',
          fontWeight: 'bold',
          paddingLeft: '30px',
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
              height: '50px',
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
