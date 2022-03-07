import styled from 'styled-components';
import { Row, Col, Button, Rate, Card } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;

const MyPageComment = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

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
            <Col span={22}>
              <Row
                style={{
                  marginBottom: '30px',
                }}
              >
                <Col>차차님의 댓글</Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card hoverable style={{ borderRadius: '5px', width: '100%' }}>
                    <Row align="middle">
                      <Col>
                        <Rate disabled defaultValue={2} style={{ color: '#ff7273' }} />
                      </Col>
                      <Col>2022.02.22</Col>
                    </Row>
                    <Row>
                      <Col>제목</Col>
                      <Col>댓글</Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageComment;

const Wrapper = styled.div``;
