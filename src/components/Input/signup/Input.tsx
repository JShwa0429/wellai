import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { PasswordInput } from '..';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = ({ children, type, ...rest }) => {
  const [withFocus, setWithFocus] = useState<boolean>(false);

  return (
    <Label onFocus={() => setWithFocus(true)} onBlur={() => setWithFocus(false)} withFocus={withFocus}>
      <span>{children}</span>
      {type !== 'password' ? <input {...rest} /> : <PasswordInput {...rest} />}
    </Label>
  );
};

export default Input;

const Label = styled.label<{ withFocus: boolean }>`
  position: relative;
  font-weight: bold;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: 0.5em 1vw;

  span {
    color: ${({ withFocus, theme }) => (withFocus ? theme.main : theme.text)};
    user-select: none;
  }
  input {
    width: 100%;
    padding: 13px 12px;
    line-height: 1.47;
    font-size: 15px;
    outline: 1px solid ${(props) => props.theme.text};
    letter-spacing: -0.3px;
    border-radius: 4px;
    font-weight: bold;
  }

  input:focus {
    outline: 2px solid ${(props) => props.theme.main};
  }

  input::placeholder {
    color: ${(props) => props.theme.defaultText};
    opacity: 0.5;
  }
`;
