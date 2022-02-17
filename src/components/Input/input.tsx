import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { IoEye, IoEyeOff } from 'react-icons/io5';
type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FunctionComponent<Props> = ({ type, children, name, placeholder, value, onChange }) => {
  const [withFocus, setWithFocus] = useState<boolean>(false);
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  return (
    <Label onFocus={() => setWithFocus(true)} onBlur={() => setWithFocus(false)} withFocus={withFocus}>
      <span>{children}</span>
      {type !== 'password' && (
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
      )}
      {type === 'password' && passwordHidden && (
        <>
          <input type="password" name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
          <div className="svgDiv">
            <IoEye size="1.5em" fill="black" onClick={() => setPasswordHidden((current) => !current)} />
          </div>
        </>
      )}
      {type === 'password' && !passwordHidden && (
        <>
          <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
          <div className="svgDiv">
            <IoEyeOff size="1.5em" fill="black" onClick={() => setPasswordHidden((current) => !current)} />
          </div>
        </>
      )}
    </Label>
  );
};

const Label = styled.label<{ withFocus: boolean }>`
  position: relative;
  font-weight: bold;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: 0.5em 1vw;

  p {
    color: ${({ withFocus, theme }) => (withFocus ? theme.main : theme.text)};
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
    outline: 3px solid ${(props) => props.theme.main};
  }

  input::placeholder {
    color: ${(props) => props.theme.defaultText};
    opacity: 0.5;
  }

  .svgDiv {
    position: absolute;
    top: 50%;
    right: 1em;
    cursor: pointer;
  }
`;
