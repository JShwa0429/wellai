import { detailResponse } from 'api/common';
import { CourseApi } from 'api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import Cookies from 'js-cookie';

const Banner = () => {
  const [datas, setDatas] = useState<detailResponse[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .recommendCourse()
      .then((res) => {
        console.log(res.data);
        setDatas(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <Div>
      {
        <div className="banner">
          <p>
            당신을 위한
            <br /> 오늘의 추천 코스
          </p>
          {Cookies.get('refresh') && (
            <div>
              <Link to={`../course/${datas[0]?.id}`}>
                <Button
                  type="primary"
                  style={{
                    marginTop: '1em',
                    width: 'max-content',
                    height: '50px',
                    borderRadius: '5px',
                    fontSize: '20px',
                  }}
                >
                  오늘의 추천코스 보러 가기
                </Button>
              </Link>
            </div>
          )}
        </div>
      }

      <div className="summary">
        <div className="image">
          <img src="/image/courseGirl.png" alt="요가 소녀" />
        </div>
      </div>
    </Div>
  );
};

export default Banner;

const Div = styled.div`
  height: 40vh;
  padding-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(rgba(255, 114, 114, 0.6), rgba(255, 114, 114, 0.2));
  overflow: hidden;
  .banner {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 180px;
    font-size: 2.5em;
    font-weight: bold;
    line-height: 120%;
  }
  .bookmark {
    display: none;
  }
  .summary {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 60%;
    height: 100%;
    padding: 0 5vw;
  }

  .summary .img {
    min-height: 250px;
    max-height: 300px;
    width: 100%;
  }
`;

// const Button = styled.button`
//   width: 10em;
//   margin-top: 1em;
//   height: 3em;
//   font-size: 20px;
//   color: ${(props) => props.theme.sub};
//   background-color: ${(props) => props.theme.main};
//   border-radius: 5px;
// `;
// const DivSummary = styled.div`
//   font-size: 1.5em;
//   display: flex;
//   img {
//     height: 30vh;
//   }

//   .explain {
//     margin-left: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 50%;
//     text-align: center;
//     margin-bottom: 0;
//   }

//   font-weight: bold;
//   .title {
//     color: ${(props) => props.theme.defaultText};
//   }
//   .duration {
//     color: ${(props) => props.theme.main};
//   }

//   .hashTag {
//     color: #988d8d;
//   }
// `;
