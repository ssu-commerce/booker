import {Container, Navbar} from "react-bootstrap";
import logo from "../logo.svg";
import {Link} from "react-router-dom";
import './css/Header.css'

const Header = (props) => {
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
            <Link className="account_link" to="/sign-in">Sign In</Link>
            <Link className="account_link" to="/sign-up">Sign UP</Link>
        </Navbar>
    )
}
export default Header;