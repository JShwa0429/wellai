import styled from 'styled-components';

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
const Count = ({ count, setCount }: Props) => {
  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={handlePlus}>+</Button>
      <Button onClick={handleMinus}>-</Button>
    </div>
  );
};

export default Count;

const Button = styled.button`
  width: 150px;
  border: 1px solid black;
`;
