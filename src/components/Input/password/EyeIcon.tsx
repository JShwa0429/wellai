import { HTMLAttributes } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import styled from 'styled-components';
const EyeIcon: React.FunctionComponent<HTMLAttributes<HTMLDivElement> & { toggle: boolean }> = ({
  toggle,
  onClick,
}) => {
  return (
    <DivIoEye onClick={onClick}>
      {/* 이런 식으로 같은 props 값이지만, 다른 컴포넌트일 때 어떤 식으로 props를 보내주는 게 좋은 방법인가요? */}
      {toggle ? <IoEye size="1.5em" fill="black" /> : <IoEyeOff size="1.5em" fill="black" />}
    </DivIoEye>
  );
};

export default EyeIcon;

const DivIoEye = styled.div`
  position: absolute;
  top: 50%;
  right: 1em;
  cursor: pointer;
`;
