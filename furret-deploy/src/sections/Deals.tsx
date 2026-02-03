import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Plane, ArrowRight, TrendingDown, Star, MapPin } from 'lucide-react';
import { FlightDeal } from '../types';
import { generateMockDeals } from '../lib/data';

const tierConfig = {
  exceptional: {
    label: 'Exceptional',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10 border-rose-500/20',
    icon: Sparkles,
    gradient: 'from-rose-500 to-orange-500',
  },
  great: {
    label: 'Great Deal',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/20',
    icon: TrendingDown,
    gradient: 'from-emerald-500 to-teal-500',
  },
  good: {
    label: 'Good Price',
    textClass: 'text-primary-400',
    bgClass: 'bg-primary-500/10 border-primary-500/20',
    icon: Star,
    gradient: 'from-primary-500 to-accent-purple',
  },
};

const Deals = () => {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [selectedTier, setSelectedTier] = useState<'all' | 'exceptional' | 'great' | 'good'>('all');
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    setDeals(generateMockDeals());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, string> = {};
      deals.forEach((deal) => {
        const expires = new Date(deal.expiresAt).getTime();
        const now = Date.now();
        const diff = expires - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          newTimeLeft[deal.id] = `${hours}h ${minutes}m`;
        } else {
          newTimeLeft[deal.id] = 'Expired';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 60000);

    return () => clearInterval(interval);
  }, [deals]);

  const filteredDeals = selectedTier === 'all'
    ? deals
    : deals.filter((deal) => deal.tier === selectedTier);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price * 280);
  };

  return (
    <section id="deals" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-pink/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-white/80">Live Deals</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              Best deals from{' '}
              <span className="gradient-text">Karachi</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/60"
            >
              Hand-picked deals updated in real-time. Book fast before they disappear.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {(['all', 'exceptional', 'great', 'good'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedTier === tier
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tier === 'all' ? 'All Deals' : tierConfig[tier].label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal, index) => {
              const tier = tierConfig[deal.tier];
              const TierIcon = tier.icon;
              const savings = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);

              return (
                <motion.div
                  key={deal.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="group relative h-full glass rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all duration-500"
                    whileHover={{ y: -8 }}
                  >
                    <div className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${tier.bgClass} border`}>
                      <TierIcon className={`w-3.5 h-3.5 ${tier.textClass}`} />
                      <span className={`text-xs font-semibold ${tier.textClass}`}>{tier.label}</span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-xs font-semibold text-emerald-400">Save {savings}%</span>
                    </div>

                    <div className="relative h-40 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-20`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-white/30 mx-auto mb-2" />
                          <span className="text-4xl font-bold text-white/20">{deal.destinationCode}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {deal.destination}
                          </h3>
                          <p className="text-sm text-white/50">{deal.country}</p>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold gradient-text">{formatPrice(deal.price)}</span>
                        <span className="text-sm text-white/40 line-through">{formatPrice(deal.originalPrice)}</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Plane className="w-4 h-4" />
                          <span>{deal.airline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-xs">
                            {deal.stops === 0 ? 'N' : deal.stops}
                          </div>
                          <span>{deal.stops === 0 ? 'Non-stop' : `${deal.stops} stop${deal.stops > 1 ? 's' : ''}`}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                        <span>Dep: {new Date(deal.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>Ret: {new Date(deal.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Clock className="w-4 h-4 text-accent-pink" />
                          <span className="text-white/60">{timeLeft[deal.id] || 'Calculating...'}</span>
                        </div>
                        <motion.button
                          className="flex items-center gap-1 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-2xl glass hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Deals
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Deals;
