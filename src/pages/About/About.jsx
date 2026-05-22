import React from 'react';
import Layout from '../../components/Layouts/Layout';
import '../../styles/AboutStyle.css';

function About() {
  return (
    <Layout>
      <section className="about_section">
        <div className="container about_block">
          <h1>About Me</h1>

          <p>
            I am a 3D Environment Artist focused on creating realistic and atmospheric environments for games and interactive projects.
            I work with environment modeling, modular assets, texturing, lighting, and scene composition.
          </p>

          <p>
            In addition to 3D art, I have experience with modern web technologies and independently developed and deployed my interactive portfolio website using React, Bootstrap, Vite, and Vercel.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default About;