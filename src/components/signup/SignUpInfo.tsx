import styled from 'styled-components';
const SignUpInfo: React.FunctionComponent<{ pageNumber: number }> = ({ pageNumber }) => {
  return (
    <Div>
      <Info number={pageNumber} infoId={1}>
        <div className="circle">1</div>
        <h3>기본정보</h3>
      </Info>
      <Hr number={pageNumber} />
      <Info number={pageNumber} infoId={2}>
        <div className="circle">2</div>
        <h3>추가정보</h3>
      </Info>
    </Div>
  );
};

export default SignUpInfo;

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 400px;
  margin-top: 28px;
`;

const Hr = styled.hr<{ number: number }>`
  position: absolute;
  left: 30%;
  top: 42%;
  width: 40%;
  color: black;
  border-top: 1px solid #acacac;
  margin: 0;
  padding: 0;
  z-index: -1;
  visibility: ${(props) => (props.number === 3 ? 'hidden' : 'visible')};
`;

const Info = styled.div<{ number: number; infoId: number }>`
  visibility: ${(props) => (props.number === 3 ? 'hidden' : 'visible')};
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

    margin: 15px 0;
    font-size: 1em;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: ${(props) => (props.number === props.infoId ? props.theme.buttonText : props.theme.defaultText)};
    background-color: ${(props) => (props.number === props.infoId ? props.theme.main : '#ACACAC')};
  }
`;
