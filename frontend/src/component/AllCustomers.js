import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./styles/Home.css";
import home from "./images/home.jpg";
import fertilizer from "./images/fertilizer.jpeg";
import crop from "./images/crop.jpeg";
import pesticides from "./images/pesticides.jpg";
import machine from "./images/machine.jpg";
import selling from "./images/selling.jpg";
import ticket from "./images/ticket.jpg";
import imgsrc from "./images/imgsrc.jpg";
import slideImg1 from "./images/image4.jpg";
import slideImg2 from "./images/image2.jpg";
import slideImg3 from "./images/image1.jpg";
import newimg1 from "./images/newimg1.png";
import newimg2 from "./images/newimg2.png";
import newimg3 from "./images/newimg3.png";
import newimg4 from "./images/newimg4.png";
import newimg5 from "./images/newimg5.png";
import newimg6 from "./images/newimg6.jpg";

export default function AllCustomers(props) {
  const [loggedInUserNIC, setLoggedInUserNIC] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const userNIC = localStorage.getItem("loggedInUserNIC"); 
    console.log('AllCustomers - User NIC:', userNIC);
    if (userNIC) {
      setLoggedInUserNIC(userNIC);
    }
  }, []);

  console.log('AllCustomers - userProfileImage prop:', props.userProfileImage);

  const handleViewProfile = () => {
    if (loggedInUserNIC) {
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  const slideImages = [
    slideImg1,
    slideImg2,
    slideImg3,
  ];

  const [currentSlide, setCurrentSlide] = useState(0); 
  const totalSlides = 3; 

  // Function to handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };


  return (
    <div className="homepage">
      <div>
      <div>
        <h1>
          JOIN WITH US 
          TO GET PROSPEROUS PADDY FARMING
          EXPERIENCE
        </h1>
        {props.userProfileImage ? (
          <img
            src={props.userProfileImage}
            alt="Profile"
            className="all-customers-profile-picture"
            onClick={handleViewProfile}
          />
        ) : (
          <img
            src="/default-profile.png"
            alt="Profile"
            className="all-customers-profile-picture"
            onClick={handleViewProfile}
          />
        )}
      </div>

            {/* Slideshow */}
            {/*
        <div className="slideshow-container">
          <Carousel
            showArrows={true}
            autoPlay={true}
            interval={3000} // Adjust the time interval as needed
            infiniteLoop={true}
            selectedItem={currentSlide}
            onChange={handleSlideChange}
          >
            {slideImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                />
              </div>
            ))}
          </Carousel>

        </div>
*/}

            {/* Replace the slideshow with an image */}
          <div className="slideshow-container">
            <img
              src={slideImg1}
              alt="Homepage"
              className="homepage-image"
            />
          </div>

            <div className="flex-container">
                <div className="imagesrc">
                    <img src={imgsrc} alt="Your Image" />
                </div>
                <div className="description-container">
                    <p className="description-text">
                        Welcome to our website! We are dedicated to providing you with the best
                        agricultural solutions and products. Our mission is to help farmers and
                        agricultural enthusiasts make informed decisions and achieve success in
                        their farming endeavors.

                        Explore our wide range of services and products, including crop
                        selection advice, high-quality fertilizers, effective pesticides,
                        state-of-the-art agricultural machinery, and convenient selling
                        platforms. We aim to empower farmers with the tools and knowledge they
                        need to optimize their crop yields and contribute to sustainable
                        agriculture.

                        Our team of experts is here to assist you every step of the way. Whether
                        you are a seasoned farmer or just starting in the world of agriculture,
                        we have resources and support tailored to your needs. Feel free to
                        reach out to us with any questions or inquiries. Your success is our
                        priority.

                        Join us in our commitment to enhancing agricultural practices and
                        ensuring food security for future generations. Together, we can
                        cultivate a greener and more prosperous future.
                        <br></br>
                        Our team of experts is here to assist you every step of the way. Whether
                        you are a seasoned farmer or just starting in the world of agriculture,
                        we have resources and support tailored to your needs. Feel free to
                        reach out to us with any questions or inquiries. Your success is our
                        priority.
                    </p>
                </div>
            </div>
            {/*
            <img
                src={home} // Replace with your image URL
                alt="Homepage"
                className="homepage-image"
            />
            */}
            <div className="image-row">
                <div className="image-container">
                <img
                    src={crop} 
                    alt="Image_1"
                    className="homepage-image"
                />
                <Link to="/crop-selection">
                <button className="image-button">CROP SELECTION</button>
                </Link>
                </div>
                <div className="image-container">
                <img
                    src={fertilizer} 
                    alt="Image_2"
                    className="homepage-image"
                />
                <Link to="/fertilizer">
                <button className="image-button">FERTILIZER</button>
                </Link>
                </div>
                <div className="image-container">
                <img
                    src={pesticides} 
                    alt="Image_3"
                    className="homepage-image"
                />
                <Link to="/pesticides">
                <button className="image-button">PESTICIDES</button>
                </Link>
                </div>
            </div>

            <div className="image-row">
                <div className="image-container">
                <img
                    src={machine} 
                    alt="Image_4"
                    className="homepage-image"
                />
                <Link to="/machine">
                <button className="image-button last-row">MACHINE</button>
                </Link>
                </div>
                <div className="image-container">
                <img
                    src={selling} 
                    alt="Image_5"
                    className="homepage-image"
                />
                <Link to="/selling">
                <button className="image-button last-row">SELLING</button>
                </Link>
                </div>
                <div className="image-container">
                <img
                    src={ticket} 
                    alt="Image_6"
                    className="homepage-image"
                />
                <Link to="/ticket">
                <button className="image-button last-row">TICKET</button>
                </Link>
                </div>
            </div>
        </div>
        
        <div className="grid-container">
          <div className="grid-item">
            <img src={newimg1} alt="Image 1" className="grid-image" />  
            <p className="grid-description">
              <span className="bold-text">Rice - The Staple Food</span>
             - General information on rice crop and practices 
            </p>
          </div>
          <div className="grid-item">
            <img src={newimg2} alt="Image 2" className="grid-image" />
            <p className="grid-description">
            <span className="bold-text">Technology</span> 
               - Recent technology introduced...
            </p>
          </div>
          <div className="grid-item">
            <img src={newimg3} alt="Image 3" className="grid-image" />
            <p className="grid-description">
            <span className="bold-text">Research</span> 
               - Research that are being conducted at our institute
            </p>
          </div>
          <div className="grid-item">
            <img src={newimg4} alt="Image 4" className="grid-image" />
            <p className="grid-description">
            <span className="bold-text">Development</span> 
               - Training, information dissamination and technology transfer
            </p>
          </div>
          <div className="grid-item">
            <img src={newimg5} alt="Image 5" className="grid-image" />
            <p className="grid-description">
            <span className="bold-text">Other Services</span> 
               - Other services rendered to the public 
            </p>
          </div>
          <div className="grid-item">
            <img src={newimg6} alt="Image 6" className="grid-image" />
            <p className="grid-description">
            <span className="bold-text">Maps</span>
               - Recent map introduced
            </p>
          </div>
        </div>
    </div>
    );
}

                
           