import styled from 'styled-components';
import { Button } from './Signup';
const SignUpOption: React.FunctionComponent<{ pageNumber: number; handlePrevPage: () => void }> = ({
  pageNumber,
  handlePrevPage,
}) => {
  return (
    <>
      {pageNumber == 2 && (
        <>
          <h3>
            최적의 운동을 추천해드릴 수 있는
            <br /> 선택 입력 사항이에요.
          </h3>
          <form>
            <InputDiv>
              <label>
                성별(선택)
                <label>
                  <input type="radio" id="man" name="gender" value="man" />
                  <Span>남자</Span>
                </label>
                <label>
                  <input type="radio" id="man" name="gender" value="man" />
                  <Span>여자</Span>
                </label>
              </label>
            </InputDiv>
            <InputDiv>
              <span>키(선택)</span>
              <input type="text" />
              <InputDiv>
                <span>몸무게(선택)</span>
                <input type="text"></input>
                kg
              </InputDiv>
              <InputDiv>
                <span>
                  선호하는 운동
                  <br />
                  (선택 최대 2개)
                </span>
                <ExersizeSelect>
                  <button>코어</button>
                  <button>코어</button>
                  <button>코어</button>
                  <button>코어</button>
                  <button>코어</button>
                  <button>코어</button>
                </ExersizeSelect>
              </InputDiv>
            </InputDiv>
          </form>
          <ButtonDiv>
            <Button onClick={handlePrevPage} pageNumber={pageNumber}>
              이전으로 가기
            </Button>
            <Button pageNumber={pageNumber}>완료</Button>
          </ButtonDiv>
        </>
      )}
    </>
  );
};

export default SignUpOption;

const InputDiv = styled.div`
  [type='radio'] {
    display: none;
  }
  [type='text'] {
    width: 150px;
  }
`;

const Span = styled.div`
  display: inline-block;
  padding: 15px 10px;
  border: 1px solid #dfdfdf;
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.buttonText};
`;

const ExersizeSelect = styled.div`
  width: 100%;
  height:
  display: grid;
  grid-template-rows: 1fr 1fr;
  grrd-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
`;

const ButtonDiv = styled.div`
  margin-top: auto;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
