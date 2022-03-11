import styled from 'styled-components';
import { Rating } from 'components/course/Comment';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CourseApi } from 'api';
import { detailResponse } from 'api/common';
import Cookies from 'js-cookie';
import { Button, Tag, Space } from 'antd';
import { PlayCircleOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

// type Props = {
//   id: string | undefined;
//   title: string;
//   rate: number;
//   explain: string;
// };

const CourseExplain: React.FunctionComponent = () => {
  const { id } = useParams();
  const [data, setData] = useState<detailResponse | null>(null);

  useEffect(() => {
    async function getDetailInformation() {
      const course = CourseApi();
      await course.getDetailInformation(id).then((res) => {
        setData(res.data);
      });
    }
    getDetailInformation();
  }, []);

  return (
    <DivCourseDetail>
      <DivBanner>
        <div className="image">
          <img src={data?.img_url} alt="요가" />
        </div>
        <Explain>
          <Space>
            <Tag color="cyan">{data?.hash_tag[0]['tag_name']}</Tag>
            <Tag color="orange">{data?.hash_tag[1]['tag_name']}</Tag>
            <Tag color="purple">{data?.hash_tag[2]['tag_name']}</Tag>
          </Space>
          <h1>{data?.course_name}</h1>
          <div className="rate">
            <div className="star-svg">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="star"
                width="2em"
                height="2em"
                fill="#FF7272"
                aria-hidden="true"
              >
                <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
              </svg>
            </div>
            <div className="star-rate">
              <p style={{ paddingBottom: '5px' }}>{data?.avg_rating}</p>
            </div>
          </div>
          <div className="start">
            <Link to={`/guide/${data?.id}`}>
              <Button
                disabled={Cookies.get('refresh') ? false : true}
                type="primary"
                shape="round"
                icon={<PlayCircleOutlined />}
                style={{
                  marginTop: '1em',
                  width: 'max-content',
                  height: '50px',
                  fontSize: '20px',
                }}
              >
                수업 시작하기
              </Button>
            </Link>
          </div>
        </Explain>
      </DivBanner>
    </DivCourseDetail>
  );
};

export default CourseExplain;

const DivCourseDetail = styled.div`
  width: 100%;
  // background: linear-gradient(to right, rgba(255, 114, 114, 0.3), rgba(255, 114, 114, 0.1));

  background: #fbeaeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DivBanner = styled.div`
  min-height: 250px;
  height: 30vh;
  margin: 2em 0;
  display: flex;
  width: 100vw;
  .image {
    width: 50%;
    display: flex;
    justify-content: right;
    align-items: center;
    overflow: hidden;
  }
  img {
    margin-right: 5%;
    height: 100%;
    border-radius: 8px;
  }
`;
const Explain = styled.div`
  width: 30%;
  margin: 0 0 1em 20px;
  display: flex;
  flex-direction: column;
  padding: 2em 0;

  h1 {
    color: ${(props) => props.theme.defaultText};
    margin: 0.5em 0 0.5em 0;
  }
  .start {
    margin-top: 15px;
  }
  .rate {
    display: flex;
    align-items: center;
    .star-rate {
      font-size: 23px;
    }
  }
`;

// const Button = styled.button`
//   border-radius: 64px;
//   width: 10em;
//   height: 3em;
//   font-size: 1.5em;
//   color: white;
//   background-color: ${(props) => props.theme.main};
//   margin-top: auto;
//   margin-bottom: 1em;
//   a {
//     color: white;
//   }

//   :disabled {
//     background-color: ${(props) => props.theme.border};
//   }
// `;
