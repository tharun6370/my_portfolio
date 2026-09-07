import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { PortfolioData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BioSection } from './components/BioSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { MarvelStudiosIntro } from './components/MarvelStudiosIntro';

const LOCAL_STORAGE_KEY = 'portfolio_user_custom_data_v3';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Scroll Spy for active section indicator
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element top is near or above the middle of viewport
          if (rect.top <= windowHeight * 0.4) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Failed to persist portfolio data in localStorage', e);
    }
  };

  const handleResetData = () => {
    setPortfolioData(initialPortfolioData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage', e);
    }
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] selection:bg-blue-600 selection:text-white relative">
      {/* Marvel Studios Style Entry Transition */}
      {showIntro && (
        <MarvelStudiosIntro
          userName={portfolioData.name}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        data={portfolioData}
        activeSection={activeSection}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          data={portfolioData}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenEditModal={() => setIsEditModalOpen(true)}
        />

        {/* Biography, Experience & Education */}
        <BioSection data={portfolioData} />

        {/* Projects Showcase */}
        <ProjectsSection projects={portfolioData.projects} />

        {/* Skills & Tooling */}
        <SkillsSection skills={portfolioData.skills} />

        {/* Contact & Professional Profiles */}
        <ContactSection data={portfolioData} />
      </main>

      {/* Footer */}
      <Footer
        data={portfolioData}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Printable / Viewable Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        data={portfolioData}
      />

      {/* Profile Live Customizer Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={portfolioData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
