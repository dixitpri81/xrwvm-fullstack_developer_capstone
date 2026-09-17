import React, { useState } from 'react';
import "./Register.css";
import car_image from "../assets/car.png";

const Register = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cdError, setCdError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const register_url = `/djangoapp/registration`;
    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName, password, firstName, lastName, email
        }),
      });
      const json = await res.json();
      if (json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        onClose();
        window.location.href = "/";
      } else if (json.error === "Already Registered") {
        setCdError("User already exists. Please login.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register_container">
      <h2 className="header">Register</h2>
      <div className="inputs">
        <div className="input">
          <label>Username</label>
          <input
            className="input_field"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input">
          <label>First Name</label>
          <input
            className="input_field"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Last Name</label>
          <input
            className="input_field"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Email</label>
          <input
            className="input_field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            className="input_field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {cdError && <p style={{color:"red"}}>{cdError}</p>}
        <div className="submit_panel">
          <button className="submit" onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
