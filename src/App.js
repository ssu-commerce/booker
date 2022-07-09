import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Book from "./pages/book/Book";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import React from "react";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="sign-in" element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="books" element={<SignUp/>} />
                <Route path="books/:id" element={<Book/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
