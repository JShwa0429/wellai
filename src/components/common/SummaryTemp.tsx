import { detailResponse } from 'api/common';
import { CourseApi } from 'api/CourseApi';
import React, { useState } from 'react';
import styled from 'styled-components';
const SummaryTemp: React.FunctionComponent<detailResponse> = ({
  id,
  course_name,
  img_url,
  hash_tag,
  is_bookmarked,
}) => {
  const [toggle, setToggle] = useState<boolean>(is_bookmarked);
  const handleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const course = CourseApi();
    if (toggle) {
      course
        .deleteBookmark(id as string)
        .then(() => setToggle(false))
        .catch(() => alert('북마크 삭제가 실패했습니다.'));
    } else if (!toggle) {
      course
        .postBookmark(id as string)
        .then((res) => (res.status === 400 ? alert('이미 북마크된 코스입니다.') : setToggle(true)))
        .catch((err) => console.log(err.response));
    }
  };
  return (
    <Div>
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
            <span key={`tag` + idx}> #{tag.tag_name}</span>
          ))}
        </div>
      </div>
    </Div>
  );
};

export default SummaryTemp;

const Div = styled.div`
  height: 250px;
  object-fit: cover;
`;
