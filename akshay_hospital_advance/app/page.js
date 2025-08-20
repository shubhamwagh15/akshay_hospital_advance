// app/page.js
import Hero from '../components/Hero'
import HospitalIntro from '../components/HospitalIntro'
import DoctorIntro from '../components/DoctorIntro'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="about">
        <HospitalIntro />
        <DoctorIntro />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />
    </main>
  )
}
