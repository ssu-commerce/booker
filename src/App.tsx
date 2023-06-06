import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Book from './pages/book/Book';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import { checkLoginStatus } from './utils/AuthHttpWrapper';
import Profile from './pages/user/Profile';
import './styles/index.scss';

const App: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  const checkLogin = async () => {
    const status = await checkLoginStatus();
    setLoginStatus(status);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header loginStatus={loginStatus} setIsLogin={setLoginStatus} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="sign-in"
          element={<SignIn loginStatus={loginStatus} setIsLogin={setLoginStatus} />}
        />
        <Route
          path="sign-up"
          element={<SignUp loginStatus={loginStatus} setIsLogin={setLoginStatus} />}
        />
        {/* <Route path="books" element={<SignUp/>}/> */}
        <Route path="books/:id" element={<Book />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
