import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { saveOptions } from 'features/signupSlice';
import { Options } from 'type';
import { SignUpApi } from 'api';

type Props = {
  pageNumber: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

type Preference = {
  id: string;
  text: string;
  checked: boolean;
};

const SignUpOption: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [gender, setGender] = useState<string | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [preferenceList, setPreferenceList] = useState<Preference[]>([
    { id: '0', text: '코어', checked: false },
    { id: '1', text: '다리', checked: false },
    { id: '2', text: '등', checked: false },
    { id: '3', text: '서서', checked: false },
    { id: '4', text: '앉아서', checked: false },
    { id: '5', text: '밸런스', checked: false },
  ]);
  const dispatch = useDispatch();
  const signUp = useSelector((state: RootState) => state.signUp);
  const handleSaveOption = () => {
    const options: Options = {
      gender: gender,
      weight: weight,
      height: height,
      is_core: preferenceList[0].checked,
      is_leg: preferenceList[1].checked,
      is_back: preferenceList[2].checked,
      is_stand: preferenceList[3].checked,
      is_sit: preferenceList[4].checked,
      is_balance: preferenceList[5].checked,
    };
    dispatch(saveOptions(options));
  };

  const handleCheckPreference = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setPreferenceList((current) => {
      const newPreferenceList = [...current];
      for (let i = 0; i < newPreferenceList.length; i++) {
        if (id === newPreferenceList[i].id) newPreferenceList[i].checked = !newPreferenceList[i].checked;
      }
      return newPreferenceList;
    });
  };

  const genderArray = [
    { id: 'M', text: '남' },
    { id: 'F', text: '여' },
  ];
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSaveOption();
    const signupApi = SignUpApi();
    signupApi
      .signUpAccount(signUp)
      .then((res) => {
        if (res.status === 201) handleNextPage();
        else alert('회원가입 실패');
      })
      .catch((err) => {
        console.log(err);
        alert('회원가입 실패');
      });
    //handleNextPage();
  };

  const checkboxDisable = useMemo(() => {
    return preferenceList.filter((preference) => preference.checked === true).length > 1 ? true : false;
  }, [preferenceList]);
  return (
    <Div>
      <form onSubmit={handleSubmit}>
        <h2>
          최적의 운동을 추천해 드리기 위한
          <br /> 선택 입력 사항이에요.
        </h2>
        <InputDiv>
          <span>
            <p style={{ textDecoration: 'square' }}>• 성별(선택)</p>
          </span>
          <GenderDiv>
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
          </GenderDiv>
        </InputDiv>
        <div style={{ flexDirection: 'row' }}>
          <InputDiv>
            <span>• 체형(선택)</span>
            <BodyDiv>
              <OptionDiv>
                <input
                  type="number"
                  value={height}
                  step="0.1"
                  onChange={(event) => setHeight(parseFloat(event.target.value))}
                />
                <span>cm</span>
              </OptionDiv>
              <OptionDiv>
                <input
                  type="number"
                  value={weight}
                  step="0.1"
                  onChange={(event) => setWeight(parseFloat(event.target.value))}
                ></input>
                <span>kg</span>
              </OptionDiv>
            </BodyDiv>
          </InputDiv>
        </div>
        <InputDiv>
          <span>• 선호하는 운동 (최대 2개)</span>
          <PreferenceDiv>
            {preferenceList.map((preference, idx) => {
              return (
                <button
                  key={idx}
                  type="button"
                  name={preference.text}
                  className={preference.checked ? 'active' : ''}
                  id={preference.id}
                  onClick={handleCheckPreference}
                  disabled={preference.checked ? false : checkboxDisable}
                >
                  {preference.text}
                </button>
              );
            })}
          </PreferenceDiv>
        </InputDiv>
        <ButtonDiv>
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
  margin: 0.5vh 0;
  span {
    text-align: center;
    font-weight: bold;
    margin-right: auto;
  }
  label {
    width: 100%;
  }
  input {
    margin-top: 0;
    line-height: 1.47;
    font-size: 1em;
    outline: 1px solid ${({ theme }) => theme.text};
    letter-spacing: -0.3px;
    width: 100%;
    font-weight: bold;
  }
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
  color: ${({ finish, theme }) => (finish ? theme.buttonText : theme.text)};
  border: ${({ finish, theme }) => (finish ? '0px' : '1px solid' + theme.text)};
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
  color: ${({ gender, id, theme }) => (gender === id ? theme.sub : theme.text)};
  background-color: ${({ gender, id, theme }) => (gender === id ? theme.main : theme.sub)};
  border: 2px solid ${({ gender, id, theme }) => (gender === id ? 'none' : theme.border)};
  width: 100%;
  height: 2.5em;
  border-radius: 4px;
  font-weight: bold;
`;

const GenderDiv = styled.div`
  margin-top: 2%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 20%;
`;

const BodyDiv = styled.div`
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 120%;
  padding: 0 0 0 10%;
  grid-gap: 10%;

  input:focus {
    outline: 3px solid ${(props) => props.theme.main};
  }
`;

const OptionDiv = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.defaultText};
  input {
    outline: 2px solid ${(props) => props.theme.border};
    width: 80%;
    padding-left: 1em;
  }
  span {
    position: absolute;
    right: 5%;
    top: 30%;
  }
`;

const PreferenceDiv = styled.div`
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  width: 100%;
  button {
    border: 1px solid ${(props) => props.theme.border};
    width: 100%;
    height: 2.5em;
    border-radius: 4px;
    font-weight: 700;
    color: ${(props) => props.theme.text};
  }
  .active {
    color: ${(props) => props.theme.sub};
    border: 0px;
    background-color: ${(props) => props.theme.main};
  }
`;
