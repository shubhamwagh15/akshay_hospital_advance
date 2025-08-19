import Hero from '../components/Hero'
import HospitalIntro from '../components/HospitalIntro'
import DoctorIntro from '../components/DoctorIntro'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <HospitalIntro />
      <DoctorIntro />
      <Services />
      <Testimonials />
      <Footer/>
    </>
  )
}
