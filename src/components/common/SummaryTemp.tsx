import { detailResponse } from 'api/common';
import { CourseApi } from 'api/CourseApi';
import React, { useState } from 'react';
const SummaryTemp: React.FunctionComponent<detailResponse> = ({ id, course_name, img_url, hash_tag }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const course = CourseApi();
    if (toggle) course.deleteBookmark(id);
    else if (!toggle) {
      course.postBookmark(id).then((res) => {
        if (res.status !== 400) setToggle((current) => !current);
      });
    }
  };
  return (
    <>
      <div className="image">
        <button className="bookmark" onClick={handleBookmark}>
          <img src={`${process.env.PUBLIC_URL}/image/${toggle ? 'heart_on.png' : 'heart_off.png'}`} alt="좋아요" />
        </button>

        <img src={img_url} alt="요가" />
      </div>
      <div className="explain">
        <div className="title">
          <p>{course_name}</p>
        </div>

        {/*
      길이가 일정이상 길면 뒷부분을 ...으로 대체한다
      */}
        <div className="hashTag">
          {hash_tag.map((tag: { tag_name: string }, idx: number) => (
            <span key={`tag` + idx}>#{tag.tag_name}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SummaryTemp;
