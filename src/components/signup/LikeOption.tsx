import styled from 'styled-components';

type Props = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
const LikeOption: React.FunctionComponent<Props> = ({ children, checked, setChecked }) => {
  const handleChange = () => {
    setChecked((current) => !current);
    console.log(checked);
  };
  return (
    <Button type="button" checked={checked} onClick={handleChange}>
      {children}
    </Button>
  );
};

const Button = styled.button<{ checked: boolean }>`
  background-color: ${(props) => (props.checked ? props.theme.main : props.theme.sub)};
  color: ${(props) => (props.checked ? props.theme.buttonText : props.theme.defaultText)};
  border: 1px solid ${(props) => (props.checked ? 'none' : props.theme.defaultText)};
`;

export default LikeOption;
