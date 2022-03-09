import styled from 'styled-components';
import { Row, Col } from 'antd';
import { MyPageLayout } from 'components';
import { Link } from 'react-router-dom';
import SummaryTemp from 'components/common/SummaryTemp';
import { useEffect, useState } from 'react';
import { bookmark } from 'api/common';
import { CourseApi } from 'api/CourseApi';

const MyPageLike = () => {
  // const [record, setRecord] = useState({ month_exercise_time: 40, month_calories: 20 });
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  const [courseList, setCourseList] = useState<bookmark[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .getBookmark()
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <Row
        justify="space-between"
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
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
                <Col style={{ fontSize: '20px' }}>좋아요 보관함</Col>
              </Row>
              <CardDiv>
                {courseList
                  ? courseList.map((course: bookmark, idx: number) => {
                      return (
                        <SummaryDiv key={idx}>
                          <Link to={`../course/${course.id}`}>
                            <SummaryTemp {...course.course_id} />
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

const Wrapper = styled.div`
  width: 100%;
`;
const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
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
