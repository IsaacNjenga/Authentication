import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration successful.Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="main">
      <form className=" form" onSubmit={registerUser}>
        <p className="title">Register </p>
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <span>Name</span>
        </label>
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

export default Register;
