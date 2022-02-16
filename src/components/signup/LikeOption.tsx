import styled from 'styled-components';

type Props = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const LikeOption: React.FunctionComponent<Props> = ({ children, checked, setChecked }) => {
  const handleChange = () => {
    setChecked((current) => !current);
  };
  return (
    <Button type="button" checked={checked} onClick={handleChange}>
      {children}
    </Button>
  );
};

const Button = styled.button<{ checked: boolean }>`
  color: ${({ checked, theme }) => (checked ? theme.buttonText : theme.defaultText)};
  background-color: ${({ checked, theme }) => (checked ? theme.main : theme.sub)};
  border: 1px solid ${({ checked, theme }) => (checked ? 'none' : theme.defaultText)};
`;

export default LikeOption;
