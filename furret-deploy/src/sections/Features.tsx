import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Globe, Bell, TrendingDown, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Price Prediction',
    description: 'Machine learning models analyze 2+ years of historical data to forecast optimal booking times with 94% accuracy.',
    color: 'from-accent-purple to-primary-500',
    bgColor: 'bg-accent-purple/10',
  },
  {
    icon: Globe,
    title: 'Global Deal Scan',
    description: 'Real-time monitoring of 500+ airlines and OTAs to surface hidden deals and error fares instantly.',
    color: 'from-primary-500 to-accent-teal',
    bgColor: 'bg-primary-500/10',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified the moment prices drop on your watched routes. Never miss a deal again.',
    color: 'from-accent-pink to-accent-coral',
    bgColor: 'bg-accent-pink/10',
  },
  {
    icon: TrendingDown,
    title: 'Price Tracking',
    description: 'Visualize price trends over time and identify the perfect moment to book your flight.',
    color: 'from-emerald-500 to-accent-teal',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Zap,
    title: 'Flash Deals',
    description: 'Exclusive access to limited-time offers and error fares before they disappear.',
    color: 'from-amber-500 to-accent-coral',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Shield,
    title: 'Price Protection',
    description: 'Book with confidence knowing our algorithms ensure you get the best available price.',
    color: 'from-primary-600 to-accent-purple',
    bgColor: 'bg-primary-600/10',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Zap className="w-4 h-4 text-accent-pink" />
            <span className="text-sm font-medium text-white/80">Powerful Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Everything you need to{' '}
            <span className="gradient-text">save on flights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/60"
          >
            Our platform combines cutting-edge AI with comprehensive data analysis
to deliver the most accurate flight deal predictions available.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 * index + 0.4,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="group relative h-full p-8 rounded-2xl glass hover:bg-white/[0.08] transition-all duration-500"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />

                  <div className={`relative w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-primary-400 transition-colors">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all shadow-xl shadow-primary-500/30"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Saving Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
