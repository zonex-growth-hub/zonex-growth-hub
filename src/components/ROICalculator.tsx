import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Target, TrendingUp, Users, MessageCircle, Calculator } from 'lucide-react';
import { AGENCY } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';
import { useApp } from '@/context/AppContext';

export function ROICalculator() {
  const { currency, formatPrice, playClick } = useApp();

  const isINR = currency === 'INR';

  // Config bounds depending on active currency
  const budgetMin = isINR ? 5000 : 100;
  const budgetMax = isINR ? 500000 : 10000;
  const budgetStep = isINR ? 5000 : 100;
  
  const salesMin = isINR ? 50000 : 1000;
  const salesMax = isINR ? 5000000 : 100000;
  const salesStep = isINR ? 10000 : 250;

  const [budgetVal, setBudgetVal] = useState(isINR ? 25000 : 300);
  const [targetSalesVal, setTargetSalesVal] = useState(isINR ? 200000 : 2500);

  // Sync state on currency switch
  const [prevCurrency, setPrevCurrency] = useState(currency);
  if (currency !== prevCurrency) {
    setPrevCurrency(currency);
    if (isINR) {
      setBudgetVal(budgetVal * 80);
      setTargetSalesVal(targetSalesVal * 80);
    } else {
      setBudgetVal(Math.round(budgetVal / 80));
      setTargetSalesVal(Math.round(targetSalesVal / 80));
    }
  }

  // Convert values back to INR to execute calculations
  const budgetInINR = isINR ? budgetVal : budgetVal * 80;

  const calc = useMemo(() => {
    // Realistic conversion rates compounding
    const traffic = Math.round(280 * Math.pow(budgetInINR / 1000, 0.65));
    const conversionRate = 0.038; // Deployed premium CRO optimization
    const leads = Math.round(traffic * conversionRate);

    // sublinear scaling return on ad spend
    const roas = 2.8 + 1.8 * Math.pow(budgetInINR / 100000, 0.4);

    // compounded chart data over 6 months
    const chartData = Array.from({ length: 6 }, (_, i) => {
      const growth = 1 + i * 0.15;
      return {
        month: `M${i + 1}`,
        revenue: Math.round((targetSalesVal * growth)),
        budget: Math.round((budgetVal * growth)),
      };
    });

    const projectedRevenue = targetSalesVal * 4.2;

    return { traffic, leads, roas, projectedRevenue, chartData };
  }, [budgetInINR, budgetVal, targetSalesVal]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick();
    setBudgetVal(Number(e.target.value));
  };

  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClick();
    setTargetSalesVal(Number(e.target.value));
  };

  return (
    <section id="roi" className="relative pt-4 pb-4 md:pt-8 md:pb-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="ROI Estimator"
          title={<>Interactive <span className="gradient-text">ROI Growth</span> Calculator</>}
          subtitle="Built for Indian startups &amp; small businesses. Drag the sliders to see realistic projections for your budget."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-6 sm:p-8"
          >
            <div className="space-y-8">
              {/* Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-purple-600 dark:text-violet-400" />
                    Monthly Marketing Budget
                  </label>
                  <span className="text-xl font-bold gradient-text">{formatPrice(isINR ? budgetVal : budgetVal * 80)}</span>
                </div>
                <input
                  type="range"
                  min={budgetMin}
                  max={budgetMax}
                  step={budgetStep}
                  value={budgetVal}
                  onChange={handleBudgetChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-zinc-650 dark:text-slate-500 mt-2 font-medium">
                  <span>{formatPrice(isINR ? budgetMin : budgetMin * 80, true)}</span>
                  <span>{formatPrice(isINR ? budgetMax : budgetMax * 80, true)}</span>
                </div>
              </div>

              {/* Target Sales Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                    <Target className="w-4 h-4 text-purple-600 dark:text-violet-400" />
                    Target Monthly Sales
                  </label>
                  <span className="text-xl font-bold gradient-text">{formatPrice(isINR ? targetSalesVal : targetSalesVal * 80)}</span>
                </div>
                <input
                  type="range"
                  min={salesMin}
                  max={salesMax}
                  step={salesStep}
                  value={targetSalesVal}
                  onChange={handleSalesChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-zinc-650 dark:text-slate-500 mt-2 font-medium">
                  <span>{formatPrice(isINR ? salesMin : salesMin * 80, true)}</span>
                  <span>{formatPrice(isINR ? salesMax : salesMax * 80, true)}</span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 select-none">
                <div className="bg-white/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-slate-400 mb-1 font-semibold">
                    <Users className="w-3.5 h-3.5 text-purple-600 dark:text-violet-400" /> 
                    Projected Visitors
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-violet-400">{calc.traffic.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-550 dark:text-slate-500 font-medium">visitors / month</div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-slate-400 mb-1 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-violet-400" /> 
                    High-Intent Leads
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-violet-400">{calc.leads.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-550 dark:text-slate-500 font-medium">leads / month</div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-slate-400 mb-1 font-semibold">
                    <Calculator className="w-3.5 h-3.5 text-purple-600 dark:text-violet-400" /> 
                    Estimated ROAS
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-violet-400">{calc.roas.toFixed(1)}x</div>
                  <div className="text-[10px] text-zinc-550 dark:text-slate-500 font-medium">return on ad spend</div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-slate-400 mb-1 font-semibold">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> 
                    Projected Revenue
                  </div>
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{formatPrice(isINR ? calc.projectedRevenue : calc.projectedRevenue * 80, true)}</div>
                  <div className="text-[10px] text-zinc-550 dark:text-slate-500 font-medium font-semibold">estimated compounds</div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={AGENCY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playClick();
                  analytics.trackInitiateCheckout('ROI Strategy Claim on WhatsApp', { budget: budgetVal, targetSales: targetSalesVal });
                }}
                className="btn-glow w-full cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold py-4"
              >
                <MessageCircle className="w-5 h-5" />
                Get Strategy for My Budget on WhatsApp →
              </a>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-6 sm:p-8 flex flex-col"
          >
            <h3 className="font-display font-bold text-lg mb-1 text-zinc-900 dark:text-white">6-Month Projected Revenue Growth</h3>
            <p className="text-sm text-zinc-600 dark:text-slate-400 mb-6 font-medium">Compounding growth model based on your inputs</p>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calc.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="budGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis 
                    tick={{ fill: '#94a3b8', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(v) => formatPrice(isINR ? v * 1000 : v * 80000, true)} 
                  />
                  <Tooltip
                    contentStyle={{ background: 'rgba(11,15,25,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '12px', fontSize: '13px' }}
                    labelStyle={{ color: '#8B5CF6' }}
                    formatter={(value: string | number) => [formatPrice(isINR ? Number(value) * 1000 : Number(value) * 80, true), 'Value']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#revGradient)" />
                  <Area type="monotone" dataKey="budget" stroke="#00F0FF" strokeWidth={2} fill="url(#budGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold select-none">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500" /> Revenue Target</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400" /> Marketing Spend</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ROICalculator;
