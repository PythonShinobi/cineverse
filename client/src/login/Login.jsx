// client/src/login/Login.jsx
import React, { useState } from "react";
import { mutate } from "swr"; // Import mutate

import "./Login.css";
import useIsAuthenticated from "../redux/authHook.js";
import Navbar from "../navbar/Navbar";
import Form from "../components/Form";
import apiClient from "../apiClient.js";

const Login = () => {
  useIsAuthenticated({ redirectTo: "/", redirectIfFound: true });

  const [success, setSuccess] = useState(""); // State variable for success message.
  const [error, setError] = useState("");  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    try {
      const body = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      // Make a POST request using axios with cookies and CSRF token
      const response = await apiClient.post("/api/login", body);
      console.log("Login Response:", response);
      console.log("Login Response:", response.data);

      if (response.status === 200) {
        setSuccess("Login successful"); // Set success message.  
        // window.location.href = "/"; // Redirect to home page immediately.2      
        setError(""); // Clear any previous errors.                     
        mutate("/api/user"); // Trigger revalidation
      } else {
        // If login fails, throw an error with the response data.
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(`An unexpected error occurred: ${error.message}`);
      setError(error.response?.data?.message || error.message); // Set error message state with the error message
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      {/* Render the Form component for login */}
      <Form isLogin={true} errorMessage={error} successMessage={success} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;