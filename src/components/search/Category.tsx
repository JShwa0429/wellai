import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Row, Col, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
  keyword: string;
};
const Category: React.FunctionComponent<Props> = ({ keyword }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const onSearch = () => {
    if (search.length) {
      navigate('/search', { state: search });
      setSearch('');
    } else {
      message.info('검색어를 입력해주세요');
    }
  };

  return (
    <Div>
      <div className="search-banner">
        <h3>지금 찾으시는 코스</h3>
        <h1>{keyword}</h1>
        <img src="/image/patternpad3.png" alt="요가수업"></img>
      </div>
      <Input
        suffix={<SearchOutlined />}
        placeholder="검색"
        allowClear
        value={search}
        onPressEnter={() => onSearch()}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)}
        style={{ width: 500, height: 50, borderRadius: '20px' }}
      />
    </Div>
  );
};
export default Category;

const Div = styled.div`
  align-items: center;
  padding: 3vh 0 0 0;
  text-align: center;
  font-size: 1.5em;
  height: 26vh;
  width: 100vw;
  h3 {
    color: ${(props) => props.theme.defaultText};
  }
  .search-banner img {
    height: 30vh;
    position: absolute;
    top: 70px;
    left: 40%;
    z-index: -1;
  }
  .search-img {
    margin-right: 180px;
    img {
      width: 130px;
      height: 120px;
    }
  }
`;
