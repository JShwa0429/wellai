import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  setValue: (arg: string) => void;
};

const Input: React.FunctionComponent<Props> = ({ type, children, name, placeholder, value, setValue }) => {
  const [withFocus, setWithFocus] = useState<boolean>(false);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Label onFocus={() => setWithFocus(true)} onBlur={() => setWithFocus(false)} withFocus={withFocus}>
      <p>{children}</p>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={handleValueChange}></input>
    </Label>
  );
};

export default Input;

const Label = styled.label<{ withFocus: boolean }>`
  font-weight: bold;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1vh 1vw 0vh 1vw;
  p {
    margin: 1vh 0;
    margin-right: auto;
    color: ${(props) => (props.withFocus ? props.theme.main : props.theme.defaultText)};
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 13px 12px;
    line-height: 1.47;
    font-size: 15px;
    outline: 1px solid ${(props) => props.theme.defaultText};
    letter-spacing: -0.3px;
    border-radius: 4px;
    font-weight: bold;
  }

  input:focus {
    outline: 3px solid ${(props) => props.theme.main};
  }

  input::placeholder {
    color: ${(props) => props.theme.defaultText};
    opacity: 0.5;
  }
`;
