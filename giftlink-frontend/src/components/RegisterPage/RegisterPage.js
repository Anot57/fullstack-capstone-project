import React, { useState } from "react";
import urlConfig from '../../config';
import { useAppContext } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import "./RegisterPage.css";


const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); 

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      // ✅ Task 1: Access data coming from backend
      const json = await response.json();
      console.log("Register API Response:", json);

      // ✅ Task 2: Set user details in sessionStorage
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", firstName);
        sessionStorage.setItem("email", json.email);

        // ✅ Task 3: Set login state
        setIsLoggedIn(true);

        // ✅ Task 4: Navigate to MainPage
        navigate("/app");
      } else if (json.error) {
        // ✅ Task 5: Handle registration failure
        setShowerr(json.error);
      } else {
        setShowerr("Registration failed. Please try again.");
      }
    } catch (e) {
      console.log("Error fetching details: " + e.message);
      setShowerr("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      {/* ✅ Task 6: Display error message */}
      {showerr && <div className="text-danger">{showerr}</div>}
    </div>
  );
};

export default RegisterPage;
