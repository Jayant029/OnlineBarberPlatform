import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import coursecontent from "../../../public/coursecontent.gif";
import site from "../../../public/sitemap1.gif";
import tick from '../../../public/tick.jpg';
//import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      {/* <TrustedBy /> */}
      {/* <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> */}
      <div className='features'>
         <div className='container'>
            <div className='item'>
                {/* <span className='orange'><h1>Our Promises</h1></span> */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Ensuring an Exceptional Experience</h2>
                </div>
                
                {/* 2 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Effortless Barber Services</h2>
                </div>
              
                {/* 3 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Emphasizing Top-Quality in Every Aspect</h2>
                </div>
                
                {/* 4 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Simplified Booking System</h2>
                </div>
                
                {/* 5 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Showcasing the Best Barbers</h2>
                </div>

                {/* 6 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Exemplifying Professionalism</h2>
                </div>

                {/* 7 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Premium Products for High Quality</h2>
                </div>

                {/* 8 */}
                <div className='title'>
                    <img src={tick} alt='' />
                    <h2>Offering the Best Brands</h2>
                </div>
            </div>
            <div className='item'>
                <img src={coursecontent} controls></img>
            </div>
         </div>
       </div>

       <div className='features1'>
         <div className='container'>
            <div className='item'>
                <span className='orange'><h1>HOW WE WORK !</h1></span>
            </div>
            <div className='item'>
                <img src={site} controls></img>
            </div>
         </div>
       </div>
      {/* <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              fiverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
          <img src={barb} controls></img>
          </div>
        </div>
      </div> */}
      
      {/* <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> */}
    </div>
  );
}

export default Home;
