import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import LoadingScreen from './common/LoadingScreen';
import LandingPage from './landing/LandingPage';
import '../index.css';

const MainApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState('landing');
  const [showGovtOptions, setShowGovtOptions] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % 3); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + 3) % 3); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Enter a valid email address.';
    if (formData.phone && !/^\+?[0-9\s\-()]{7,}$/.test(formData.phone)) errors.phone = 'Enter a valid phone number.';
    if (!formData.message) errors.message = 'Message is required.';
    else if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters.';
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    alert('Message sent successfully!');
    setFormData({ email: '', phone: '', message: '' });
    setFormErrors({});
  };

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <LandingPage
        showGovtOptions={showGovtOptions}
        setShowGovtOptions={setShowGovtOptions}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        goToAuth={() => {}}
      />
    </div>
  );
};

export default MainApp; 