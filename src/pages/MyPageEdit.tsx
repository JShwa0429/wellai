import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Card, Divider, Form, Radio } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { Options } from 'type';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);
  const [gender, setGender] = useState<string | null>(null);
  const [body, setBody] = useState({ height: 0, weight: 0 });
  const [like, setLike] = useState({
    is_core: false,
    is_leg: false,
    is_back: false,
    is_stand: false,
    is_sit: false,
    is_balance: false,
  });
  const [user, setUser] = useState({ email: '아이디', nickname: '닉네임' });
  const mypage = MyPageApi();
  useEffect(() => {
    mypage
      .getUserInformation()
      .then((res) => {
        console.log(res);
        const data = res.data;
        const options = data.options;
        setGender(data.options.gender);
        setUser({ email: data.email, nickname: data.nickname });
        setBody({ height: options.height ?? 0, weight: options.weight ?? 0 });
        setLike({
          is_core: options.is_core,
          is_leg: options.is_leg,
          is_back: options.is_back,
          is_stand: options.is_stand,
          is_sit: options.is_sit,
          is_balance: options.is_balance,
        });
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleEditUserInformation = () => {
    const options: Options = {
      gender: gender,
      height: body.height,
      weight: body.weight,
      is_back: like.is_back,
      is_core: like.is_core,
      is_balance: like.is_balance,
      is_leg: like.is_leg,
      is_sit: like.is_sit,
      is_stand: like.is_stand,
    };
    mypage
      .putUserInformation(options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
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
                  fontSize: '28px',
                }}
                justify="space-between"
                align="middle"
              >
                <Col>내 정보</Col>
                <Col>
                  <Button
                    size="large"
                    type="primary"
                    style={{
                      borderRadius: '5px',
                    }}
                    onClick={handleEditUserInformation}
                  >
                    수정하기
                  </Button>
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
                <Col>{user.email}</Col>
              </Row>
              <Row>
                <Col
                  style={{
                    width: '180px',
                  }}
                >
                  닉네임
                </Col>
                <Col>{user.nickname} </Col>
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
                        onClick={() => setGender('M')}
                        style={{
                          borderColor: `${gender === 'M' ? '#ff7273' : 'lightgray'}`,
                          backgroundColor: `${gender === 'M' ? '#ff7273' : 'white'}`,
                          color: `${gender === 'M' ? 'white' : 'lightgray'}`,
                          width: '130px',
                          borderRadius: '5px',
                          marginRight: '80px',
                        }}
                      >
                        남
                      </Button>
                      <Button
                        size="large"
                        onClick={() => setGender('F')}
                        style={{
                          borderColor: `${gender === 'F' ? '#ff7273' : 'lightgray'}`,
                          backgroundColor: `${gender === 'F' ? '#ff7273' : 'white'}`,
                          color: `${gender === 'F' ? 'white' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_core: !like.is_core })}
                        style={{
                          backgroundColor: `${like.is_core === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_core === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_core === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_leg: !like.is_leg })}
                        style={{
                          backgroundColor: `${like.is_leg === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_leg === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_leg === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_back: !like.is_back })}
                        style={{
                          backgroundColor: `${like.is_back === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_back === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_back === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_stand: !like.is_stand })}
                        style={{
                          backgroundColor: `${like.is_stand === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_stand === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_stand === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_sit: !like.is_sit })}
                        style={{
                          backgroundColor: `${like.is_sit === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_sit === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_sit === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setLike({ ...like, is_balance: !like.is_balance })}
                        style={{
                          backgroundColor: `${like.is_balance === true ? '#ff7273' : 'white'}`,
                          color: `${like.is_balance === true ? 'white' : 'lightgray'}`,
                          borderColor: `${like.is_balance === true ? '#ff7273' : 'lightgray'}`,
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
