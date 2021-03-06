import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserId, postHttp, setTokens} from "../../utils/AuthHttpWrapper";
import {Button, Form} from "react-bootstrap";

const SignIn = (props) => {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const onChangeId = e => setId(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    useEffect(() => {
        redirectHome();
        // eslint-disable-next-line
    }, []);
    const redirectHome = async () => {
        if (props.loginStatus) {
            navigate('/')
            alert("이미 로그인된 상태입니다.");
        }
    };
    const signIn = async () => {
        let responseData = await postHttp('/sign-in', {
            id: id,
            password: password,
        }).catch(error => {
            alert(error.response.data.message)
        });
        if (responseData !== undefined) {
            await setTokens(responseData.data.accessToken, responseData.data.refreshToken);
            let userId = await getUserId();
            alert(userId + "님 반갑습니다.");
            props.setIsLogin(true)
            navigate('/')
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') signIn();
    }

    return (
        <div style={{width: '50%', margin: 'auto'}}>
            <h1>로그인하기</h1><br/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail"
                            onChange={onChangeId} onKeyPress={onKeyPress}
                >
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword"
                            onChange={onChangePassword} onKeyPress={onKeyPress}
                >
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Button variant="primary" disabled={id === '' || password === ''} onClick={signIn}>
                    로그인하기
                </Button>
                <Link to='/signup'> <Button>회원가입</Button> </Link>
            </Form>
        </div>
    )
}

export default SignIn