import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Button, Input, Divider, message } from 'antd';
import { MyPageLayout } from 'components';

import styled from 'styled-components';
import { MyPageApi } from 'api';
import { OptionType } from 'type';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);
  const [options, setOptions] = useState<OptionType>({
    gender: null,
    height: 0,
    weight: 0,
    is_core: false,
    is_arm: false,
    is_recline: false,
    is_stand: false,
    is_sit: false,
    is_balance: false,
  });
  const [user, setUser] = useState({ email: '아이디', nickname: '닉네임' });
  const mypage = MyPageApi();
  useEffect(() => {
    async function getUserInformation() {
      await mypage.getUserInformation().then((res) => {
        const data = res.data;
        const options = data.options;
        setUser({ email: data.email, nickname: data.nickname });
        setOptions({
          gender: options.gender,
          height: options.height ?? 0,
          weight: options.weight ?? 0,
          is_core: options.is_core,
          is_arm: options.is_arm,
          is_recline: options.is_recline,
          is_stand: options.is_stand,
          is_sit: options.is_sit,
          is_balance: options.is_balance,
        });
      });
    }
    getUserInformation();
  }, []);

  const disabled = useMemo(() => {
    let count = 0;
    if (options.is_core) count += 1;
    if (options.is_arm) count += 1;
    if (options.is_recline) count += 1;
    if (options.is_stand) count += 1;
    if (options.is_sit) count += 1;
    if (options.is_balance) count += 1;
    return count >= 2 ? true : false;
  }, [options]);
  const handleEditUserInformation = () => {
    mypage.putUserInformation(options);
    message.success('저장 되었습니다!');
  };
  return (
    <Wrapper>
      <Row
        justify="space-between"
        style={{
          width: '1350px',
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
                        disabled={options.is_core ? false : disabled}
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
                        disabled={options.is_arm ? false : disabled}
                        onClick={() => setOptions({ ...options, is_arm: !options.is_arm })}
                        style={{
                          backgroundColor: `${options.is_arm === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_arm === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_arm === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        팔
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        size="large"
                        disabled={options.is_recline ? false : disabled}
                        onClick={() => setOptions({ ...options, is_recline: !options.is_recline })}
                        style={{
                          backgroundColor: `${options.is_recline === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_recline === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_recline === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        누워서
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={47}>
                    <Col>
                      <Button
                        size="large"
                        disabled={options.is_stand ? false : disabled}
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
                        disabled={options.is_sit ? false : disabled}
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
                        disabled={options.is_balance ? false : disabled}
                        onClick={() => setOptions({ ...options, is_balance: !options.is_balance })}
                        style={{
                          backgroundColor: `${options.is_balance === true ? '#ff7273' : 'white'}`,
                          color: `${options.is_balance === true ? 'white' : 'lightgray'}`,
                          borderColor: `${options.is_balance === true ? '#ff7273' : 'lightgray'}`,
                          width: '82px',
                          borderRadius: '5px',
                        }}
                      >
                        밸런스
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

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
