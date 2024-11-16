/* eslint-disable */
import React, { useState } from 'react';
import '../styles/AboutUs.css';
import { Link } from 'react-router-dom';
import CRAFTSMANSHIPVIDEO from '../assets/CRAFTSMANSHIPVIDEO.mp4';
import CraftsmanshipImage1 from '../assets/CraftsmanshipImage1.jpg';
import CraftsmanshipVideo2 from '../assets/CraftsmanshipVideo2.mp4';
import CraftsmanshipBg from '../assets/craftsmanship.jpg';
import IconsBg from '../assets/icons.jpg';
import HistoryBg from '../assets/History.jpg';
import PlanetBg from '../assets/planet.jpg';
import MainhistoryBg from '../assets/MAINHISTORY.jpg';
import pHISTORYBg from '../assets/pHISTORY.jpg';
import HISTORY3Bg from '../assets/HISTORYthreepicture.jpg';

// Nuevas imágenes para la sección "Icon"
import IconMainImage from '../assets/IconMainImage.jpg';
import IconImage1 from '../assets/IconImage1.jpg';
import IconVideo2 from '../assets/IconVideo2.mp4';
import IconImage3 from '../assets/IconImage3.jpg';



const AboutUs = () => {
  const [showCraftsmanship, setShowCraftsmanship] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleShowCraftsmanship = () => setShowCraftsmanship(true);
  const handleShowIcon = () => setShowIcon(true);
  const handleShowHistory = () => setShowHistory(true);


  const handleBackToAboutUs = () => {
    setShowCraftsmanship(false);
    setShowIcon(false);
  };

  


  return (
    <div className="about-us">
      {showCraftsmanship ? (
        // Vista de "Craftsmanship"
        <div className="craftsmanship-page">
          <button onClick={handleBackToAboutUs} className="back-button">Back to About Us</button>
          
          <div className="video-section">
            <video 
                src={CRAFTSMANSHIPVIDEO} 
                autoPlay 
                loop 
                muted 
                className="craftsmanship-video" 
            />
          </div>

          <div className="craftsmanship-legacy-text">
            <h2>Their Craft, Our Art</h2>
            <p>This is the legacy of a visionary, creative man—a testament to passion, craftsmanship, and a team of dreamers filled with curiosity who have poured their hearts into their work. Leaving an indelible mark on the very fabric of this story, they continue each day to build and explore new horizons.</p>
          </div>

          <div className="section section-image-content">
            <div className="section-content">
              <div className="section-image">
                <img src={CraftsmanshipImage1} alt="Craftsmanship Image 1" />
              </div>
              <div className="section-text">
                <h2>Guardians of Tradition</h2>
                <p>Leather has long been an iconic material, valued for its durability, resilience, and the skill required to transform it into high-quality products. In a world dominated by mass production, preserving the use of leather is an act of respect for tradition and for generations of artisans who have perfected this craft. Each piece of leather tells a story and reflects a commitment to authenticity and sustainability.
                 Choosing high-quality leather products means opting for durable pieces that support craftsmanship and respect for the environment. It is an investment in a cultural legacy and in a process that values dedication, keeping tradition alive and ensuring the timeless beauty of each piece.</p>
              </div>
            </div>
          </div>

          <div className="section section-video-content">
            <div className="video-section-fullwidth">
              <video src={CraftsmanshipVideo2} autoPlay loop muted className="full-width-video" />
            </div>
            <div className="section-text">
              <h2>The Art of Transforming with Hands</h2>
              <p>Each piece is a unique masterpiece created with care, precision, and passion.</p>
            </div>
          </div>
        </div>
      ) : showIcon ? (
        // Vista de "Icon"
        <div className="icon-page">
          <button onClick={handleBackToAboutUs} className="back-button">Back to About Us</button>
          
          <h1 className="icon-title">Lili - Our Icon</h1>
          <p className="icon-description">
          A tribute to the extraordinary women we love and admire. Designed with them in mind, for women who possess a clear awareness of their worth and desires, and who move firmly toward their goals, letting nothing stand in their way. This bag is more than an accessory; it's a faithful companion for the woman who knows where she's headed, offering the freedom and functionality she needs to conquer the world.          </p> 
          <div className="icon-main-image">
            <img src={IconMainImage} alt="Main Icon" />
          </div>
          

          <div className="icon-images-row">
          <div className="icon-text-section">
              <h2>THE BIRTH OF AN ICON</h2>
              <p>A process where precision and passion unite to bring exceptional pieces to life. In just 8 hours, a team of 5 dedicated artisans produces 18 bags, a testament to efficiency and quality. The journey of each bag begins in the pre-assembly area, where all parts are meticulously prepared.</p>
              <p>Next, the process moves to the hands of experts who create from scratch the pockets, zipper boxes, and other essential elements, ensuring that every interior detail is as perfect as the exterior.</p>
            </div>
            <video src={IconVideo2} className="icon-video" autoPlay loop muted />
            <div className="icon-text-tribute-title">
              <h2>A TRIBUTE TO WOMEN</h2>
            </div>
            <img src={IconImage3} alt="Icon 3" className="icon-image" />
          </div>
          <div className="tribute-section">
            <div className="tribute-column">
                <p>A tribute to pioneering women, those whose character and pride have left an indelible mark on history. Real, inspiring women who, with tenacity and skill, have been catalysts for change.
                This bag, with its clean and defined lines, embodies the femininity and strength of those who tirelessly fight for their ideals in various fields.</p>
            </div>
            <div className="tribute-column">
                <p>More than an accessory; it is a piece that symbolizes strength and determination. Our artisans have managed to capture the essence of this spirit in a bag, transforming selected materials into unique manifestations of beauty.
                Timeless in its design, this bag reinvents itself each season, incorporating new details, techniques, and materials, always remaining an icon of elegance and empowerment.</p>
            </div>
            </div>
        </div>
      ) : showHistory ? (
        <div className="history-page">
          <button onClick={handleBackToAboutUs} className="back-button">Back to About Us</button>
          <h1 className="history-title">Our History</h1>
            <div className="section-image">
                    <img src={MainhistoryBg} alt="Our history" />
            </div>
            <div> 
                <h2>Interning at TrendMart: A Journey Through Fashion and Innovation</h2>  
            </div>
                <p className="history-description">
                    During my six-month internship at TrendMart's headquarters, I had the unique opportunity to experience the world of fashion retail and e-commerce from the inside. Here’s my story.
                    by William Rivas Former Intern at TrendMart It all began late one evening as I returned from a trip abroad, fresh from exploring a new culture and with the TrendMart internship application on my mind. The anticipation was intense—waiting for a response is a mix of excitement and a little bit of nervousness. As I tried to distract myself by talking with my housemate, I couldn't help but wonder about the possibilities that lay ahead.
                    Soon enough, I received the news: I had been accepted into the internship program! That call marked the beginning of an incredible six-month journey at TrendMart's headquarters, a place where innovation and style converge.
                    A Day at TrendMart: Entering the World of Fashion and Innovation I still remember the first day I stepped into TrendMart's headquarters, a modern and inspiring space that radiates creativity. The building itself was impressive, but it was the people and the culture that truly made it feel like a vibrant community. My fellow interns and I were thrilled to be part of a team dedicated to pushing the boundaries of fashion and e-commerce. Each day, we collaborated with talented professionals, contributing to projects that allowed us to bring fresh ideas to TrendMart’s ever-evolving brand.
                    The experience was both challenging and rewarding, offering an up-close view of the fast-paced world of retail and the opportunity to grow as part of the TrendMart family.
                </p>
            <div className="section-image-2">
                <img src={pHISTORYBg} alt="Our history" />
            </div> 
            <div className="history-milestone">
                <p>HR at TrendMart organized an in-depth, two-day onboarding event for us, where we were introduced to the tools and platforms we’d be using daily. They also took the time to make sure we were comfortable with our surroundings and the TrendMart culture. The onboarding sessions were incredibly insightful, with presentations from former interns and key leaders from various departments. We even got to hear from senior executives and some vice presidents, who shared their experiences, gave us valuable insights, and patiently answered all our questions. We were also lucky to have a session with a member of the TrendMart executive board who oversees People and Culture, helping us understand the company’s vision and our role in contributing to it.</p>
                <h2>Life After Onboarding</h2> 
                <p>One of the highlights of my internship experience at TrendMart was the amazing chance to meet inspiring personalities from the fashion world. Friends often asked if I got to meet any big influencers or brand ambassadors, and the answer was a definite yes! From renowned designers to popular influencers in the fashion industry, TrendMart's headquarters attracted a dynamic community of creatives.This internship was also a golden ticket to be part of several TrendMart celebrations. Not only was the company celebrating its anniversary that summer, but it was also the season of the annual TrendMart Fashion Festival—a massive event held on campus, filled with workshops, pop-up shops, and design showcases. Imagine being part of a vibrant environment buzzing with live music, exclusive launches, and style inspiration at every corner! Being surrounded by creative energy every day also inspired me personally. Watching TrendMart’s designers work on groundbreaking collections and seeing models prepare for photo shoots on campus encouraged me to embrace the fashion culture and explore my own style more confidently.</p>
            </div>
            <div className="section-image-3">
                <img src={HISTORY3Bg} alt="Our history" />
            </div>
            <p className="history-conclusion">
            <h2> Unleashing Creativity and Style Within</h2>
            Being part of TrendMart transforms you in ways you might never expect. The entire campus breathes fashion and creativity, influencing each of us with its unique culture of style and self-expression. Outside of work, I could be found around the campus joining design workshops, styling sessions, and even outdoor sketching meet-ups with fellow interns. Some of my colleagues were already talented illustrators and designers, and though I hadn’t tried my hand at these activities before, the creative atmosphere encouraged me to dive in. I thought, why not try sketching some ideas for new styles? This was my moment to take on a creative challenge. Let me tell you: I wasn’t much for drawing before this, but I quickly found a new passion!
            The support at TrendMart went beyond just work—our mentors encouraged us to explore TrendMart’s range of design tools and even gave us access to fashion design software to bring our ideas to life. I started keeping track of my sketches and designs, and watching them evolve over time was truly inspiring.
            Just like TrendMart’s collaborative spirit, teamwork played a big role on campus. Colleagues worked together to achieve goals, and we interns had our own creative “team”—a close-knit group called the Fresh Threads. We shared ideas, helped each other with projects, and supported one another. Who knows, maybe one day you’ll see some of our collaborative designs on TrendMart’s shelves!
            <h2> Celebrating the TrendMart Legacy</h2>
            Life at TrendMart is constantly evolving, and there’s always something happening. But I never could have imagined that I’d be at HQ for one of the most exciting events: TrendMart’s anniversary celebration. You could feel the buzz building on campus as stages were set up, decorations went up, and everyone anticipated the big day.
            The day of the celebration was incredible. There were stands offering food and drinks from around the world, plus workshops led by top designers sharing their experiences. Fashion shows took place on multiple stages, and the energy was electric. One of the highlights was seeing a special performance by a well-known designer, who shared the story behind some of TrendMart’s most iconic pieces.
            As if that weren’t enough, the TrendMart leadership team surprised everyone with an exclusive preview of the upcoming collection. The excitement was real, and I roamed the campus with a camera, capturing the joyful atmosphere. The day ended with a toast to TrendMart’s legacy, and I felt grateful to be part of such an inspiring journey.
            </p>
        </div>
      ) : (
        <>  
      
          <div className="about-us-header">
            <p>Our brand has been celebrating refined leather and cotton as precious materials through a vertically integrated, responsible, and circular production process.</p>
          </div>
          <div className="about-us-grid">
            <div className="about-us-item" style={{ backgroundImage: `url(${CraftsmanshipBg})` }}>
              <button onClick={handleShowCraftsmanship} className="about-us-link">CRAFTSMANSHIP</button>
            </div>
            <div className="about-us-item" style={{ backgroundImage: `url(${IconsBg})` }}>
              <button onClick={handleShowIcon} className="about-us-link">ICONS</button>
            </div>
            </div>
            <div className="about-us-item3" style={{ backgroundImage: `url(${HistoryBg})` }}>
            <button onClick={handleShowHistory} className="about-us-link">OUR HISTORY</button>
            </div>
        </>
      )}
    </div>
  );
};

export default AboutUs;
