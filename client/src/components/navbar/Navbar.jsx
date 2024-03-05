import React, { useEffect, useState, useRef } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import newRequest from "../../utils/newRequest";
  import "./Navbar.scss";
  import logoImage from '../../../public/blacklogo.png';


  function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const accountBtnRef = useRef(null);
  
    const { pathname } = useLocation();
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
        <Link className="link" to="/">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <div className="logo-text">
            <h1>ONLINE BARBER PLATFORM</h1>
          </div>
        </div>
      </Link>
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
            ) : (<div className="account-btn">
              <button><Link className="link" to="/login">
              Sign In
            </Link></button>
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
