import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { PortfolioData } from '../types';
import { SectionReveal } from './SectionReveal';

interface ContactSectionProps {
  data: PortfolioData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    serviceType: 'Full-Stack Project',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate sending message with a polished feedback state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        serviceType: 'Full-Stack Project',
      });
    }, 1000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter / x':
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Animation */}
        <SectionReveal className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>DISPATCH_CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F0F0] tracking-tight">
            Initiate Conversation or Inquire
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Have an engineering challenge, architectural consultation, full-stack project, or career inquiry? Let's discuss possibilities.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Quick Status / Availability Card */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {data.availableForHire ? 'OPEN FOR INQUIRIES & CONTRACTS' : 'LIMITED AVAILABILITY'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Currently responding to new opportunities, technical leadership roles, and high-impact advisory projects within 24 hours.
              </p>

              {/* Direct Info List */}
              <div className="space-y-3 pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Email:</span>
                  </div>
                  <button
                    id="contact-copy-email-btn"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 text-neutral-200 hover:text-white bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800 hover:border-neutral-700 transition-colors"
                  >
                    <span>{data.email}</span>
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    )}
                  </button>
                </div>

                {data.phone && (
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Phone className="w-4 h-4 text-sky-400" />
                      <span>Phone:</span>
                    </div>
                    <span className="text-neutral-200">{data.phone}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Location:</span>
                  </div>
                  <span className="text-neutral-200">{data.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Timezone:</span>
                  </div>
                  <span className="text-neutral-200">PT / UTC-8 (Flexible)</span>
                </div>
              </div>
            </div>

            {/* Social Network Grid */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Professional Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.socials.map((social) => (
                  <a
                    key={social.id}
                    id={`contact-social-${social.id}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-neutral-400 group-hover:text-blue-400 transition-colors">
                        {getSocialIcon(social.platform)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-semibold text-neutral-200 group-hover:text-white">
                          {social.platform}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[110px]">
                          {social.label || 'Profile'}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-base font-bold text-white font-mono">Send A Direct Message</h3>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono block mb-0.5">Message Transmitted!</strong>
                    <span>Thank you for reaching out. I have received your notification and will follow up shortly.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-mono block mb-0.5">Incomplete Fields</strong>
                    <span>Please make sure your name, email, and message content are filled before sending.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      YOUR_NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      EMAIL_ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jane@organization.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      ENGAGEMENT_TYPE
                    </label>
                    <select
                      id="contact-service"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                    >
                      <option value="Internship Opportunity">Internship Opportunity (Remote / Chennai / Bangalore)</option>
                      <option value="Mentorship & Guidance">Professional Mentorship & Guidance</option>
                      <option value="AI / LLM Project">AI & Agentic Systems Collaboration</option>
                      <option value="Full-Stack Application">Full-Stack Application Development</option>
                      <option value="Other / General Inquiry">General Inquiry / Coffee Chat</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-neutral-300 mb-1.5">
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Project Collaboration"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-neutral-300 mb-1.5">
                    MESSAGE_PAYLOAD *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision, timeline, or engineering goals..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-mono font-semibold text-xs sm:text-sm border border-blue-500/50 shadow-md shadow-blue-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-blue-200" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT_MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
