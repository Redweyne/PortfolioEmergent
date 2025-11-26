import React, { useState } from 'react';
import { personalInfo, socialLinks } from '../data/mock';
import { Send, Mail, Github, Linkedin, CheckCircle, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Github': return Github;
      case 'Linkedin': return Linkedin;
      case 'Mail': return Mail;
      default: return Mail;
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 70%, rgba(0, 255, 209, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 70% 30%, rgba(0, 255, 209, 0.05) 0%, transparent 30%)
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.05)] mb-6">
            <MessageSquare className="w-4 h-4 text-[#00FFD1]" />
            <span className="font-mono text-xs tracking-widest text-[rgba(255,255,255,0.7)]">
              COMMUNICATION_INTERFACE
            </span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            INITIATE_<span className="text-[#00FFD1]">CONTACT</span>
          </h2>
          <p className="font-mono text-sm text-[rgba(255,255,255,0.5)] max-w-2xl mx-auto">
            {'// Have a project in mind? Let\'s build something extraordinary together'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,255,209,0.2)] bg-[rgba(0,255,209,0.03)]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                message_composer.exe
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="font-mono text-xs text-[rgba(0,255,209,0.6)] mb-4">
                {'// fill in transmission details'}
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                  IDENTIFIER_NAME
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[rgba(0,255,209,0.03)] border-[rgba(0,255,209,0.2)] text-white font-mono placeholder:text-[rgba(255,255,255,0.3)] focus:border-[#00FFD1] focus:ring-[#00FFD1]/20 rounded-none"
                  placeholder="Enter your name..."
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                  COMM_CHANNEL_EMAIL
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[rgba(0,255,209,0.03)] border-[rgba(0,255,209,0.2)] text-white font-mono placeholder:text-[rgba(255,255,255,0.3)] focus:border-[#00FFD1] focus:ring-[#00FFD1]/20 rounded-none"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.5)]">
                  MESSAGE_CONTENT
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-[rgba(0,255,209,0.03)] border-[rgba(0,255,209,0.2)] text-white font-mono placeholder:text-[rgba(255,255,255,0.3)] focus:border-[#00FFD1] focus:ring-[#00FFD1]/20 rounded-none resize-none"
                  placeholder="Describe your project or inquiry..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 font-mono text-sm font-medium tracking-wider transition-all duration-400 rounded-none ${
                  isSubmitted 
                    ? 'bg-green-500 text-white hover:bg-green-500' 
                    : 'bg-[#00FFD1] text-black hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    TRANSMITTING...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    MESSAGE_SENT_SUCCESSFULLY
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    SEND_TRANSMISSION
                  </span>
                )}
              </Button>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Status Card */}
            <div className="border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FFD1] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00FFD1]" />
                </div>
                <div>
                  <p className="font-mono text-sm text-white">
                    {personalInfo.availability}
                  </p>
                  <p className="font-mono text-xs text-[rgba(255,255,255,0.5)]">
                    {personalInfo.responseTime}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-[rgba(0,255,209,0.15)]">
                <div className="font-mono text-xs text-[rgba(0,255,209,0.6)]">
                  {'// DIRECT_CHANNELS'}
                </div>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 font-mono text-sm text-[rgba(255,255,255,0.7)] hover:text-[#00FFD1] transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-8">
              <div className="font-mono text-xs text-[rgba(0,255,209,0.6)] mb-6">
                {'// NETWORK_CONNECTIONS'}
              </div>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = getIcon(link.icon);
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-3 border border-[rgba(0,255,209,0.3)] bg-[rgba(0,255,209,0.03)] hover:bg-[rgba(0,255,209,0.1)] hover:border-[rgba(0,255,209,0.5)] transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-[#00FFD1]" />
                      <span className="font-mono text-sm text-[rgba(255,255,255,0.7)] group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="border border-[rgba(0,255,209,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-8">
              <div className="font-mono text-xs leading-relaxed text-[rgba(255,255,255,0.5)]">
                <span className="text-[#00FFD1]">&gt;</span> Ready to transform your ideas into reality?
                <br />
                <span className="text-[#00FFD1]">&gt;</span> I specialize in AI-powered applications,
                <br />
                <span className="text-[#00FFD1]">&gt;</span> privacy-first platforms, and elegant web solutions.
                <br />
                <span className="text-[#00FFD1]">&gt;</span> Let's discuss your project<span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
