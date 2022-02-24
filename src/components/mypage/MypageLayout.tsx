import React, { useState } from 'react';
import { Row, Col, Modal, Form, Button, Input, Divider, Image, Menu } from 'antd';
const { SubMenu } = Menu;
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

// interface Props {}
const MypageLayout = () => {
  return (
    <Wrapper style={{ width: 256 }}>
      <Menu defaultSelectedKeys={['1']} mode="vertical">
        <Row>
          <Col>차차님</Col>
        </Row>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>

        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Wrapper>
  );
};

export default MypageLayout;

const Wrapper = styled.div``;
