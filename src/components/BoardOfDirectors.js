import React, { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaDribbble, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const directors = [
  {
    name: 'Hossein Mahmoodi',
    title: 'Managing Director & CEO',
    bio: 'Hossein is a visionary leader with over two decades of experience in the tech and finance industries. His strategic insights have been pivotal in driving the company\'s growth.',
    avatar: '/images/director-avatar-1.jpg',
    mainImage: '/images/director-main-1.jpg',
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      dribbble: '#',
    },
  },
  {
    name: 'Jane Doe',
    title: 'Chief Operating Officer',
    bio: 'Jane excels in operational management, streamlining processes to enhance efficiency and innovation across the board. She is a cornerstone of our executive team.',
    avatar: '/images/director-avatar-2.jpg',
    mainImage: '/images/director-main-2.jpg',
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      dribbble: '#',
    },
  },
];

const BoardOfDirectors = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? directors.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === directors.length - 1 ? 0 : prevIndex + 1));
  };

  const activeDirector = directors[activeIndex];

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Watermark */}
      <div className="absolute inset-x-0 top-0 flex justify-center items-center h-48 pointer-events-none">
        <h1 className="text-[12rem] font-bold text-gray-200/50 opacity-50 tracking-widest uppercase" style={{ transform: 'scaleY(1.5)' }}>
          HOSSEIN MAHMOODI
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main Director Image */}
        <div className="relative mb-8 w-80 h-80">
          {directors.map((director, index) => (
            <img
              key={director.name}
              src={director.mainImage}
              alt={director.name}
              className={`absolute inset-0 w-full h-full object-cover object-top grayscale transition-opacity duration-500 ease-in-out ${index === activeIndex ? 'opacity-30' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* Member Selector */}
        <div className="flex justify-center space-x-6 mb-8">
          {directors.map((director, index) => (
            <button key={director.name} onClick={() => setActiveIndex(index)} className="relative focus:outline-none">
              <img
                src={director.avatar}
                alt={director.name}
                className={`w-20 h-20 rounded-full object-cover monochrome transition-all duration-300 ${index === activeIndex ? 'transform scale-110' : 'opacity-70'}`}
              />
              {index === activeIndex && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.7), 0 0 5px 2px rgba(59, 130, 246, 0.5)',
                  }}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Active Card */}
        <div className="w-full max-w-2xl bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
          <div className="flex items-center space-x-6 mb-6">
            <img src={activeDirector.avatar} alt={activeDirector.name} className="w-24 h-24 rounded-lg object-cover shadow-md" />
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{activeDirector.name}</h3>
              <p className="text-gray-500">{activeDirector.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            {Object.entries(activeDirector.socials).map(([key, href]) => {
              const Icon = {
                linkedin: FaLinkedinIn,
                twitter: FaTwitter,
                instagram: FaInstagram,
                dribbble: FaDribbble,
              }[key];
              return (
                <a key={key} href={href} className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-sm h-10">{activeDirector.bio}</p>

          <div className="flex justify-center">
            <div className="flex items-center bg-blue-500 text-white rounded-full p-1">
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none">
                <FaChevronLeft size={16} />
              </button>
              <div className="w-16"></div>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none">
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
```

### Integrating the New Component

To display the new section on your page, I'll import it into `d:\bamb\Bambardara-web\src\Hero.js` and place it after the "Board of Directors" section that is already there.

```diff
--- a/d:\bamb\Bambardara-web\src\Hero.js
+++ b/d:\bamb\Bambardara-web\src\Hero.js
@@ -1,5 +1,6 @@
 import React, { useState } from 'react';
 import { FaSeedling, FaLandmark, FaCrown, FaBinoculars, FaSwimmingPool, FaLeaf, FaArrowRight, FaBullseye, FaEye } from 'react-icons/fa';
+import BoardOfDirectors from './BoardOfDirectors';
 
 const Hero = () => {
   const highlights = [
@@ -275,6 +276,7 @@
               </div>
             </div>
           </div>
+          <BoardOfDirectors />
         </section>
       </>
   );

```

These changes introduce the "Board of Directors" section with the sophisticated and modern design you requested. The component is interactive, allowing users to toggle between the two executive members. Please note that you will need to add the director images to your `public/images` folder for them to display correctly.

Let me know if you have any other questions!

<!--
[PROMPT_SUGGESTION]Make the Board of Directors section responsive for mobile devices.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Animate the transition between director cards.[/PROMPT_SUGGESTION]
-->