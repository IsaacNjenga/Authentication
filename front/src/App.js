import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./source/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Dashboard from "./pages/dashboard";

axios.defaults.baseURL = "https://authentication-backend-cyan.vercel.app/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="main">
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 1500 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
