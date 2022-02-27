export type SummaryProps = {
  id: string;
  title: string;
  duration: string[];
  hashTags: string[];
};
const Summary: React.FunctionComponent<SummaryProps> = ({ title, duration, hashTags }) => {
  return (
    <>
      <div className="image">
        <img src={`${process.env.PUBLIC_URL}/image/yoga.svg`} alt="요가" />
      </div>
      <div className="explain">
        <div className="title">
          <p>{title}</p>
        </div>

        {/*
      길이가 일정이상 길면 뒷부분을 ...으로 대체한다
      */}
        <div className="duration">
          <p>{duration.join(' / ')}</p>{' '}
        </div>
        <div className="hashTag">
          <p>{hashTags.join(' ')}</p>
        </div>
      </div>
    </>
  );
};

export default Summary;
