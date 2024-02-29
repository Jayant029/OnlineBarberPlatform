import React, { useEffect, useState, useRef } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import newRequest from "../../utils/newRequest";
  import "./Navbar.scss";
  import logoImage from '../../../public/logo.png';


  function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const accountBtnRef = useRef(null);
    const buttonRef = useRef(null);  // <-- Add this line
  
    const { pathname } = useLocation();
  
    const isActive = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", isActive);
      document.addEventListener("click", handleOutsideClick);
  
      return () => {
        window.removeEventListener("scroll", isActive);
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);
  
    const handleOutsideClick = (e) => {
      if (accountBtnRef.current && !accountBtnRef.current.contains(e.target)) {
        setOpen(false);
      }
      // Check if the clicked element is outside the button and its options
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await newRequest.post("/auth/logout");
        localStorage.setItem("currentUser", null);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
        <div className="logo">
            <Link className="link" to="/">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="links">
          {currentUser?.isSeller && (
            <Link className="link" to="/services">
              Services
            </Link>
          )}
            <Link className="link" to="/about">
              About
            </Link>
            <Link className="link" to="/contact">
              Contact Us
            </Link>
          <Link className="link" to="/privacy">
              Privacy policy
          </Link>
          <Link className="link" to="/BarberHelpPage">
              Help
          </Link>
            {!currentUser?.isSeller}
            {currentUser ? (
              <div className="user" onClick={() => setOpen(!open)} ref={accountBtnRef}>
                <img src={currentUser.img || "/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
                    {currentUser.isSeller && (
                      <>
                        <Link className="link" to="/dash">
                        Appointment
                        </Link>
                        <Link className="link" to="/mygigs">
                        Shops
                        </Link>
                        <Link className="link" to="/add">
                          Add New Shops
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/orders">
                      Booking
                    </Link>
                    <Link className="link" to="/allproperty">
                      All Shops
                    </Link>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                    <Link className="link" to="/profile">
                      Profile
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (<div className="account-btn" onClick={() => setOpen(!open)} ref={accountBtnRef}>
                <button className="link" onClick={() => setOpen(!open)}>
                  Account
                </button>
                {open && (
                  <div className="options1">
                  <Link
                    className="link"
                    to="/login"
                    onClick={() => setOpen(false)} // Close dropdown on click
                  >
                    Sign in
                  </Link>
                  <Link
                    className="link"
                    to="/register"
                    onClick={() => setOpen(false)} // Close dropdown on click
                  >
                    Sign up
                  </Link>
                </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* {(active || pathname !== "/") && (
          <>
            <hr />
            <div className="menu">
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/">
                AI Services
              </Link>
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/">
                Music & Audio
              </Link>
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/">
                Business
              </Link>
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </div>
            <hr />
          </>
        )} */}
      </div>
    );
  }

  export default Navbar;
