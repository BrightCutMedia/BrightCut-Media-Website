import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, 
  Film, Scissors, Box, Zap, 
  Hexagon, Layout, Instagram, 
  Linkedin, Video, MapPin, 
  Mail, CheckCircle2 
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "h-10 md:h-12 lg:h-16" }: { className?: string }) => {
  const logoSrc = "https://raw.githubusercontent.com/BrightCutMedia/BrightCut_Media_Photos/16b3f54f2b345d193e9a371f1cfe7016434d77af/BrightCut%20Media%20logo%20with%20light%20streak%20Topaz%20Gigapixel%204x%20scale%20Topaz%20Gigapixel%202x%20scale.png";
  return (
    <div className={`relative ${className} flex items-center`}>
      {/* Original Logo (Top Part) - Clipped to show only "BRIGHTCUT" in original colors */}
      <img 
        src={logoSrc} 
        alt="BrightCut Media Logo" 
        className={`${className} w-auto object-contain [clip-path:inset(0_0_33%_0)]`}
        referrerPolicy="no-referrer"
      />
      {/* White Logo (Bottom Part) - Clipped to show only "MEDIA" in white */}
      <img 
        src={logoSrc} 
        alt="" 
        className={`absolute top-0 left-0 ${className} w-auto object-contain [filter:brightness(0)_invert(1)] [clip-path:inset(66%_0_0_0)]`}
        referrerPolicy="no-referrer"
        aria-hidden="true"
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'Clients', href: '#clients' },
    { name: 'Book a Call', href: '#contact', isButton: true },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center group relative">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`font-display font-semibold text-[10px] lg:text-[11px] uppercase tracking-[0.15em] transition-all relative group ${link.isButton ? 'px-4 lg:px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
                {!link.isButton && <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-spectrum transition-all duration-300 group-hover:w-full"></span>}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-white hover:text-cyan-400 transition-colors" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg z-[100] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <Logo className="h-10" />
              <button 
                className="p-2 -mr-2 text-white hover:text-cyan-400 transition-colors" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-display font-bold text-4xl transition-colors ${link.isButton ? 'text-gradient' : 'text-white hover:text-cyan-400'}`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-4">Connect</p>
              <div className="flex gap-6">
                <a href="mailto:hello@brightcut.media" className="text-white hover:text-cyan-400 transition-colors">
                  <Mail size={24} />
                </a>
                <a href="#" className="text-white hover:text-cyan-400 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://www.linkedin.com/company/brightcut-media" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden mesh-gradient">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >

          <h1 className="font-display font-extrabold text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] text-white mb-8">
            Precision <br />
            <span className="text-gradient">Storytelling.</span> <br />
            <span className="text-white/40 text-[0.7em]">Intelligent Production.</span>
          </h1>
          <p className="font-sans font-light text-zinc-400 text-lg leading-relaxed max-w-md mb-10">
            We partner with brands, corporations, and advertising agencies to produce visually striking content designed for today's fast-moving digital landscape.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <a href="#showreel" className="px-8 py-4 rounded-full bg-white text-black font-display font-bold text-sm shadow-lg hover:bg-white/90 hover:scale-105 transition-all">
              Watch Our Showreel
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-white/20 text-white font-display font-bold text-sm flex items-center gap-2 hover:bg-white hover:text-black transition-all">
              Start a Project <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-12 w-20 h-[2px] bg-gradient-spectrum"></div>
        </motion.div>

        <motion.div 
          style={{ y: scrollY * 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full aspect-square">
            {/* Abstract Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400/15 rounded-full blur-[80px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/20 rounded-full blur-[70px]"></div>
            </div>
            {/* The Slash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1.5px] bg-gradient-spectrum -rotate-[22deg] shadow-[0_0_30px_rgba(255,255,255,0.2)] z-10">
              {/* Central Flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full blur-[12px] opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-40"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const clients = ["Momentum", "Cricket South Africa", "La Roche Posay", "Sade Savings", "Geely", "South African Breweries", "Assore", "Ukhuni Business Furniture", "Jasper & Jude"];
  return (
    <a href="#clients" className="block group bg-bg border-y border-white/5 py-12 overflow-hidden marquee-mask hover:bg-white/[0.02] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="font-display font-semibold text-[10px] tracking-[0.3em] text-zinc-500 uppercase group-hover:text-cyan-400 transition-colors">Trusted By</span>
      </div>
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {[...clients, ...clients].map((client, i) => (
          <span key={i} className="font-display font-bold text-2xl text-zinc-700 mx-12 group-hover:text-zinc-400 transition-colors flex-shrink-0">
            {client}
          </span>
        ))}
      </div>
    </a>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-bg-alt py-32 slash-mask relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">Who We Are</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-8">
            A Modern Studio Built for the Future of Brand Storytelling
          </h2>
          <div className="space-y-6 font-sans text-zinc-400 leading-relaxed text-lg">
            <p>
              BrightCut Media combines cinematic craftsmanship with AI-powered production workflows. Our hybrid studio model blends traditional film production, high-end post-production, and advanced AI-assisted creative processes.
            </p>
            <p>
              From brand films and commercial campaigns to rapid digital content production, we help organisations communicate their message with clarity, precision, and lasting impact.
            </p>
          </div>
          <div className="mt-8 w-16 h-[2px] bg-gradient-spectrum mb-10"></div>
          
          <div className="flex flex-wrap gap-3">
            {["Precision", "Innovation", "Clarity", "Confidence", "Modern Luxury"].map(val => (
              <div key={val} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 font-display font-semibold text-[10px] text-zinc-300 uppercase">
                {val}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[32px] p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-spectrum"></div>
          <div className="grid grid-cols-2 gap-10">
            {[
              { label: "5+", sub: "Major Brand Clients" },
              { label: "6", sub: "Creative Service Pillars" },
              { label: "AI", sub: "Powered Workflows" },
              { label: "Global", sub: "Reach from Joburg" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="font-display font-extrabold text-4xl text-white">{stat.label}</div>
                <div className="font-sans text-xs text-zinc-500 uppercase tracking-wider">{stat.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};



const Services = () => {
  const services = [
    {
      title: "Traditional Film Production",
      icon: <Film size={32} />,
      desc: "Brand films, corporate storytelling, promotional campaigns, event coverage, and social media video production. Cinematic quality crafted for brands that refuse to compromise.",
      gradient: "from-cyan-400 to-emerald-400"
    },
    {
      title: "Post-Production & Editing",
      icon: <Scissors size={32} />,
      desc: "Precision-driven editing, colour grading, sound design, and commercial finishing. Every cut is intentional. Every frame is perfected for modern digital platforms.",
      gradient: "from-emerald-400 to-yellow-400"
    },
    {
      title: "Motion Graphics & Logo Design",
      icon: <Layout size={32} />,
      desc: "2D animation, explainer videos, logo animation, and brand identity motion design. We bring your visual identity to life — frame by frame, with purpose and style.",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      title: "AI-Powered Content Production",
      icon: <Zap size={32} />,
      desc: "We produce high-quality AI-generated content, photorealistic imagery, and intelligent creative assets. Our workflows leverage advanced AI to accelerate production while delivering premium visual results that push the boundaries of digital storytelling.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      title: "Website Design & Development",
      icon: <Hexagon size={32} />,
      desc: "Modern, high-performance websites and digital platforms built to represent your brand at its best — from sleek portfolio sites to full e-commerce experiences.",
      gradient: "from-red-500 to-purple-500"
    },
    {
      title: "Digital Products",
      icon: <Box size={32} />,
      desc: "Custom digital tools, branded templates, digital asset packs, and interactive digital experiences built specifically for brands. Scalable, on-brand, and ready to deploy.",
      gradient: "bg-gradient-spectrum"
    }
  ];

  return (
    <section id="services" className="py-32 bg-bg slash-mask-reverse relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">What We Do</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Our Capabilities</h2>
          <p className="font-sans text-zinc-400 text-lg">Six creative disciplines. One seamless studio. From first concept to final delivery.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-10 rounded-[24px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${s.gradient} group-hover:h-full group-hover:opacity-[0.05] transition-all duration-500`}></div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4">{s.title}</h3>
              <p className="font-sans text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showreel = () => {
  return (
    <section id="showreel" className="bg-bg py-32 slash-mask relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase mb-6 block">Our Work</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Every Frame Has Intention. <br />
            Every Cut Has Purpose.
          </h2>
          <p className="font-sans font-light text-gray-400 text-lg">Watch our showreel and see how we bring brands to life.</p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-spectrum rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-bg-alt rounded-[18px] overflow-hidden aspect-video border border-white/10">
            <iframe 
              src="https://player.vimeo.com/video/1175155329?badge=0&autopause=0&player_id=0&app_id=58479" 
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              title="BrightCut Media Showreel 2026"
            ></iframe>
          </div>
        </div>


      </div>
    </section>
  );
};

const Clients = () => {
  const clients = [
    "Momentum", "Cricket South Africa", "La Roche Posay", 
    "Sade Savings", "Geely", "South African Breweries", 
    "Assore", "Ukhuni Business Furniture", "Jasper & Jude"
  ];

  return (
    <section id="clients" className="py-32 bg-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">Our Partners</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Trusted by Industry Leaders</h2>
          <p className="font-sans text-zinc-400 text-lg">We've had the privilege of collaborating with some of the most respected brands and organizations across the globe.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-8 rounded-2xl flex items-center justify-center text-center group hover:border-white/20 transition-all duration-300"
            >
              <span className="font-display font-bold text-lg md:text-xl text-zinc-500 group-hover:text-white transition-colors duration-300">
                {client}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent text-center">
          <p className="font-display font-semibold italic text-zinc-500 text-lg mb-8">
            "BrightCut Media consistently delivers high-end production value with a level of precision that is rare in the industry."
          </p>
          <div className="w-12 h-[2px] bg-gradient-spectrum mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const subject = encodeURIComponent(`Project Consultation Request - ${data.fullName}`);
    const body = encodeURIComponent(
      `Name: ${data.fullName}\n` +
      `Company: ${data.companyName}\n` +
      `Email: ${data.email}\n` +
      `Service: ${data.service}\n\n` +
      `Project Details:\n${data.message}`
    );
    
    window.location.href = `mailto:hello@brightcut.media?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-bg relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-16 relative z-10">
        <div>
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">Let's Work Together</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Start Your Project</h2>
          <p className="font-sans text-zinc-400 text-lg mb-12">Based in Johannesburg. Available worldwide. Let's discuss how BrightCut Media can bring your brand story to life.</p>

          <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-spectrum"></div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">Full Name</label>
                    <input required name="fullName" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">Company Name</label>
                    <input required name="companyName" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">Service Interested In</label>
                  <select name="service" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none">
                    <option className="bg-[#222222]">Traditional Film Production</option>
                    <option className="bg-[#222222]">Post-Production & Editing</option>
                    <option className="bg-[#222222]">Motion Graphics & Logo Design</option>
                    <option className="bg-[#222222]">AI-Powered Content Production</option>
                    <option className="bg-[#222222]">Website Design & Development</option>
                    <option className="bg-[#222222]">Digital Products</option>
                    <option className="bg-[#222222]">Not sure — let's chat</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-display font-semibold text-[10px] text-zinc-500 uppercase tracking-widest">Tell us about your project</label>
                  <textarea name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" placeholder="Describe your goals..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 rounded-full bg-white text-black font-display font-bold text-lg shadow-lg hover:bg-white/90 transition-all">
                  Request a Consultation →
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-4">You're all set.</h3>
                <p className="font-sans text-zinc-400 mb-8">Thank you for reaching out. A member of the BrightCut Media team will be in touch within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-gradient font-display font-bold uppercase tracking-widest text-xs">Send another message</button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card rounded-[32px] p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-spectrum"></div>
            <h3 className="font-display font-bold text-2xl text-white mb-8">Get In Touch</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-white mt-1"><MapPin size={20} /></div>
                <div>
                  <div className="font-display font-bold text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Location</div>
                  <div className="font-sans text-white">Johannesburg, South Africa — Available Worldwide</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-white mt-1"><Mail size={20} /></div>
                <div>
                  <div className="font-display font-bold text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:hello@brightcut.media" className="font-sans text-white hover:text-cyan-400 transition-colors">hello@brightcut.media</a>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-white/10 my-10"></div>

            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/brightcut-media" },
                { Icon: Video, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>

            <p className="mt-12 font-display font-semibold italic text-zinc-600 text-center">
              "Every great brand story starts with a conversation."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg pt-24 pb-8 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          <div>
            <a href="#home" className="flex items-center mb-6 relative inline-block group">
              <Logo className="h-20" />
            </a>
            <p className="font-sans font-light text-zinc-500 max-w-xs">
              Precision Storytelling. Intelligent Production. Based in Johannesburg, serving global clients.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap gap-6">
              {["Home", "About", "Services", "Showreel", "Clients", "Contact"].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="font-sans text-zinc-500 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Film Production", "Post-Production", "Motion Graphics", "AI Production", "Web Design", "Digital Products"].map(s => (
                <span key={s} className="text-[10px] text-zinc-700 uppercase tracking-widest">{s}</span>
              ))}
            </div>
          </div>

          <div className="md:text-right flex flex-col justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-2">© 2025 BrightCut Media. All rights reserved.</p>
              <a href="mailto:hello@brightcut.media" className="text-zinc-400 text-xs hover:text-white transition-colors block mb-2">hello@brightcut.media</a>
              <p className="text-zinc-700 text-xs uppercase tracking-widest">Johannesburg, South Africa</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-gradient-spectrum opacity-20"></div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Showreel />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
