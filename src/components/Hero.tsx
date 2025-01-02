import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Button from './common/Button';
import Container from './common/Container';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

const features = [
  {
    title: 'Quality Focus',
    description:
      'Rigorous testing and scalable design principles ensure top-tier solutions.',
  },
  {
    title: 'Customer Centric',
    description:
      'Tailored solutions and personalized experiences for every client.',
  },
  {
    title: 'Insights Driven',
    description: 'Data-driven decisions and analytics power our solutions.',
  },
];

const industries = [
  {
    name: 'Retail',
    description: 'Transforming retail experiences through digital innovation',
  },
  {
    name: 'Healthcare',
    description: 'Revolutionizing patient care with smart solutions',
  },
  {
    name: 'Finance',
    description: 'Empowering financial growth with secure technology',
  },
  {
    name: 'Education',
    description: 'Advancing learning through digital platforms',
  },
  {
    name: 'Manufacturing',
    description: 'Optimizing operations with Industry 4.0',
  },
];

export default function Hero() {
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const springY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndustry((prev) => (prev + 1) % industries.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div
      id="home"
      className="relative bg-gradient-to-br from-[#FFF8E1] via-white to-[#FFF8E1] pt-20"
    >
      <Container>
        <motion.div
          ref={containerRef}
          style={prefersReducedMotion ? {} : { opacity }}
          className="py-16 md:py-4"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div className="flex-1 text-left"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-[2rem] md:text-[3.5rem] font-bold leading-[1.2] text-gray-900 mb-8">
                Trusted Custom Software Development Partner in
                <span className="relative inline-block ml-2 text-[#FFD700]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndustry}
                      className="inline-block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              y: {
                                type: 'spring',
                                stiffness: 200,
                                damping: 20,
                              },
                              opacity: { duration: 0.2 },
                            }
                      }
                    >
                      {industries[currentIndustry].name}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-6"
              >
                {industries[currentIndustry].description}
              </motion.p>
<motion.div variants={fadeInUp} className="flex gap-4 py-1">
                <Button href="#contact" variant="cta">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    Let's Build Your Solution
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
              <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {/* Feature cards */}
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.2,
                        },
                      },
                    }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
              
            </motion.div>

            {/* Hero Image Section */}
            <div className="relative w-1/3 lg:w-2/5">
              <motion.div
                ref={imageRef}
                style={{ y: springY, scale }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&h=700&q=80"
                  alt="Software Development"
                  className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </motion.div>
              
              {/* Additional Floating Element */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-sm font-medium text-gray-900">Trusted by 20+ clients</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
