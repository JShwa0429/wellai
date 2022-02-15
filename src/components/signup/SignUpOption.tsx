import styled from 'styled-components';
import LikeOption from './LikeOption';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Option, saveOption } from 'features/signupSlice';

type Props = {
  pageNumber: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const SignUpOption: React.FunctionComponent<Props> = ({ pageNumber, handlePrevPage, handleNextPage }) => {
  const [gender, setGender] = useState<string>(useSelector((state: RootState) => state.signUp?.gender ?? ''));
  const [weight, setWeight] = useState<number>(useSelector((state: RootState) => state.signUp?.weight ?? 0));
  const [height, setHeight] = useState<number>(useSelector((state: RootState) => state.signUp?.height ?? 0));
  const [likeCore, setLikeCore] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeCore));
  const [likeLeg, setLikeLeg] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeLeg));
  const [likeBack, setLikeBack] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeBack));
  const [likeStand, setLikeStand] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeStand));
  const [likeSit, setLikeSit] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeSit));
  const [likeBalance, setLikeBalance] = useState<boolean>(useSelector((state: RootState) => state.signUp.likeBalance));
  const dispatch = useDispatch();
  const handleSaveOption = (event: React.FormEvent) => {
    event.preventDefault();
    const option: Option = {
      gender: gender,
      weight: weight,
      height: height,
      likeCore: likeCore,
      likeLeg: likeLeg,
      likeBack: likeBack,
      likeStand: likeStand,
      likeSit: likeSit,
      likeBalance: likeBalance,
    };
    dispatch(saveOption(option));
    handleNextPage();
  };
  return (
    <Div>
      <h3>
        최적의 운동을 추천해드릴 수 있는
        <br /> 선택 입력 사항이에요.
      </h3>
      <form onSubmit={handleSaveOption}>
        <InputDiv>
          <span>
            <br />
            성별
            <br />
            <small>(선택)</small>
          </span>
          <ButtonDiv>
            <GenderButton type="button" gender={gender} genderId={'M'} onClick={() => setGender('M')}>
              남자
            </GenderButton>
            <GenderButton type="button" gender={gender} genderId={'F'} onClick={() => setGender('F')}>
              여자
            </GenderButton>
          </ButtonDiv>
        </InputDiv>
        <InputDiv>
          <span>
            <br />
            키<br />
            <small>(선택)</small>
          </span>
          <OptionDiv>
            <input
              type="number"
              value={height}
              step="0.1"
              onChange={(event) => setHeight(parseFloat(event.target.value))}
            />
            <span>cm</span>
          </OptionDiv>
        </InputDiv>
        <InputDiv>
          <span>
            <br />
            몸무게
            <br />
            <small>(선택)</small>
          </span>
          <OptionDiv>
            <input
              type="number"
              value={weight}
              step="0.1"
              onChange={(event) => setWeight(parseFloat(event.target.value))}
            ></input>
            <span>kg</span>
          </OptionDiv>
        </InputDiv>
        <InputDiv>
          <span>
            선호하는 운동
            <br />
            <small>(선택 최대 2개)</small>
          </span>
          <ExersizeSelect>
            <LikeOption checked={likeCore} setChecked={setLikeCore}>
              코어
            </LikeOption>
            <LikeOption checked={likeLeg} setChecked={setLikeLeg}>
              다리
            </LikeOption>
            <LikeOption checked={likeBack} setChecked={setLikeBack}>
              등
            </LikeOption>
            <LikeOption checked={likeStand} setChecked={setLikeStand}>
              서서
            </LikeOption>
            <LikeOption checked={likeSit} setChecked={setLikeSit}>
              앉아서
            </LikeOption>
            <LikeOption checked={likeBalance} setChecked={setLikeBalance}>
              밸런스
            </LikeOption>
          </ExersizeSelect>
        </InputDiv>
        <ButtonDiv>
          <MoveButton onClick={handlePrevPage} pageNumber={pageNumber} finish={false}>
            이전으로
          </MoveButton>
          <MoveButton type="submit" pageNumber={pageNumber} finish={true}>
            완료
          </MoveButton>
        </ButtonDiv>
      </form>
    </Div>
  );
};

export default SignUpOption;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0px;
  h3 {
    margin-top: 5vh;
    margin-bottom: auto;
  }
  form {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
const InputDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  width: 100%;
  align-items: center;

  [type='radio'] {
    display: none;
  }
  margin: 1vh 0;
  span {
    text-align: center;
    font-weight: bold;
  }
  label {
    width: 100%;
  }
  input {
    margin-left: auto;
    padding: 0.5em;
    line-height: 1.47;
    font-size: 1em;
    outline: 1px solid ${(props) => props.theme.defaultText};
    letter-spacing: -0.3px;
    border-radius: 10px;
    font-weight: bold;
    margin-right: 5%;
  }
`;

const OptionDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-right: auto;
  }

  input {
    width: 40%;
    margin: 0 1em;
  }
`;

const ExersizeSelect = styled.div`
  width: 100%;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1vh 1vw;
  font-weight: bold;
  button {
    height: 2em;
    width: 5em;
    border-radius: 5px;
    font-weight: bold;
  }
  padding: 0 1vw 0 0;
`;

const ButtonDiv = styled.div`
  margin-top: auto;
  width: 100%;
  heigt: 100%;
  display: flex;
  padding: 0;
  justify-content: space-between;
`;

const MoveButton = styled.button<{ pageNumber: number; finish: boolean }>`
  background-color: ${(props) => (props.finish ? props.theme.main : props.theme.sub)};
  color: ${(props) => (props.finish ? props.theme.buttonText : props.theme.defaultText)};
  border: ${(props) => (props.finish ? '0px' : '1px solid' + props.theme.defaultText)};
  width: 40%;
  min-height: 2em;
  height: 8vh;
  max-height: 3em;
  font-weight: bold;
  margin-top: auto;
  margin: 2vh;
  border-radius: 10px;
`;

const GenderButton = styled.button<{ gender: string; genderId: string }>`
  border: ${(props) => (props.gender === props.genderId ? props.theme.main : '1px solid' + props.theme.defaultText)};
  color: ${(props) => (props.gender === props.genderId ? props.theme.sub : '1px solid' + props.theme.defaultText)};
  background-color: ${(props) => (props.gender === props.genderId ? props.theme.main : '1px solid' + props.theme.sub)};
  width: 40%;
  margin: 0 5%;
  height: 2.5em;
  border-radius: 10px;
  font-weight: bold;
`;
