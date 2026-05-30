'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};

    // Strict Name Validation
    if (!fields.name.trim()) {
      tempErrors.name = 'Please provide your name.';
    } else if (fields.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    // Strict Email Validation (RFC 5322 compliant simple regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!fields.email.trim()) {
      tempErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(fields.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    // Subject Validation
    if (!fields.subject.trim()) {
      tempErrors.subject = 'Please enter a subject.';
    }

    // Message Validation
    if (!fields.message.trim()) {
      tempErrors.message = 'Please write a brief message.';
    } else if (fields.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    // Proactively clear error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock API dispatch simulating a secure backend contact response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form variables safely
      setFields({ name: '', email: '', subject: '', message: '' });
      // TODO(security): Log only generic metadata. DO NOT print raw fields object.
      console.log("Contact form payload processed successfully");
    }, 1500);
  };

  return (
    <div className="content-wrapper">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="card-title-container">
          <Mail className="card-title-icon" />
          <h2 className="card-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact info nodes */}
          <div className="contact-info">
            <h3>Collaboration & Engagement</h3>
            <p>
              Whether you are looking to collaborate on a science communication workshop, schedule a speaking engagement,
              or support the capacity-building efforts at GhScientific, please send a message.
            </p>

            <div className="contact-node">
              <Mail className="contact-node-icon" />
              <div>
                <h4 className="contact-node-title">Email Correspondence</h4>
                <p className="contact-node-value">info@ghscientific.org</p>
              </div>
            </div>

            <div className="contact-node">
              <MapPin className="contact-node-icon" />
              <div>
                <h4 className="contact-node-title">Primary Region</h4>
                <p className="contact-node-value">London & Essex, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  className="form-success-msg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle className="contact-node-icon" style={{ color: '#4CAF50', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Thank you!</strong>
                    Your message has been processed successfully. Dr. Tagoe will get in touch with you shortly.
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  {/* Name field */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      required
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="jane.doe@example.com"
                      disabled={isSubmitting}
                      required
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Subject field */}
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={fields.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Collaboration opportunity"
                      disabled={isSubmitting}
                      required
                    />
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </div>

                  {/* Message field */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Please write your inquiry here..."
                      disabled={isSubmitting}
                      required
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send size={14} style={{ marginRight: '0.5rem' }} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
