import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <section className='home-page'>
      <div className='home-page-wrapper'>
        <div className='home-page-video'>
          <video className='video' loop playsInline muted autoPlay>
            <source src='https://res.cloudinary.com/daith9h4b/video/upload/v1648584883/NYC_r3mv9j.mp4' type='video/mp4' />
          </video>
        </div>
        <div className='home-page-inner'>
          <div className='home-page-title'>
            <div className='home-page-title-inner'>
              <div className='first-part'>
                <span>Welcome.</span>
                <span>please</span>
                <span className='accent-word'>enjoy</span>
              </div>
              <div className='second-part'>
                <span>new york city!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .home-page-video {
          position: absolute;
          top: 0;
          width: 100%;
          height: 85vh;
          overflow: hidden;
          z-index: -100;
          filter: saturate(1.25);
        }
        .home-page-wrapper {
          position: static;
        }
        .home-page-inner {
          position: relative;
          height: calc(100vh - 182.5px);
        }
        .home-page-video::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          background: #000;
          opacity: 0.3;
        }
        .home-page-title {
          background: red;
          text-transform: uppercase;
          position: absolute;
          z-index: 5;
          right: 0;
          bottom: 0;
          left: 0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 15vh;
          font-size: 2.1rem;
          font-weight: 500;
          letter-spacing: 1.5px;
        }
        .home-page-title span {
          padding-right: 20px;
        }
        .first-part {
          padding-left: 20px;
        }
        .accent-word {
          padding: 10px 20px;
          background: #000;
          color: #fff;
          font-weight: 700;
        }
        .home-page-title-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -100;
        }
        @media (min-width: 1040px) {
          .video {
            object-fit: fill;
          }
        }
        @media (max-width: 1170px) {
          .home-page-inner {
            height: calc(100vh - 232.5px);
          }
        }
        @media (max-width: 630px) {
          .home-page-inner {
            height: calc(100vh - 75px);
          }
        }
        @media (max-width: 440px) {
          .home-page-title {
            font-size: 4vw;
          }
        }
      `}</style>
      <style jsx global>{`
        .header {
          background: transparent !important;
        }
      `}</style>
    </section>
  )
}
