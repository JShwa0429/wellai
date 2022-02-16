import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { IoEye, IoEyeOff } from 'react-icons/io5';
type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FunctionComponent<Props> = ({ type, children, name, placeholder, value, onChange }) => {
  const [withFocus, setWithFocus] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  return (
    <Label onFocus={() => setWithFocus(true)} onBlur={() => setWithFocus(false)} withFocus={withFocus}>
      {children}
      {type !== 'password' && (
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
      )}
      {type === 'password' && passwordShow && (
        <>
          <input type={'password'} name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
          <div className="svgDiv">
            <IoEye size="1.5em" fill="black" onClick={() => setPasswordShow((current) => !current)} />
          </div>
        </>
      )}
      {type === 'password' && !passwordShow && (
        <>
          <input type={'text'} name={name} placeholder={placeholder} value={value} onChange={onChange}></input>
          <div className="svgDiv">
            <IoEyeOff size="1.5em" fill="black" onClick={() => setPasswordShow((current) => !current)} />
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
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0.5em 1vw;
  p {
    margin: 0.5em 0;
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

  .svgDiv {
    position: absolute;
    top: 50%;
    right: 1em;
    cursor: pointer;
  }
`;
