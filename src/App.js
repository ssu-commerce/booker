import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Book from "./pages/book/Book";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import React, {useEffect, useState} from "react";
import {checkLoginStatus} from "./utils/AuthHttpWrapper";
import Profile from "./pages/user/Profile";

function App() {
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        checkLogin()
        // eslint-disable-next-line
    }, []);

    const checkLogin = async () => {
        let status = await checkLoginStatus();
        setLoginStatus(status)
    };
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header loginStatus={loginStatus} setIsLogin={setLoginStatus}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="sign-in" element={<SignIn loginStatus={loginStatus} setIsLogin={setLoginStatus}/>}/>
                <Route path="sign-up" element={<SignUp loginStatus={loginStatus} setIsLogin={setLoginStatus}/>}/>
                <Route path="books" element={<SignUp/>}/>
                <Route path="books/:id" element={<Book/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
