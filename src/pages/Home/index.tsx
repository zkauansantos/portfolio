import About from '../../components/About';
import Experience from '../../components/Experiences';
import GridSkills from '../../components/GridSkills';
import Hero from '../../components/Hero';
import Projects from '../../components/Projects';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <GridSkills />
      <Experience />
      <Projects />
    </>
  );
}
