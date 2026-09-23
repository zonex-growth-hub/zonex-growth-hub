import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Target, TrendingUp, Users, Calculator, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

export function ROICalculator() {
  const { currency, formatPrice, playClick } = useApp();
  const isINR = currency === 'INR';

  const budgetMin = isINR ? 5000 : 100;
  const budgetMax = isINR ? 500000 : 10000;
  const budgetStep = isINR ? 5000 : 100;
  
  const salesMin = isINR ? 50000 : 1000;
  const salesMax = isINR ? 5000000 : 100000;
  const salesStep = isINR ? 10000 : 250;

  const [budgetVal, setBudgetVal] = useState(isINR ? 25000 : 300);
  const [targetSalesVal, setTargetSalesVal] = useState(isINR ? 200000 : 2500);

  // Convert values back to INR for core calculations
  const budgetInINR = isINR ? budgetVal : budgetVal * 80;

  const calc = useMemo(() => {
    const traffic = Math.round(280 * Math.pow(budgetInINR / 1000, 0.65));
    const conversionRate = 0.038;
    const leads = Math.round(traffic * conversionRate);
    const roas = 2.8 + 1.8 * Math.pow(budgetInINR / 100000, 0.4);

    const chartData = Array.from({ length: 6 }, (_, i) => {
      const growth = 1 + i * 0.18;
      return {
        month: `M${i + 1}`,
        revenue: Math.round(targetSalesVal * growth),
        budget: Math.round(budgetVal * growth),
      };
    });

    const projectedRevenue = targetSalesVal * 4.2;

    return { traffic, leads, roas, projectedRevenue, chartData };
  }, [budgetInINR, budgetVal, targetSalesVal]);

  return (
    <section id="roi" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="FinTech Revenue Simulator"
          title={<>Interactive <span className="gradient-text-accent">ROI Trading Console</span></>}
          subtitle="Built for ambitious Indian brands &amp; startups. Drag the budget sliders to project realistic revenue multi-folds."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-[#0B0B10]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-purple-400" />
                <span className="font-display font-bold text-sm text-white uppercase tracking-wider">Trading Console</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">LIVE ENGINE</span>
            </div>

            {/* Budget Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  Monthly Ad Budget
                </label>
                <span className="text-xl font-bold font-display text-white">{formatPrice(isINR ? budgetVal : budgetVal * 80)}</span>
              </div>
              <input
                type="range"
                min={budgetMin}
                max={budgetMax}
                step={budgetStep}
                value={budgetVal}
                onChange={(e) => { playClick(); setBudgetVal(Number(e.target.value)); }}
                className="w-full accent-purple-500 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{formatPrice(isINR ? budgetMin : budgetMin * 80, true)}</span>
                <span>{formatPrice(isINR ? budgetMax : budgetMax * 80, true)}</span>
              </div>
            </div>

            {/* Target Revenue Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  Target Monthly Revenue
                </label>
                <span className="text-xl font-bold font-display text-cyan-300">{formatPrice(isINR ? targetSalesVal : targetSalesVal * 80)}</span>
              </div>
              <input
                type="range"
                min={salesMin}
                max={salesMax}
                step={salesStep}
                value={targetSalesVal}
                onChange={(e) => { playClick(); setTargetSalesVal(Number(e.target.value)); }}
                className="w-full accent-cyan-400 bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{formatPrice(isINR ? salesMin : salesMin * 80, true)}</span>
                <span>{formatPrice(isINR ? salesMax : salesMax * 80, true)}</span>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Traffic</span>
                <span className="text-lg font-bold text-white font-mono">{calc.traffic.toLocaleString()} Visits</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Inbound Leads</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{calc.leads.toLocaleString()} Leads</span>
              </div>
            </div>

          </motion.div>

          {/* Chart & Projections Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0B0B10]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">6-Month Scaling Projection</span>
                <h3 className="text-lg font-bold font-display text-white">Compounding Sales Curve</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Est. ROAS Multiplier</span>
                <span className="text-xl font-bold font-display text-emerald-400">{calc.roas.toFixed(1)}x ROAS</span>
              </div>
            </div>

            {/* Recharts Curve Display */}
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calc.chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8A63F8" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#8A63F8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#666" fontSize={11} />
                  <YAxis stroke="#666" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#07070B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8A63F8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">Projected 6-Mo Cumulative Revenue</span>
                <span className="text-xl font-extrabold text-white font-display">{formatPrice(isINR ? calc.projectedRevenue : calc.projectedRevenue * 80)}</span>
              </div>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Lock Strategy</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default ROICalculator;
