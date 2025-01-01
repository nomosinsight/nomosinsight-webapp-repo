import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Technologies from './components/Technologies';
import IndustriesSection from './components/Industries';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ContactPage from './pages/Contact';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import IndustriesPage from './pages/Industries';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Projects />
              <Achievements />
              <Services />
              <Technologies />
              <IndustriesSection />
              <Testimonials />
              <Contact />
            </main>
          } />
          <Route path="/services" element={<Services />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />}>
            <Route index element={<BlogList />} />
            <Route path=":slug" element={<BlogPost />} />
          </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;