import {Container, Navbar} from "react-bootstrap";
import logo from "../logo.svg";
import {Link} from "react-router-dom";
import './css/Header.css'
import {logoutAndDeleteCookies} from "../utils/AuthHttpWrapper";


const Header = (props) => {

    const logout = () => {
        logoutAndDeleteCookies()
        props.setIsLogin(false)
    }

    const myPageOrSign = () => {
        if (props.loginStatus)
            return (
                <div>
                    <Link className="account_link" to="/profile">My Page</Link>
                    <Link className="account_link" to="/" onClick={logout}>Logout</Link>
                </div>
            )
        else
            return (
                <div>
                    <Link className="account_link" to="/sign-in">Sign In</Link>
                    <Link className="account_link" to="/sign-up">Sign UP</Link>
                </div>
            )
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to="/">
                    <Navbar.Brand>
                        <img id="logo" alt="" src={logo} className="d-inline-block align-top"/>
                        SSU Commerce Booker
                    </Navbar.Brand>
                </Link>
            </Container>
            {myPageOrSign()}
        </Navbar>
    )
}
export default Header;