import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "INDIA",
    isSeller: false,
    phone: "",
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // You can use a more sophisticated validation logic here
    const regex = /^\+?\d{1,4}?\s?\d{1,15}$/;
    return regex.test(phoneNumber);
  };

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    // Clear previous error messages when the user starts typing
    setEmailError("");
    setPhoneError("");
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone number
    if (!validateEmail(user.email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!validatePhoneNumber(user.phone)) {
      setPhoneError("Invalid phone number format");
      return;
    }

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      setRegistrationComplete(true);
      // After a successful registration, you might want to redirect the user or perform other actions.
      // For example, you can uncomment the next line to navigate to a different page.
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const closePopup = () => {
    setRegistrationComplete(false);
    // Optionally, you can navigate or perform other actions after closing the popup.
    navigate("/login");
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-group">
            <h1>Create an account</h1>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Johndoe@gmail.com"
              onChange={handleChange}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
            <label htmlFor="file">Profile Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <div className="form-group">
              <div className="toggle">
                <label htmlFor="seller">Activate the Barber account</label>
                <label className="switch">
                  <input type="checkbox" onChange={handleSeller} />
                  <span className="slider round"></span>
                </label>
              </div>

              <label htmlFor="phone">Phone Number</label>
              <input
                name="phone"
                type="text"
                placeholder="+91 123 456 7890"
                onChange={handleChange}
                required
              />
              {phoneError && <p className="error-message">{phoneError}</p>}

              <div className="button-container">
                <button className="register-button">Register</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {registrationComplete && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="registration-message">
              Registration Complete! You can now log in.
            </p>
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
