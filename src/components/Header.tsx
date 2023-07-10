import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
// import Logo from '../resources/logo.svg';
import { logoutAndDeleteCookies } from '../utils/AuthHttpWrapper';
import '../styles/components/Header.scss';

interface SignInProps {
  loginStatus: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<SignInProps> = (props: SignInProps) => {
  const { loginStatus, setIsLogin } = props;

  const logout = () => {
    logoutAndDeleteCookies();
    setIsLogin(false);
  };

  const myPageOrSign = () => {
    if (loginStatus)
      return (
        <div>
          <Link className="l-account-link" to="/profile">
            My Page
          </Link>
          <Link className="l-account-link" to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      );
    return (
      <div>
        <Link className="l-account-link" to="/sign-in">
          Sign In
        </Link>
        <Link className="l-account-link" to="/sign-up">
          Sign UP
        </Link>
      </div>
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            {/* <img id="l-logo" alt="" src={logo} className="d-inline-block align-top" /> */}
            {/* <Logo /> */}
            SSU Commerce Booker
          </Navbar.Brand>
        </Link>
      </Container>
      {myPageOrSign()}
    </Navbar>
  );
};
export default Header;
