import styled from 'styled-components';
import { Row, Col } from 'antd';
import { MyPageLayout } from 'components';
import { Link } from 'react-router-dom';
import SummaryTemp from 'components/common/SummaryTemp';
import { useEffect, useState } from 'react';
import { bookmark, detailResponse } from 'api/common';
import { CourseApi } from 'api/CourseApi';

const MyPageLike = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  const [datas, setDatas] = useState<bookmark[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .getBookmark()
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <Row
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <Col>
          <MyPageLayout />
        </Col>
        <Col
          style={{
            width: 'calc(100% - 332px)',
          }}
        >
          <Row
            style={{
              paddingTop: '30px',
              paddingLeft: '50px',
            }}
          >
            <Col>
              <Row
                style={{
                  marginBottom: '30px',
                }}
              >
                <Col>좋아요 보관함</Col>
              </Row>
              <CardDiv>
                {datas
                  ? datas.map((data: bookmark, idx: number) => {
                      return (
                        <SummaryDiv key={idx}>
                          <Link to={`../course/${data.id}`}>
                            <SummaryTemp {...data.course_id} />
                          </Link>
                        </SummaryDiv>
                      );
                    })
                  : ``}
              </CardDiv>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageLike;

const Wrapper = styled.div``;
const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 2%;
  margin: auto;
  align-items: center;
  justify-content: left;
`;

const SummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #bdbdbd;
  overflow: hidden;
  margin: 4%;
  font-size: 1rem;
  font-weight: bold;
  a {
    text-decoration: none;
  }
  .image {
    background-color: #f5f5f5;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .bookmark {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
  }
  .explain {
    display: flex;
    flex-direction: column;
    padding: 5%;
    padding-left: 3%;
    text-align: left;
    background-color: white;
    div {
      margin: 0.5%;
    }
    float: bottom;
  }

  font-weight: bold;
  .title {
    color: ${(props) => props.theme.defaultText};
  }
  .duration {
    color: ${(props) => props.theme.main};
  }

  .hashTag {
    color: #988d8d;
  }
`;
