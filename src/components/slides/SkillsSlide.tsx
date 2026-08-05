import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, Terminal, Database, Code2, Play, Sparkles, Sliders } from 'lucide-react';
import { skillCategories } from '../../data/resumeData';
import { ThemeMode } from '../../types';

interface SkillsSlideProps {
  onSelectSlide: (index: number) => void;
  theme: ThemeMode;
}

const queryPresets = [
  {
    name: "DAX: YoY Revenue Measure",
    code: "YoY_Revenue_Growth = \nVAR CurrentYear = SUM(DW_Bank_Abyssinia[Revenue])\nVAR PreviousYear = CALCULATE(SUM(DW_Bank_Abyssinia[Revenue]), SAMEPERIODLASTYEAR('Calendar'[Date]))\nRETURN DIVIDE(CurrentYear - PreviousYear, PreviousYear, 0)",
    output: [
      { name: '2021', revenue: 14.2, growth: 12 },
      { name: '2022', revenue: 18.5, growth: 30 },
      { name: '2023', revenue: 24.8, growth: 34 },
      { name: '2024', revenue: 32.1, growth: 29 },
    ]
  },
  {
    name: "SQL: Branch Transaction ETL",
    code: "SELECT \n  b.branch_name,\n  COUNT(t.tx_id) AS total_transactions,\n  ROUND(SUM(t.amount), 2) AS total_volume_etb\nFROM dw_bank_branches b\nJOIN dw_transactions t ON b.branch_id = t.branch_id\nWHERE t.status = 'COMPLETED'\nGROUP BY b.branch_name ORDER BY total_volume_etb DESC LIMIT 4;",
    output: [
      { name: 'HQ Main Branch', revenue: 45.8, growth: 88 },
      { name: 'Bole District', revenue: 38.2, growth: 76 },
      { name: 'Kazanchis Biz Hub', revenue: 29.5, growth: 64 },
      { name: 'Adama Regional', revenue: 21.0, growth: 52 },
    ]
  },
  {
    name: "Python: Automated Cleaning Script",
    code: "import pandas as pd\ndf = pd.read_sql('SELECT * FROM dw_uncleaned_leads', engine)\ndf_clean = df.dropna(subset=['account_no']).assign(\n    tx_volume_usd = lambda x: x['tx_volume_etb'] / 115.0\n)\nprint('Cleaned rows:', len(df_clean))",
    output: [
      { name: 'Raw Ingestion', revenue: 100, growth: 100 },
      { name: 'Null Stripped', revenue: 98, growth: 98 },
      { name: 'ETB Sanitized', revenue: 95, growth: 95 },
      { name: 'Final DW Load', revenue: 95, growth: 95 },
    ]
  }
];

export const SkillsSlide: React.FC<SkillsSlideProps> = ({ onSelectSlide, theme }) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'chart' | 'sandbox'>('chart');
  const [executed, setExecuted] = useState(false);

  const activePreset = queryPresets[activePresetIndex];

  // Flatten all skills for chart visualization
  const allSkillsData = skillCategories.flatMap(cat => cat.skills).slice(0, 8);

  const handleRunQuery = () => {
    setExecuted(true);
    setTimeout(() => setExecuted(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-4 md:px-12 lg:px-20 max-w-7xl mx-auto py-4">
      <div className="space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700/30 gap-2"
        >
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <span>SLIDE 05</span>
              <span>•</span>
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-0.5">
              Analytics & Tooling
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'chart'
                  ? theme === 'dark'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-blue-600 text-white shadow-md'
                  : theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Skill Visualizer
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'sandbox'
                  ? theme === 'dark'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-blue-600 text-white shadow-md'
                  : theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              SQL/DAX Sandbox
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Skill Visualizer & Skill Categories */}
        {activeTab === 'chart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Chart Box (7 cols) */}
            <div className={`lg:col-span-7 p-5 rounded-2xl border shadow-xl ${
              theme === 'dark' ? 'bg-[#121824] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide">Proficiency Breakdown (%)</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Core Analytics & Data Eng</span>
              </div>

              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allSkillsData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                    <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={130} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#0B0F17' : '#ffffff',
                        borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: theme === 'dark' ? '#f8fafc' : '#0f172a'
                      }}
                      formatter={(val) => [`${val}% Mastery`, 'Level']}
                    />
                    <Bar dataKey="level" radius={[0, 6, 6, 0]}>
                      {allSkillsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index < 3 ? (theme === 'dark' ? '#f59e0b' : '#2563eb') : (theme === 'dark' ? '#10b981' : '#3b82f6')}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categories List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#121824] border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <h4 className="text-xs font-mono font-bold uppercase text-amber-500 mb-2">
                    {cat.category}
                  </h4>
                  <div className="space-y-2">
                    {cat.skills.map((s, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">{s.name}</span>
                          <span className="font-mono text-[11px] text-slate-400">{s.level}%</span>
                        </div>
                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
                        }`}>
                          <div
                            className={`h-full rounded-full ${
                              theme === 'dark' ? 'bg-amber-400' : 'bg-blue-600'
                            }`}
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: SQL/DAX Interactive Sandbox */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Code Editor (7 cols) */}
            <div className={`lg:col-span-7 p-5 rounded-2xl border shadow-xl flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#121824] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div>
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700/30 gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-xs font-bold uppercase">SQL / DAX Transformation Preset</span>
                  </div>

                  {/* Preset Selector */}
                  <div className="flex gap-1.5">
                    {queryPresets.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePresetIndex(i)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                          activePresetIndex === i
                            ? theme === 'dark' ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'
                            : theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Preset 0{i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Surface */}
                <div className="mt-4">
                  <div className="text-[11px] font-mono text-amber-400 font-bold mb-1.5">
                    {activePreset.name}
                  </div>
                  <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border ${
                    theme === 'dark' ? 'bg-[#0B0F17] text-amber-200 border-slate-800' : 'bg-slate-900 text-amber-300 border-slate-800'
                  }`}>
                    <code>{activePreset.code}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-700/30">
                <span className="text-[11px] text-slate-400 font-mono">Simulate execution on DW Schema</span>
                <button
                  onClick={handleRunQuery}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-all shadow-md ${
                    executed
                      ? 'bg-emerald-500 text-slate-950'
                      : theme === 'dark'
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {executed ? 'EXECUTED!' : 'RUN QUERY'}
                </button>
              </div>
            </div>

            {/* Right: Output Visualization Result (5 cols) */}
            <div className={`lg:col-span-5 p-5 rounded-2xl border shadow-xl ${
              theme === 'dark' ? 'bg-[#121824] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/30">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold uppercase">Visual Query Result</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">STATUS: 200 OK</span>
              </div>

              <div className="mt-4 h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activePreset.output}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#0B0F17' : '#ffffff',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        fontSize: '11px'
                      }}
                    />
                    <Bar dataKey="revenue" fill={theme === 'dark' ? '#f59e0b' : '#2563eb'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                ⚡ Data aggregation pipeline finished in 14ms. Ready for Power BI visual reporting export.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
