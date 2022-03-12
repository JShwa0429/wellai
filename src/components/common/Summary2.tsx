import { detailResponse } from 'api/common';
import { CourseApi } from 'api';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import styled from 'styled-components';
import { message, Card, Row, Col, Tag, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const COLOR_LIST = ['magenta', 'green', 'cyan', 'geekblue', 'red', 'volcano', 'orange', 'gold', 'lime', 'purple'];
const COLOR_OBJ: any = {
  발목강화: 'magenta',
  탄탄한허벅지: 'green',
  서서: 'cyan',
  다리부종: 'geekblue',
  골반: 'red',
  균형: 'volcano',
  앉아서: 'orange',
  유연성: 'gold',
  팔: 'lime',
  입문자: 'purple',
  하체: 'magenta',
  전신: 'orange',
  학생: 'purple',
  코어: 'red',
  척추: 'magenta',
  허리: 'green',
  디스크: 'cyan',
  누워서: 'geekblue',
  직장인: 'red',
  개발자: 'volcano',
  스트레칭: 'orange',
  전면: 'gold',
  후면: 'lime',
};
// const COLOR_OBJ: any = {
//   발목강화: '#372554',
//   탄탄한허벅지: '#D7B49E',
//   서서: '#B8D5B8',
//   다리부종: '#05A8AA',
//   골반: '#DC602E',
//   균형: '#6DA34D',
//   앉아서: '#548687',
//   유연성: '#F4D35E',
//   팔: '#EE964B',
//   입문자: '#D81E5B',
//   하체: '#3A3335',
//   전신: '#735F3D',
//   학생: '#009FFD',
//   코어: 'red',
//   척추: 'magenta',
//   허리: 'green',
//   디스크: 'cyan',
//   누워서: 'geekblue',
//   직장인: 'red',
//   개발자: 'volcano',
//   스트레칭: 'orange',
//   전면: 'gold',
//   후면: 'lime',
// };

const Summary: React.FunctionComponent<detailResponse> = ({ id, course_name, img_url, hash_tag, is_bookmarked }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(is_bookmarked);
  const handleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    async function editBookmark() {
      const course = CourseApi();
      if (toggle) {
        await course
          .deleteBookmark(id as string)
          .then(() => setToggle(false))
          .catch(() => message.info('북마크 삭제가 실패했습니다.'));
      } else if (!toggle) {
        await course
          .postBookmark(id as string)
          .then(() => setToggle(true))
          .catch((err) => {
            if (err.response.status === 400) message.info('이미 북마크된 코스입니다.');
          });
      }
    }
    editBookmark();
  };

  return (
    <Wrapper onClick={() => navigate(`/course/${id}`)}>
      <Card hoverable style={{ height: '270px' }}>
        <Row>
          <Col>
            <img style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} src={img_url} alt="요가" />
          </Col>
        </Row>
        <Row style={{ padding: '10px 20px' }}>
          <Col>
            <Row style={{ marginBottom: '10px' }}>
              <Col style={{ fontSize: '18px', fontWeight: 'bold' }}>{course_name}</Col>
            </Row>

            <Row>
              <Col>
                {hash_tag.map((tag: { tag_name: string }, idx: number) => (
                  <Tag color={COLOR_OBJ[tag.tag_name]} key={`tag` + idx} style={{ marginBottom: '3px' }}>
                    #{tag.tag_name}
                  </Tag>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
        <button
          style={{
            width: '30px',
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
          className="bookmark"
          onClick={handleBookmark}
        >
          <img src={`${process.env.PUBLIC_URL}/image/${toggle ? 'heart_on.png' : 'heart_off.png'}`} alt="좋아요" />
        </button>
      </Card>
    </Wrapper>
  );
};

export default Summary;

const Wrapper = styled.div`
  border-radius: 10px;
  .ant-card {
    border-radius: 5px;
  }
  .ant-card-body {
    padding: 0;
  }
`;
