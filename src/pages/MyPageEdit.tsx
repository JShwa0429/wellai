import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Card, Divider, Form, Radio } from 'antd';
import { MyPageLayout } from 'components';

import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { Options } from 'type';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);
  const [options, setOptions] = useState<Options>({
    gender: null,
    height: 0,
    weight: 0,
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
        setOptions({
          gender: options.gender,
          weight: options.weight ?? 0,
          height: options.height ?? 0,
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
    // const data: Options = {
    //   gender: gender,
    //   height: body.height,
    //   weight: body.weight,
    //   is_back: option.is_back,
    //   is_core: option.is_core,
    //   is_balance: option.is_balance,
    //   is_leg: option.is_leg,
    //   is_sit: option.is_sit,
    //   is_stand: option.is_stand,
    // };
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
                        onClick={() => setOptions({ ...options, gender: 'M' })}
                        style={{
                          borderColor: `${options.gender === 'M' ? '#ff7273' : 'lightgray'}`,
                          backgroundColor: `${options.gender === 'M' ? '#ff7273' : 'white'}`,
                          color: `${options.gender === 'M' ? 'white' : 'lightgray'}`,
                          width: '130px',
                          borderRadius: '5px',
                          marginRight: '80px',
                        }}
                      >
                        남
                      </Button>
                      <Button
                        size="large"
                        onClick={() => setOptions({ ...options, gender: 'F' })}
                        style={{
                          borderColor: `${options.gender === 'F' ? '#ff7273' : 'lightgray'}`,
                          backgroundColor: `${options.gender === 'F' ? '#ff7273' : 'white'}`,
                          color: `${options.gender === 'F' ? 'white' : 'lightgray'}`,
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
                        value={options.height}
                        onChange={(e) => {
                          const { value } = e.target;
                          const reg = /^-?\d*(\.\d*)?$/;
                          if (reg.test(value) || value === '' || value === '-') {
                            setOptions({ ...options, height: Number(e.target.value) });
                          }
                        }}
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
                        value={options.weight}
                        onChange={(e) => {
                          const { value } = e.target;
                          const reg = /^-?\d*(\.\d*)?$/;
                          if (reg.test(value) || value === '' || value === '-') {
                            setOptions({ ...options, weight: Number(e.target.value) });
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
                        onClick={() => setOptions({ ...options, is_core: !options.is_core })}
                        style={{
                          backgroundColor: `${options.is_core === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_core === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_core === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setOptions({ ...options, is_leg: !options.is_leg })}
                        style={{
                          backgroundColor: `${options.is_leg === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_leg === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_leg === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setOptions({ ...options, is_back: !options.is_back })}
                        style={{
                          backgroundColor: `${options.is_back === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_back === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_back === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setOptions({ ...options, is_stand: !options.is_stand })}
                        style={{
                          backgroundColor: `${options.is_stand === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_stand === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_stand === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setOptions({ ...options, is_sit: !options.is_sit })}
                        style={{
                          backgroundColor: `${options.is_sit === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_sit === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_sit === true ? '#ff7273' : 'lightgray'}`,
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
                        onClick={() => setOptions({ ...options, is_balance: !options.is_balance })}
                        style={{
                          backgroundColor: `${options.is_balance === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_balance === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_balance === true ? '#ff7273' : 'lightgray'}`,
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
