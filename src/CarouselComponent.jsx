import React from 'react';
import Slider from 'react-slick';
import './index.css'

const logos = [
    "kohalik.webp",
    "sportland.webp",
    "terminal.webp",
    "noa.webp",
    "teamhood.webp",
    "pohikool.webp",
    "tslogo90.webp",
    "leaderlogo.webp",
  ];

  const names = [
    "KOP Kohalik Omaalgatuse Programm",
    "Coffee People",
    "Ektaco CompuCach kassasüsteemid",
    "LEADER programm",
    "Kaupmees",
    "Schneider Electric Eesti",
    "Elva Vald",
    "Premia",
    "A le Coq",
    "Fifaa"
  ];

  // Combine logos and names into one array of objects
  const supporters = logos.map((logo, index) => ({
    logo,
    name: names[index] || "", // Default to empty string if no name exists
  }));

const SupportersCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,  
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true, 
    speed: 900,
    cssEase: 'ease-in-out',
    responsive: [
        {
          breakpoint: 768, // Small screens (phones)
          settings: {
            slidesToShow: 2, // Show 1 logo on small screens
          }
        },
        {
          breakpoint: 464, // For even smaller screens
          settings: {
            slidesToShow: 1, // Show 1 logo on screens smaller than 464px
          }
        }
      ]
  };

  return (
    <Slider {...settings}>
      {supporters.map((supporter, index) => (
        <div key={index}>
          <div className="supporter-image-wrapper">
            <div className="supporter-logos">
                <img src={supporter.logo} alt="Supporter logo" className="supporter-image" />
            </div>
          <p className="supporter-names">{supporter.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SupportersCarousel;
