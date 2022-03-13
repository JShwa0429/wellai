import styled from 'styled-components';
import { Row, Col, Empty } from 'antd';
import { MyPageLayout } from 'components';
import { Summary2 } from 'components/common';
import { useEffect, useState } from 'react';
import { bookmark } from 'api/common';
import { CourseApi } from 'api';
import { MyPageLoading } from 'components';

const MyPageLike = () => {
  const [courseList, setCourseList] = useState<bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getBookmark() {
      const course = CourseApi();
      await course.getBookmark().then((res) => {
        setCourseList(res.data);

        setLoading(false);
      });
    }
    getBookmark();
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
            <Col span={24}>
              <Row
                style={{
                  marginBottom: '10px',
                }}
              >
                <Col style={{ fontSize: '20px' }}>좋아요 보관함</Col>
              </Row>
              {loading ? (
                <MyPageLoading />
              ) : (
                <Row>
                  {courseList
                    ? courseList.map((course: bookmark) => {
                        return (
                          <Col
                            key={course.course_id.id}
                            style={{ marginRight: '30px', marginBottom: '30px', width: '250px' }}
                          >
                            <Summary2 key={course.course_id.id} {...course.course_id} />
                          </Col>
                        );
                      })
                    : ``}
                </Row>
              )}
            </Col>
            {!loading && courseList.length < 1 && (
              <Col style={{ width: '80%' }}>
                <Empty style={{ marginTop: '40px' }} description={'좋아요한 코스가 없습니다'} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageLike;

const Wrapper = styled.div`
  width: 100%;
  height: max-content;
`;
