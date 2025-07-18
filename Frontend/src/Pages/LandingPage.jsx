import React from 'react'
import Navbar from '../Components/Common/Navbar'
import HeroSection from '../Components/LandingPageComponents/HeroSection'
import FeaturesSection from '../Components/LandingPageComponents/FeaturesSection'
import HowItWorks from '../Components/LandingPageComponents/HowItWorks'
import CallToAction from '../Components/LandingPageComponents/CallToAction'
import Footer from '../Components/Common/Footer'


const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorks/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default LandingPage
