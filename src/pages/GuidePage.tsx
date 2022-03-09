import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const GuidePage = () => {
  const { id } = useParams();
  return (
    <Div>
      <div className="image">
        <img alt="회원가입 사진" src="/image/before_course.jpg" />
        <DivEllipse>
          <DivIntroduce>
            <h1>나마스떼!</h1>
            <div className="left-detail">
              <h2>
                잠시 후 수업이 시작됩니다.
                <br />
                <br />
                원활한 수업 진행을 위해
                <br />
                우측의 안내사항을 숙지한 뒤
                <br />
                수업에 참여해 주세요:)
              </h2>
            </div>
          </DivIntroduce>
          <img alt="원" src="/image/ellipse.png" />
        </DivEllipse>
      </div>
      <DivNotification>
        <DivTitle>
          <img src="/image/guide.png" alt="안내사항" />
          <h1>안내사항</h1>
        </DivTitle>
        <ol type="1">
          <li>
            <b>전신이 카메라에 담길 수 있는 거리</b>에서 운동을 시작해 주세요.
          </li>
          <li>
            정확한 자세로 운동을 하실 때는 카메라 화면 속 운동 자세가 <b style={{ color: '#00C9A7' }}>초록색</b>
            으로 보이게 됩니다.
          </li>
          <li>
            각 자세 별로 <b>순 운동시간 1분</b>을 채워 주세요. (정확한 자세 수행 시 운동 시간 카운트 시작)
          </li>
          <li>
            각 <b>자세 별 운동 시간은 최대 4분</b>입니다. 4분 이후에는 순 운동시간을 채우지 못하셨더라도 다음 자세로
            넘어가게 됩니다.
          </li>
          <li>요가 특성 상 많은 횟수로 자세를 반복하시기보다 천천히, 호흡을 고르며 일정 시간 자세를 유지해 주세요.</li>
          <li>카메라가 전신을 명확히 인식할 수 없는 경우 안내 메세지로 알려 드립니다.</li>
        </ol>
        <div>
          <Link to={`/exercise/${id}`}>
            <Button>운동 시작하기</Button>
          </Link>
        </div>
      </DivNotification>
    </Div>
  );
};

export default GuidePage;
const Div = styled.div`
  min-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -80px;
  overflow: hidden;
  .image {
    position: relative;
    img {
      min-height: 100vh;
      max-height: 130vh;
    }
  }
`;

const DivEllipse = styled.div`
  position: absolute;
  top: 25%;
  left: 0;
  width: 100%;
  img {
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    position: relative;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    align-items: center;
    text-align: center;
  }
`;

const DivIntroduce = styled.div`
  position: absolute;
  margin-top: 25%;
  height: 25%;
  z-index: 90;
  display: flex;
  align-items: center;
  h1 {
    margin: 0;
    color: white;
    line-height: 10px;
    font-size: 2.5em;
  }
  .left-detail {
    margin-top: 5vh;
    h2 {
      color: white;
    }
  }
`;
const DivNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: auto;
  font-size: 1em;
  font-color: ${(props) => props.theme.defaultText};
  h1 {
    color: ${(props) => props.theme.main};
    font-size: 2.5em;
  }
  b {
    color: ${(props) => props.theme.main};
  }
  ol li {
    list-style: decimal;
    list-style-position: inside;
    word-break: keep-all;
    margin-right: auto;
    line-height: 2em;
  }

  ol {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 700px;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
  }
`;

const DivTitle = styled.div`
  width: 80%;
  max-width: 700px;
  display: flex;
`;
const Button = styled.button`
  margin-top: 15px;
  width: 10em;
  height: 3em;
  font-size: 1.2em;
  border-radius: 4px;
  color: ${(props) => props.theme.sub};
  background: ${(props) => props.theme.main};
`;
