import { QnA } from 'components';
import styled from 'styled-components';

type QnaType = {
  question: string;
  answer?: string;
  img?: string;
};
const QnAPage = () => {
  const qna: QnaType[] = [
    {
      question: '제가 운동하는 영상이 저장 되나요?',
      answer: '<p>아닙니다! 웹캠에서 촬영되는 영상은 <strong>서버에 저장되지 않으니</strong> 안심하세요~</p>',
    },
    {
      question: '코스 진행 방식이 궁금해요!',
      answer:
        '<p>한 코스에 3-5개의 자세로 구성이 되어 있습니다. 각 자세 별로 다음 자세까지의 제한 시간은 <b>4분</b>이며, 제한 시간 내에 순 운동시간을 다 채우지 못할 시 자동으로 넘어가게 됩니다. <br/>  순 운동시간은 정확한 자세로 운동 했을 때 초단위로 누적되어 1분까지 채워 주시면 됩니다. 운동 페이지 상단에 <strong><다음 운동으로></strong> 버튼도 제공하고 있으니, 최대한 자세를 따라해 주시되 어렵다 느끼시면 다음 동작을 진행해 보세요!</p>',
    },
    {
      question: '운동 진행 화면은 어떻게 구성되어 있나요?',
      img: 'image/qna-001.png',
    },
    {
      question: '자세가 정확한지는 어떻게 알 수 있나요?',
      answer:
        '<p>정확하게 자세를 수행하시면, 웹캠 화면 속 몸에 그려져 있는 선들이 <b>초록색</b>으로 변경됩니다! 자세가 정확하지 않으면 회색으로 변경되니 운동 시 참고하시기 바라요😉</p>',
    },
    {
      question: '운동 시간은 어떻게 계산되나요?',
      answer:
        '<p>- 순 운동시간 : 가이드 영상 속 자세에 맞는 정확한 자세를 유지했을 시, 운동 시간이 증가합니다! <br/> - 총 운동시간 : 한 코스 진행시 누적되는 순 운동시간의 총합입니다! 마이페이지 운동 리포트에서 운동이 끝난 뒤 확인하실 수 있어요😃</p>',
    },
    {
      question: '모바일, 태블릿에서도 가능한가요?',
      answer:
        '<p>가이드 영상과 사용자의 운동 웹캠 영상을 한 화면에 담기 위해서는 넓은 화면이 사용성이 높다고 판단, 현재는 <strong>PC</strong>, <b>Web</b>에서만 서비스를 사용하실 수 있습니다. </p>',
    },
    {
      question: '코스 추천은 어떻게 해주시는 건가요?',
      answer:
        '<p>회원 가입시 선택해 주셨던 <strong>선호 운동 타입</strong>에 따라 추천해 드립니다. 선호 운동은 마이페이지 → 내 정보 변경 에서 수정하실 수 있습니다.</p>',
    },
    {
      question: '칼로리 계산은 어떻게 하나요?',
      answer:
        '<p>- 사용자의 신체 정보와 연구 및 운동 처방에 많이 사용되고 있는 대사 활동량(Metabolic Equivalent of Task, MET)단위를 이용해서 소모한 칼로리를 계산하고 있습니다.<br/>- 💡 참고: MET는 1분간 소비되는 단위 체중당 에너지 소비량을 의미합니다.</p>',
    },
  ];
  return (
    <Div>
      <div className="image">
        <h1>자주 묻는 질문</h1>
        <img src="image/qna.png" alt="qna" />
      </div>
      <div className="qna">
        {qna.map((QA, idx) => {
          return <QnA key={idx + 1} id={idx + 1} {...QA} />;
        })}
      </div>
    </Div>
  );
};

export default QnAPage;

const Div = styled.div`
  width: 100vw;
  min-width: 1000px;
  height: max-content;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  img {
    min-height: 400px;
    z-index: -1;
    height: 100%;
    object-fit: cover;
  }
  .image {
    position: fixed;
    z-index: -2;
    left: 7.5%;
    height: 80%;
    display: flex;
    flex-direction: column;
    height: calc(95vh - 80px);
    min-width: 15em;
    width: 30%;
    margin-right: 10%;
    align-items: center;
    justify-content: center;
    h1 {
      margin-left: 1em;
      margin-right: auto;
    }
  }

  .qna {
    margin-top: 4em;
    margin-left: 30%;
    margin-bottom: 30px;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
