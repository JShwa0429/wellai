import styled from 'styled-components';
import LikeOption from './LikeOption';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Option, saveOption } from 'features/signupSlice';
import axios from 'axios';

type Props = {
  pageNumber: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const SignUpOption: React.FunctionComponent<Props> = ({ pageNumber, handlePrevPage, handleNextPage }) => {
  const [gender, setGender] = useState<string | null>(
    useSelector((state: RootState) => state.signUp?.option.gender ?? null),
  );
  const [weight, setWeight] = useState<number>(useSelector((state: RootState) => state.signUp?.option.weight ?? 0));
  const [height, setHeight] = useState<number>(useSelector((state: RootState) => state.signUp?.option.height ?? 0));
  const [core, setLikeCore] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.core));
  const [leg, setLeg] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.leg));
  const [back, setBack] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.back));
  const [stand, setStand] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.stand));
  const [sit, setSit] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.sit));
  const [balance, setBalance] = useState<boolean>(useSelector((state: RootState) => state.signUp.option.balance));
  const dispatch = useDispatch();
  const signUp = useSelector((state: RootState) => state.signUp);
  const handleSaveOption = () => {
    const option: Option = {
      gender: gender,
      weight: weight,
      height: height,
      core: core,
      leg: leg,
      back: back,
      stand: stand,
      sit: sit,
      balance: balance,
    };
    dispatch(saveOption(option));
  };

  const genderArray = [
    { id: 'M', text: '남자' },
    { id: 'F', text: '여자' },
  ];
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSaveOption();

    console.log(signUp);
    axios
      .post('/users/register/', {
        user_id: signUp.userId,
        nickname: signUp.nickname,
        password: signUp.password,
        options: signUp.option,
      })
      .then((res) => {
        if (res.statusText === 'Created') handleNextPage();
      })
      .catch((err) => console.log(err));
    //handleNextPage();
  };
  return (
    <Div>
      <h3>
        최적의 운동을 추천해 드리기 위한
        <br /> 선택 입력 사항이에요.
      </h3>
      <form onSubmit={handleSubmit}>
        <InputDiv>
          <span>
            <p style={{ textDecoration: 'square' }}>• 성별(선택)</p>
          </span>
          <ButtonDiv>
            {genderArray.map((genderElem) => (
              <GenderButton
                key={genderElem.id}
                type="button"
                gender={gender}
                id={genderElem.id}
                onClick={() => setGender(genderElem.id)}
              >
                {genderElem.text}
              </GenderButton>
            ))}
          </ButtonDiv>
        </InputDiv>
        <div style={{ flexDirection: 'row' }}>
          <InputDiv>
            <span>• 체형(선택)</span>
            <InputDiv style={{ flexDirection: 'row' }}>
              <OptionDiv>
                <input
                  type="number"
                  value={height}
                  step="0.1"
                  onChange={(event) => setHeight(parseFloat(event.target.value))}
                />
                <b>cm</b>
              </OptionDiv>
              <OptionDiv>
                <input
                  type="number"
                  value={weight}
                  step="0.1"
                  onChange={(event) => setWeight(parseFloat(event.target.value))}
                ></input>
                <b>kg</b>
              </OptionDiv>
            </InputDiv>
          </InputDiv>
        </div>
        <InputDiv>
          <span>• 선호하는 운동 (최대 2개)</span>
          <LikeSelect>
            <LikeOption checked={core} setChecked={setLikeCore}>
              코어
            </LikeOption>
            <LikeOption checked={leg} setChecked={setLeg}>
              다리
            </LikeOption>
            <LikeOption checked={back} setChecked={setBack}>
              등
            </LikeOption>
            <LikeOption checked={stand} setChecked={setStand}>
              서서
            </LikeOption>
            <LikeOption checked={sit} setChecked={setSit}>
              앉아서
            </LikeOption>
            <LikeOption checked={balance} setChecked={setBalance}>
              밸런스
            </LikeOption>
          </LikeSelect>
        </InputDiv>
        <ButtonDiv>
          {/* <MoveButton
            onClick={() => {
              handleSaveOption();
              handlePrevPage();
            }}
            pageNumber={pageNumber}
            finish={false}
          >
            이전으로
          </MoveButton> */}
          <MoveButton type="submit" pageNumber={pageNumber} finish={true}>
            완료!
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
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0px;
  h3 {
    margin-top: 5vh;
    margin-bottom: auto;
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  [type='radio'] {
    display: none;
  }
  margin: 1vh 0;
  span {
    text-align: center;
    font-weight: bold;
    margin-right: auto;
  }
  label {
    width: 100%;
  }
  input {
    padding: 0.5em;
    line-height: 1.47;
    font-size: 1em;
    outline: 1px solid ${({ theme }) => theme.defaultText};
    letter-spacing: -0.3px;

    font-weight: bold;
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
    border-radius: 4px;
  }
`;

const LikeSelect = styled.div`
  width: 100%;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1vh 1vw;
  font-weight: bold;
  button {
    height: 2em;
    width: 5em;
    border-radius: 4px;
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
  justify-content: center;
`;

const MoveButton = styled.button<{ pageNumber: number; finish: boolean }>`
  color: ${({ finish, theme }) => (finish ? theme.buttonText : theme.defaultText)};
  border: ${({ finish, theme }) => (finish ? '0px' : '1px solid' + theme.defaultText)};
  background-color: ${({ finish, theme }) => (finish ? theme.main : theme.sub)};
  width: 100%;
  min-height: 2em;
  height: 8vh;
  max-height: 3em;
  font-weight: bold;
  margin: auto;
  border-radius: 4px;
`;

const GenderButton = styled.button<{ gender: string | null; id: string }>`
  color: ${({ gender, id, theme }) => (gender === id ? theme.sub : theme.defaultText)};
  background-color: ${({ gender, id, theme }) => (gender === id ? theme.main : theme.sub)};
  border: 1px solid ${({ gender, id, theme }) => (gender === id ? 'none' : theme.defaultText)};
  width: 40%;
  margin: 0 5%;
  height: 2.5em;
  border-radius: 4px;
  font-weight: bold;
`;
