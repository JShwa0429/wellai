import styled from 'styled-components';
import { Row, Col, Button, Input, Card } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;

const MyPageLike = () => {
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
            <Col>
              <Row
                style={{
                  marginBottom: '30px',
                }}
              >
                <Col>좋아요 보관함</Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
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

export default MyPageLike;

const Wrapper = styled.div``;
