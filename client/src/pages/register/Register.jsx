import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
//import countriesList from "../../utils/countriesList";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              placeholder="xyz"
              onChange={handleChange}
            required/>

            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="xyz@gmail.com"
              onChange={handleChange}
            required/>

            <label htmlFor="password">Password</label>
            <input name="password" type="password" onChange={handleChange} required/>
            <label htmlFor="file">Profile Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {/* <label htmlFor="country">Country</label> */}
            {/* Use a select element for the country dropdown */}
            {/* <select name="country" onChange={handleChange} value={user.country} required>
              <option value="">Select Country</option>
              {countriesList.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select> */}
            
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
              required/>

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
