import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, ArrowRight, Brain } from 'lucide-react';
import { generateRouteAnalytics } from '../lib/data';

const Analytics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedRoute, setSelectedRoute] = useState(0);
  const analytics = generateRouteAnalytics();
  const selectedData = analytics[selectedRoute];

  const formatPrice = (price: number) => {
    return `PKR ${(price * 280 / 1000).toFixed(0)}K`;
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 border border-white/10">
          <p className="text-sm text-white/60 mb-1">{label}</p>
          <p className="text-lg font-semibold text-white">
            {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Brain className="w-4 h-4 text-accent-purple" />
            <span className="text-sm font-medium text-white/80">AI-Powered Analytics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Price intelligence that{' '}
            <span className="gradient-text">predicts the future</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/60"
          >
            Our machine learning models analyze millions of data points to forecast price trends
            and identify the optimal time to book your flight.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {analytics.map((item, index) => (
              <button
                key={item.route}
                onClick={() => setSelectedRoute(index)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedRoute === index
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.route}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">30-Day Price History</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${selectedData.priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedData.priceChange >= 0 ? '+' : ''}{selectedData.priceChange}% vs last month
                  </span>
                  {selectedData.priceChange >= 0 ? (
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-rose-400" />
                  )}
                </div>
              </div>

              <div className="h-[300px] sm:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedData.history}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value) => `PKR ${(value * 280 / 1000).toFixed(0)}K`}
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-primary-400" />
                  </div>
                  <span className="text-sm text-white/60">Current Price</span>
                </div>
                <div className="text-3xl font-bold text-white">{formatPrice(selectedData.currentPrice)}</div>
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent-purple" />
                  </div>
                  <span className="text-sm text-white/60">Average Price</span>
                </div>
                <div className="text-3xl font-bold text-white">{formatPrice(selectedData.avgPrice)}</div>
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/60">Lowest Price</span>
                </div>
                <div className="text-3xl font-bold text-white">{formatPrice(selectedData.lowestPrice)}</div>
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-pink/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent-pink" />
                  </div>
                  <span className="text-sm text-white/60">AI Confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
                      style={{ width: `${selectedData.confidence}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-white">{selectedData.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Ready to start tracking?</h3>
            <p className="text-white/60">Set up price alerts for your favorite routes and never miss a deal.</p>
          </div>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/30 whitespace-nowrap"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Set Price Alert
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
