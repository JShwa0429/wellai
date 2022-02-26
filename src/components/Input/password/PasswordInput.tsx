import { InputHTMLAttributes, useState } from 'react';
import EyeIcon from './EyeIcon';
type InputProps = InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FunctionComponent<InputProps> = ({ onChange, value, placeholder, name, ...rest }) => {
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const handleToggleChange = () => {
    setPasswordHidden((current) => !current);
  };
  return (
    <>
      <input
        type={`${passwordHidden ? 'password' : 'text'}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <EyeIcon toggle={passwordHidden} onClick={handleToggleChange} />
    </>
  );
};

export default PasswordInput;
