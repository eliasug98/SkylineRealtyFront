import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  useAuth({});
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Cambia este valor según sea necesario
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Configuración del Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('div[id]');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Cambia este valor para ajustar la sensibilidad
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Establece la sección activa
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className='sticky top-0 left-0 w-full bg-slate-50 shadow-md z-40 p-4'>
      <div className={`flex justify-between items-center w-full transition-all duration-300 ${isShrunk ? 'h-6' : 'h-12'}`}>
        {/* Logo a la izquierda */}
          <Link to="/" className="flex items-center gap-2">
            <img src='/img/skyline-text.png' alt='skyline text' className="max-w-32" />
            <img src='/img/property-logo.png' alt='property logo' className="max-w-12 mb-2" />
          </Link>

        {/* Enlaces de navegación en pantallas normales */}
        <div className="hidden lg:flex md:space-x-10 mx-4">
          {['home', 'properties', 'agents', 'about', 'services', 'news', 'contact'].map(section => (
            <Link
              smooth
              key={section}
              to={`/#${section}`}
              className={`${activeSection === section ? "p-2 rounded font-semibold text-[rgb(246,147,20)]" : "text-black text-opacity-50 border-b-2 font-semibold border-transparent hover:text-[rgb(246,147,20)] p-2"}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          ))}
        </div>

        {/* Botón de menú hamburguesa visible solo en pantallas pequeñas */}
        <button onClick={handleToggle} className="lg:hidden text-black focus:outline-none mx-2">
          {/* Icono del menú hamburguesa */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Enlaces de navegación debajo en pantallas pequeñas */}
      <div className={`flex ${isOpen ? 'flex-row' : 'hidden'} lg:hidden mt-2`}>
        {['home', 'properties', 'agents', 'about', 'services', 'news', 'contact'].map(section => (
          <Link
            smooth
            key={section}
            to={`/#${section}`}
            className={`${activeSection === section ? "p-2 rounded font-semibold text-[rgb(246,147,20)]" : "text-black text-opacity-50 border-b-2 font-semibold border-transparent hover:text-[rgb(246,147,20)] p-2"}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;