import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])

  return (
    <div className='home-page-wrapper'>
      <div className='home-page-video'>
        <video className='video' loop autoPlay playsInline muted>
          <source src='videos/full-hd.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='home-page'>
        <div className='home-page-title'>
          <div className='home-page-title-inner'>
            <div className='first-part'>
              <span>Welcome.</span>
              <span>please</span>
              <span className='accent-word'>enjoy</span>
            </div>
            <div className='second-part'>
              <span>austrian</span>
              <span>mountains!</span>
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
        }
        .home-page-wrapper {
          position: static;
        }

        .home-page {
          position: relative;
          height: calc(100vh - 177.5px);
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
          letter-spacing: 1.5px;
          font-weight: 600;
          font-size: 2.1rem;
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
        @media (max-width: 1170px) {
          .home-page {
            height: calc(100vh - 227.5px);
          }
        }

        @media (max-width: 630px) {
          .home-page {
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
        .header-logo-first {
        }
      `}</style>
    </div>
  )
}
