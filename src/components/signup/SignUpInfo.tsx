import styled from 'styled-components';
const SignUpInfo: React.FunctionComponent<{ pageNumber: number }> = ({ pageNumber }) => {
  return (
    <Div>
      <Info number={pageNumber} infoId={1}>
        <div className="circle">1</div>
        기본정보
      </Info>

      <Info number={pageNumber} infoId={2}>
        <div className="circle">2</div>
        추가정보
      </Info>
    </Div>
  );
};

export default SignUpInfo;

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 50%;
  max-width: 400px;
`;

const Info = styled.div<{ number: number; infoId: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2vh auto;
  color: ${(props) => (props.number === props.infoId ? props.theme.main : props.theme.defaultText)};
  font-weight: bold;

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 1vh 0;
    font-size: 1vw;
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
    color: ${(props) => (props.number === props.infoId ? props.theme.buttonText : props.theme.defaultText)};
    background-color: ${(props) => (props.number === props.infoId ? props.theme.main : '#ACACAC')};
  }
`;
