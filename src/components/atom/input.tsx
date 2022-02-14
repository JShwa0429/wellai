import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  name?: string;
  placeholder?: string;
};

const Input: React.FunctionComponent<Props> = ({ type, children, name, placeholder }) => {
  const [withFocus, setWithFocus] = useState<boolean>(false);
  return (
    <Label onFocus={() => setWithFocus(true)} onBlur={() => setWithFocus(false)} withFocus={withFocus}>
      <p>{children}</p>
      <input type={type} name={name} placeholder={placeholder}></input>
    </Label>
  );
};

export default Input;

const Label = styled.label<{ withFocus: boolean }>`
  font-weight: bold;
  margin: auto;
  p {
    margin: 1vh 0;
    color: ${(props) => (props.withFocus ? props.theme.main : props.theme.defaultText)};
    font-weight: bold;
  }
  input {
    margin: 2vh 1vw;
    margin-top: 0px;
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
