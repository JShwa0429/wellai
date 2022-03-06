import { CourseApi } from 'api/CourseApi';
import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

export type SummaryProps = {
  id: string;
  title: string;
  duration: string[];
  hashTags: string[];
};
const Summary: React.FunctionComponent<SummaryProps> = ({ title, duration, hashTags }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { id } = useParams();
  const handleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const course = CourseApi();
    if (toggle) course.deleteBookmark(id ?? '0');
    else if (!toggle) course.postBookmark(id ?? '0').catch((err) => console.log(err.response));
    setToggle((current) => !current);
  };
  return (
    <>
      <div className="image">
        <button className="bookmark" onClick={handleBookmark}>
          <img src={`${process.env.PUBLIC_URL}/image/${toggle ? 'heart_on.png' : 'heart_off.png'}`} alt="좋아요" />
        </button>

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
