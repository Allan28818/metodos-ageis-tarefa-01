import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Home from "./home.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
    )

}