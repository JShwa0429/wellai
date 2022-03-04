import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import MainImage from 'asset/main_page_img.png';
import MainImage2 from 'asset/main_page_img_5.jpeg';
const MainRenderPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Row justify="space-between" style={{ height: '100vh' }}>
        <Col
          style={{
            paddingLeft: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Row>
            <Col
              style={{
                fontSize: '75px',
                fontWeight: '910',
                color: 'transparent',
                backgroundImage: `url(${MainImage2})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundPosition: 'right',
                lineHeight: '1',
                marginBottom: '10px',
                WebkitFontSmoothing: 'antialiased',
                zIndex: 999,
              }}
            >
              집에서도 지키는 <br /> 나만의 건강
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                fontSize: '20px',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}
            >
              언제 어디서나 당신의 건강을 책임지는 AI 홈트 서비스
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="primary" size="large" onClick={() => navigate('/course')}>
                운동 바로가기
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <img style={{ width: '550px', maxHeight: '100vh' }} src={MainImage} alt="" />
        </Col>
      </Row>
      <Row style={{ height: '1000px' }}> </Row>
    </Wrapper>
  );
};

export default MainRenderPage;

const Wrapper = styled.div`
  width: 90vw;
  min-width: 1000px;
  max-width: 1400px;
  height: max-content;
  justify-content: center;
  margin: auto;
  margin-top: -80px;
  /* height: calc(100vh - 80px); */
  /* background-color: ${(props) => props.theme.light}; */
  /* background-image: url(${MainImage}); */
  /* background: linear-gradient(
      to left,
      rgba(255, 114, 115, 0.05) 50%,
      rgba(255, 114, 115, 0.15) 60%,
      rgba(255, 114, 115, 0.25) 70%,
      rgba(255, 114, 115, 0.35) 80%,
      rgba(255, 114, 115, 0.45) 90%,
      rgba(255, 114, 115, 0.55) 100%
    ),
    url(${MainImage});
  background-repeat: no-repeat;
  background-size: cover; ; */
`;
