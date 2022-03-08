import styled from 'styled-components';
import { Rating } from 'components/course/Comment';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CourseApi } from 'api/CourseApi';
import { detailResponse } from 'api/common';
import Cookies from 'js-cookie';
import { Button, Tag, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

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
    const course = CourseApi();
    course
      .getDetailInformation(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
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
            <Rating allowHalf disabled value={data?.avg_rating} />
            {data?.avg_rating}
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
  width: 100vw;
  // background: linear-gradient(to right, rgba(255, 114, 114, 0.3), rgba(255, 114, 114, 0.1));

  background: #fbeaeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DivBanner = styled.div`
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
