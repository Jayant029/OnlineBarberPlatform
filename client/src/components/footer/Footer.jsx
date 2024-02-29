import React from 'react'
import "./Footer.scss"


const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Haircuts</span>
            <span>Beard Services</span>
            <span>Hairstyling</span>
            <span>coloring</span>
            <span>Facial Treaments</span>
            <span>Kids' cuts</span>
          </div>
          <div className="item">
            <h2>About</h2>
            
            <span>Privacy Policy</span>
            
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
           
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer feedback</span>
           
          </div>
          <div className="item">
            
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>OBP</h2>
            <span>© Online Barber platform</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="../../../public/twitter.png" alt="" />
              <img src="../../../public/facebook.png" alt="" />
              <img src="../../../public/linkedin.png" alt="" />
              <img src="../../../public/pinterest.png" alt="" />
              <img src="../../../public/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="../../../public/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
             
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer