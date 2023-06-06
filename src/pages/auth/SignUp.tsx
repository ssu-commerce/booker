import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, postHttp, setTokens } from '../../utils/AuthHttpWrapper';

interface SignInProps {
  loginStatus: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignInProps> = (props: SignInProps) => {
  const { loginStatus, setIsLogin } = props;
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const redirectHome = async () => {
    if (loginStatus) {
      navigate('/');
      alert('이미 로그인된 상태입니다.');
    }
  };

  useEffect(() => {
    redirectHome();
  }, []);

  const signUp = async () => {
    const responseData = await postHttp('/sign-up', {
      id,
      password,
    }).catch(error => {
      alert(error.response.data.message);
    });
    if (responseData !== undefined) {
      console.log(responseData);
      await setTokens({
        accessToken: responseData.data.accessToken,
        refreshToken: responseData.data.refreshToken,
      });
      const userId = await getUserId();
      console.log(userId);
      alert(`${userId}님 반갑습니다.`);
      setIsLogin(true);
      navigate('/');
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') signUp();
  };
  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h1>회원가입하기</h1>
      <br />
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setId(event.currentTarget.value);
          }}
          onKeyDown={onKeyPress}
        >
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            {`We'll never share your email with anyone else.`}
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setId(event.currentTarget.value);
          }}
          onKeyDown={onKeyPress}
        >
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" disabled={id === '' || password === ''} onClick={signUp}>
          회원가입하기
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
