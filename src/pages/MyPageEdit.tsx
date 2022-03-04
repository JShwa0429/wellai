import React, { useState } from 'react';
import { Row, Col, Button, Input, Card, Divider, Form, Radio } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);
  const [gender, setGender] = useState(0);
  const [body, setBody] = useState({ height: 0, weight: 0 });
  const [like, setLike] = useState({ core: false, leg: false, back: false, stand: false, sit: false, balance: false });
  const [user, setUser] = useState({ userId: '아이디', userNickname: '닉네임' });

  return (
    <Wrapper>
      <Row
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <Col>
          <MyPageLayout />
        </Col>
        <Col
          style={{
            width: 'calc(100% - 332px)',
          }}
        >
          <Row
            style={{
              paddingTop: '50px',
              paddingLeft: '50px',
            }}
            justify="center"
            align="middle"
          >
            <Col span={14}>
              <Row
                style={{
                  marginBottom: '30px',
                  fontSize: '25px',
                }}
                justify="space-between"
                align="middle"
              >
                <Col>내 정보</Col>
                <Col>
                  <Button type="primary">수정하기</Button>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    width: '180px',
                    marginBottom: '30px',
                  }}
                >
                  아이디
                </Col>
                <Col>{user.userId}</Col>
              </Row>
              <Row>
                <Col
                  style={{
                    width: '180px',
                  }}
                >
                  닉네임
                </Col>
                <Col>{user.userNickname} </Col>
              </Row>

              <Divider />

              <Row
                style={{
                  marginBottom: '30px',
                }}
                align="middle"
              >
                <Col
                  style={{
                    width: '180px',
                  }}
                >
                  성별
                </Col>
                <Col>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Button
                        size="large"
                        onClick={() => setGender(0)}
                        style={{
                          backgroundColor: `${gender === 0 ? '#ff7273' : 'white'}`,
                          color: `${gender === 0 ? 'white' : '#ff7273'}`,
                          width: '130px',
                          borderRadius: '5px',
                          marginRight: '80px',
                        }}
                      >
                        남
                      </Button>
                      <Button
                        size="large"
                        onClick={() => setGender(1)}
                        style={{
                          backgroundColor: `${gender === 1 ? '#ff7273' : 'white'}`,
                          color: `${gender === 1 ? 'white' : '#ff7273'}`,
                          width: '130px',
                          borderRadius: '5px',
                        }}
                      >
                        여
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row
                style={{
                  marginBottom: '30px',
                }}
                align="middle"
              >
                <Col
                  style={{
                    width: '180px',
                  }}
                >
                  체형
                </Col>
                <Col>
                  <Row>
                    <Col
                      style={{
                        width: '130px',
                        marginRight: '80px',
                      }}
                    >
                      <Input
                        size="large"
                        value={body.height}
                        onChange={
                          (e) => {
                            const { value } = e.target;
                            const reg = /^-?\d*(\.\d*)?$/;
                            if (reg.test(value) || value === '' || value === '-') {
                              setBody({ ...body, height: Number(e.target.value) });
                            }
                          }
                          // setBody({ ...body, height: Number(e.target.value) })
                        }
                        suffix={'cm'}
                        style={{
                          borderRadius: '5px',
                        }}
                      />
                    </Col>
                    <Col
                      style={{
                        width: '130px',
                      }}
                    >
                      <Input
                        size="large"
                        value={body.weight}
                        onChange={(e) => {
                          const { value } = e.target;
                          const reg = /^-?\d*(\.\d*)?$/;
                          if (reg.test(value) || value === '' || value === '-') {
                            setBody({ ...body, weight: Number(e.target.value) });
                          }
                        }}
                        suffix={'kg'}
                        style={{
                          borderRadius: '5px',
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row align="middle">
                <Col
                  style={{
                    width: '180px',
                  }}
                >
                  선호하는 운동
                </Col>
                <Col>
                  <Row
                    style={{
                      marginBottom: '30px',
                    }}
                    gutter={47}
                  >
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, core: !like.core })}
                        style={{
                          backgroundColor: `${like.core === true ? '#ff7273' : 'white'}`,
                          color: `${like.core === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.core === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        코어
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, leg: !like.leg })}
                        style={{
                          backgroundColor: `${like.leg === true ? '#ff7273' : 'white'}`,
                          color: `${like.leg === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.leg === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        다리
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, back: !like.back })}
                        style={{
                          backgroundColor: `${like.back === true ? '#ff7273' : 'white'}`,
                          color: `${like.back === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.back === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        등
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={47}>
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, stand: !like.stand })}
                        style={{
                          backgroundColor: `${like.stand === true ? '#ff7273' : 'white'}`,
                          color: `${like.stand === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.stand === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        서서
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, sit: !like.sit })}
                        style={{
                          backgroundColor: `${like.sit === true ? '#ff7273' : 'white'}`,
                          color: `${like.sit === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.sit === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        앉아서
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="large"
                        onClick={() => setLike({ ...like, balance: !like.balance })}
                        style={{
                          backgroundColor: `${like.balance === true ? '#ff7273' : 'white'}`,
                          color: `${like.balance === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.balance === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        앉아서
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageEdit;

const Wrapper = styled.div``;
