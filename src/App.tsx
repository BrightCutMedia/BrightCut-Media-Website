import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, 
  Film, Scissors, Box, Zap, 
  Hexagon, Layout, Instagram, 
  Linkedin, MapPin, 
  Mail, CheckCircle2, Play
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
                <a href="https://www.instagram.com/brightcut_media" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Video Loop - Pulls from the showreel vimeo link as requested in visual improvements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-20 pointer-events-none opacity-[0.22]">
        <iframe
          src="https://player.vimeo.com/video/1175155329?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '115vw',
            height: '64.68vw', // 16:9 ratio
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%) scale(1.15)'
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Background Reel"
        ></iframe>
        {/* Dark Vignettes & Gradients to blend video smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"></div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
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
          <p className="font-sans font-light text-zinc-400 text-lg leading-relaxed max-w-lg mb-10">
            We partner with brands and agencies to produce visually striking content built for today's digital landscape.
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
  const clients = ["Momentum", "Cricket South Africa", "Maybelline", "Coached by Sade", "Geely", "South African Breweries", "Assore", "Ukhuni Business Furniture", "Jasper & Jude", "Coca-Cola", "Styled Africa", "Nedbank"];
  return (
    <a href="#clients" className="block group bg-bg border-y border-white/5 py-16 overflow-hidden marquee-mask hover:bg-white/[0.01] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <span className="font-display font-semibold text-[10px] tracking-[0.3em] text-zinc-500 uppercase group-hover:text-cyan-400 transition-colors">Our Partners</span>
      </div>
      <div className="flex whitespace-nowrap animate-marquee w-max select-none">
        {[...clients, ...clients].map((client, i) => (
          <span 
            key={i} 
            className="font-display font-black text-3xl md:text-5xl tracking-tight text-zinc-800 mx-16 group-hover:text-zinc-600 hover:!text-white hover:scale-105 transition-all duration-500 flex-shrink-0"
          >
            {client}
          </span>
        ))}
      </div>
    </a>
  );
};

const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);
  const isNumeric = !isNaN(target);

  useEffect(() => {
    if (!isNumeric) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;
  return <span>{count}{suffix}</span>;
};

const About = () => {
  return (
    <section id="about" className="bg-bg-alt py-32 md:py-44 slash-mask relative overflow-hidden">
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
          <div className="space-y-6 font-sans text-zinc-300 leading-relaxed text-lg">
            <p>
              BrightCut Media blends cinematic craftsmanship with AI-powered production — covering everything from brand films and campaigns to graphic design and digital content.
            </p>
            <p>
              We help organisations communicate with clarity, precision, and lasting impact.
            </p>
          </div>
          <div className="mt-8 w-16 h-[2px] bg-gradient-spectrum mb-10"></div>
          
          <div className="flex flex-wrap gap-3">
            {["Precision", "Innovation", "Clarity", "Confidence", "Modern Luxury"].map(val => (
              <div key={val} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 font-display font-semibold text-[10px] text-zinc-400 uppercase">
                {val}
              </div>
            ))}
          </div>

          {/* Behind-The-Scenes high-quality realistic production stills */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group bg-black">
              <img 
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80" 
                alt="Professional Cinema Camera" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3 pointer-events-none">
                <span className="font-display font-bold text-[8px] uppercase tracking-widest text-cyan-400">On Set</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group bg-black">
              <img 
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80" 
                alt="Video Editing Timeline" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3 pointer-events-none">
                <span className="font-display font-bold text-[8px] uppercase tracking-widest text-emerald-400">Editorial</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group bg-black">
              <img 
                src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&w=400&q=80" 
                alt="Chroma Key Greenscreen Studio" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3 pointer-events-none">
                <span className="font-display font-bold text-[8px] uppercase tracking-widest text-yellow-500">Studio</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[32px] p-10 shadow-2xl relative overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-spectrum"></div>
          <div className="grid grid-cols-2 gap-10">
            {[
              { val: "Trusted", suffix: "", sub: "by industry leaders" },
              { val: "6", suffix: "", sub: "Creative Service Pillars" },
              { val: "AI", suffix: "", sub: "Powered Workflows" },
              { val: "Global", suffix: "", sub: "Reach from Joburg" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="font-display font-extrabold text-4xl text-white">
                  {isNaN(parseFloat(stat.val)) ? (
                    stat.val
                  ) : (
                    <Counter value={stat.val} suffix={stat.suffix} />
                  )}
                </div>
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
      desc: "Brand films, corporate storytelling, campaigns, and event coverage. Cinematic quality for brands that refuse to compromise.",
      gradient: "from-cyan-400 to-emerald-400",
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Post-Production & Editing",
      icon: <Scissors size={32} />,
      desc: "Precision editing, colour grading, sound design, and commercial finishing. Every cut intentional. Every frame perfected.",
      gradient: "from-emerald-400 to-yellow-400",
      imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Motion Graphics, Logo & Graphic Design",
      icon: <Layout size={32} />,
      desc: "2D animation, logo animation, brand identity, and graphic design. Your visual identity — brought to life.",
      gradient: "from-yellow-400 to-orange-400",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "AI-Powered Content Production",
      icon: <Zap size={32} />,
      desc: "High-quality AI-generated imagery and intelligent creative assets. Premium results at production speed.",
      gradient: "from-orange-400 to-red-500",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Website Design & Development",
      icon: <Hexagon size={32} />,
      desc: "Modern, high-performance websites built to represent your brand at its best.",
      gradient: "from-red-500 to-purple-500",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Digital Products",
      icon: <Box size={32} />,
      desc: "Branded templates, digital asset packs, and interactive experiences. Scalable, on-brand, ready to deploy.",
      gradient: "bg-gradient-spectrum",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="services" className="py-32 md:py-44 bg-bg slash-mask-reverse relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">What We Do</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Our Capabilities</h2>
          <p className="font-sans text-zinc-400 text-lg">Six creative disciplines. One seamless studio.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-10 rounded-[24px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden border border-white/5"
            >
              {/* Cover Hover Behind Image */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.14] transition-opacity duration-700 pointer-events-none">
                <img 
                  src={s.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Edge highlight line */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${s.gradient} group-hover:h-full group-hover:opacity-[0.03] transition-all duration-500 z-10`}></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">{s.title}</h3>
                <p className="font-sans text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showreel" className="bg-bg py-32 md:py-44 slash-mask relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase mb-6 block">Our Work</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Every Frame Has Intention. <br />
            Every Cut Has Purpose.
          </h2>
          <p className="font-sans font-light text-zinc-400 text-lg">See how we bring brands to life.</p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-spectrum rounded-[20px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-bg-alt rounded-[18px] overflow-hidden aspect-video border border-white/10 flex items-center justify-center bg-black cursor-pointer shadow-2xl">
            
            {isPlaying ? (
              <iframe 
                src="https://player.vimeo.com/video/1175155329?badge=0&autopause=0&autoplay=1" 
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                title="BrightCut Media Showreel 2026"
              ></iframe>
            ) : (
              <div 
                className="absolute inset-0 w-full h-full group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Cinematic Wallpaper */}
                <img 
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80" 
                  alt="BrightCut Showreel Preview" 
                  className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>

                {/* Floating Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-24 h-24 rounded-full flex items-center justify-center bg-white/10 border border-white/30 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-300"
                  >
                    {/* Pulsing ring outer */}
                    <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-75"></div>
                    
                    <Play size={32} className="text-white fill-white ml-2" />
                  </motion.div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left">
                  <span className="font-display font-bold text-[10px] tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
                    Play Showreel
                  </span>
                  <h3 className="text-white font-display font-extrabold text-xl md:text-2xl mt-3 tracking-tight">
                    BrightCut Media Cinematic Reel
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    videoUrl: string;
    tag: string;
    desc: string;
  } | null>(null);

  const clientProjects = [
    {
      name: "Coca-Cola",
      videoUrl: "https://player.vimeo.com/video/1202110463?badge=0&autopause=0&autoplay=1",
      tag: "Seasonal Campaign",
      desc: "Bright, engaging, and dynamic digital assets produced for nationwide social distribution."
    },
    {
      name: "Geely",
      videoUrl: "https://www.youtube.com/embed/wbBBF0GVobw?autoplay=1&mute=0",
      tag: "Automotive Launch",
      desc: "Cinematic reveal and launch videos showcasing precision-engineered electric SUVs."
    },
    {
      name: "Jasper & Jude",
      videoUrl: "https://player.vimeo.com/video/1202123469?badge=0&autopause=0&autoplay=1",
      tag: "Cinematic Narrative",
      desc: "A premium lifestyle campaign and cinematic editorial lookbook presenting luxury stories."
    },
    {
      name: "Assore",
      videoUrl: "https://player.vimeo.com/video/1202115588?badge=0&autopause=0&autoplay=1",
      tag: "Industrial Overview",
      desc: "A bold corporate overview showcasing minerals, high-end infrastructure, and logistics operations."
    },
    {
      name: "Maybelline",
      videoUrl: "https://player.vimeo.com/video/1202126646?badge=0&autopause=0&autoplay=1",
      tag: "Product Commercial",
      desc: "Clean, elegant, and modern product showcase capturing makeup artistry, aesthetics, and beauty trends."
    },
    {
      name: "Momentum"
    },
    {
      name: "Cricket South Africa"
    },
    {
      name: "Coached by Sade"
    },
    {
      name: "South African Breweries"
    },
    {
      name: "Ukhuni Business Furniture"
    },
    {
      name: "Styled Africa"
    },
    {
      name: "Nedbank"
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="clients" className="py-32 md:py-44 bg-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">Our Partners</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Trusted by Industry Leaders</h2>
          <p className="font-sans text-zinc-400 text-lg">
            Collaborating with some of the world's most respected brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {clientProjects.map((project, i) => {
            const isPlayable = !!project.videoUrl;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => isPlayable && setSelectedProject(project as any)}
                className={`glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden h-32 border border-white/5 transition-all duration-300 ${
                  isPlayable
                    ? "group cursor-pointer hover:border-cyan-500/30 hover:bg-white/[0.04]"
                    : "cursor-default opacity-50 hover:border-white/10"
                }`}
              >
                {isPlayable && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play size={14} className="text-cyan-400 fill-cyan-400/20" />
                  </div>
                )}
                <span className={`font-display font-bold text-lg md:text-xl transition-colors duration-300 ${
                  isPlayable ? "text-zinc-400 group-hover:text-white" : "text-zinc-500"
                }`}>
                  {project.name}
                </span>
                {isPlayable && (
                  <span className="mt-2 text-[10px] font-sans font-semibold tracking-wider text-zinc-600 group-hover:text-cyan-400 uppercase transition-colors duration-300">
                    Play Showcase
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl rounded-2xl bg-[#0d0d0d] border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Core Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 rounded-full bg-black/60 p-2 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Aspect Ratio Controlled Video Frame */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={selectedProject.videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`${selectedProject.name} Project Showcase`}
                ></iframe>
              </div>

              {/* Informational Slate below active video */}
              <div className="p-6 md:p-8 border-t border-white/5 bg-gradient-to-b from-[#121212] to-[#0d0d0d]">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-display font-bold px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full uppercase tracking-widest">
                    {selectedProject.tag}
                  </span>
                  <span className="text-xs font-sans text-zinc-500 uppercase tracking-widest">
                    Case Study
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-3">
                  {selectedProject.name}
                </h3>
                <p className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed">
                  {selectedProject.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section id="contact" className="py-32 md:py-44 bg-bg relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05)_0,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-16 relative z-10">
        <div>
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="font-display font-semibold text-[10px] tracking-widest text-gradient uppercase">Let's Work Together</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">Start Your Project</h2>
          <p className="font-sans text-zinc-400 text-lg mb-12">Based in Johannesburg. Available worldwide.</p>

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
                { Icon: Instagram, href: "https://www.instagram.com/brightcut_media" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/brightcut-media" }
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
              {["Film Production", "Post-Production", "Motion & Graphic Design", "AI Production", "Web Design", "Digital Products"].map(s => (
                <span key={s} className="text-[10px] text-zinc-700 uppercase tracking-widest">{s}</span>
              ))}
            </div>
          </div>

          <div className="md:text-right flex flex-col justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-2">© 2026 BrightCut Media. All rights reserved.</p>
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
