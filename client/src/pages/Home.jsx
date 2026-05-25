import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Gallery from "../sections/Gallery";
import Contact from "../sections/Contact";

const Divider = () => (
  <div className="section-divider mx-4 sm:mx-8 lg:mx-16" />
);

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        <Hero />

        <Divider />
        <About />

        <Divider />
        <Skills />

        <Divider />
        <Projects />

        <Divider />
        <Gallery />

        <Divider />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Home;