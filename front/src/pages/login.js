import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Welcome!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      <form className=" form" onSubmit={loginUser}>
        <p className="title">Login </p>
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <span>E-mail</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <span>Password</span>
        </label>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
