import React, { useState } from 'react';
import SpotlightCard from './ReactBits/SpotlightCard';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Email format is invalid.';
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on keypress
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const apiEndpoint = import.meta.env.VITE_API_URL;

    // If no backend endpoint is configured in env, simulate local success
    if (!apiEndpoint) {
      console.log(
        "No VITE_API_URL environment variable configured.\n" +
        "Form submission simulated successfully. To connect your real backend,\n" +
        "create a .env file and set: VITE_API_URL=https://your-api-endpoint"
      );
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrors({ submit: errorData.message || 'Failed to send message. Please try again later.' });
      }
    } catch (err) {
      setErrors({ submit: 'Could not connect to the server. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 lg:py-12 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="glow-bg top-[30%] left-[5%] bg-[var(--accent-rose)]/15" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/50 text-xs tracking-wider uppercase font-semibold text-[var(--accent)] mb-3">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            Let's Build Something Together
          </h2>
        </div>

        {/* Contact Form Container using SpotlightCard */}
        <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="p-8 md:p-12 border-[var(--border-color)] backdrop-blur-md max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                noValidate
              >
                {/* Name field */}
                <div className="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-5 py-4 bg-[var(--bg-primary)]/40 border rounded-xl text-[var(--text-primary)] font-medium text-sm transition-all focus:outline-none focus:bg-[var(--bg-primary)]/80 ${
                      errors.name 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-[var(--border-color)] focus:border-[var(--accent)]'
                    }`}
                  />
                  <label htmlFor="contact-name" className="absolute left-5 top-4 text-sm font-medium text-[var(--text-secondary)] pointer-events-none transition-all duration-300 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--accent)] not-placeholder-shown:-translate-y-7 not-placeholder-shown:scale-85">
                    Your Name
                  </label>
                  {errors.name && (
                    <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5 px-1">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-5 py-4 bg-[var(--bg-primary)]/40 border rounded-xl text-[var(--text-primary)] font-medium text-sm transition-all focus:outline-none focus:bg-[var(--bg-primary)]/80 ${
                      errors.email 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-[var(--border-color)] focus:border-[var(--accent)]'
                    }`}
                  />
                  <label htmlFor="contact-email" className="absolute left-5 top-4 text-sm font-medium text-[var(--text-secondary)] pointer-events-none transition-all duration-300 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--accent)] not-placeholder-shown:-translate-y-7 not-placeholder-shown:scale-85">
                    Email Address
                  </label>
                  {errors.email && (
                    <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5 px-1">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="relative w-full">
                  <textarea
                    name="message"
                    id="contact-message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-5 py-4 bg-[var(--bg-primary)]/40 border rounded-xl text-[var(--text-primary)] font-medium text-sm transition-all focus:outline-none focus:bg-[var(--bg-primary)]/80 resize-none ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-[var(--border-color)] focus:border-[var(--accent)]'
                    }`}
                  />
                  <label htmlFor="contact-message" className="absolute left-5 top-4 text-sm font-medium text-[var(--text-secondary)] pointer-events-none transition-all duration-300 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-85 peer-focus:text-[var(--accent)] not-placeholder-shown:-translate-y-7 not-placeholder-shown:scale-85">
                    How can I help you?
                  </label>
                  {errors.message && (
                    <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5 px-1">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {errors.submit && (
                  <div className="text-xs text-red-500 font-medium flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle size={14} /> {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 bg-gradient-to-r from-[var(--accent-rose)] to-[#EA580C] hover:brightness-110 active:scale-97 text-white font-semibold rounded-xl shadow-lg shadow-[var(--accent-rose)]/15 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)] mb-3">
                  Message Sent!
                </h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-sm leading-relaxed mb-8">
                  Thank you for reaching out. I've received your email and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] font-semibold rounded-full text-xs transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </SpotlightCard>

      </div>
    </section>
  );
}
