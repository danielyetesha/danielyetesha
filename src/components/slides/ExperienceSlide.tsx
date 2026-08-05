import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, ArrowRight } from 'lucide-react';
import { workExperiences, educationList, skillCategories } from '../../data/resumeData';
import { ThemeMode } from '../../types';

interface ExperienceSlideProps {
  onOpenResume: () => void;
  theme: ThemeMode;
}

export const ExperienceSlide: React.FC<ExperienceSlideProps> = ({ onOpenResume, theme }) => {
  const navigate = useNavigate();

  const statMetrics = [
    { label: 'Banking Analytics Exp', value: '4+ Years', detail: 'Bank of Abyssinia HQ' },
    { label: 'Production Dashboards', value: '12+ Systems', detail: 'Power BI & SQL Warehousing' },
    { label: 'Academic Standing', value: '3.89 GPA', detail: 'BSc Computer Science' },
    { label: 'Data Reconciliation Rate', value: '99.8%', detail: 'Automated Pipeline Accuracy' },
  ];

  return (
    <div className={`w-full min-h-[calc(100vh-5rem)] px-6 sm:px-12 lg:px-20 py-10 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-neutral-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Top Resume Header */}
        <div className={`flex flex-wrap items-end justify-between gap-6 pb-6 border-b ${
          theme === 'dark' ? 'border-neutral-800/60' : 'border-slate-200'
        }`}>
          <div className="space-y-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
              theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
            }`}>
              Curriculum Vitae • Daniel Yetesha
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              RESUME & EXPERIENCE
            </h1>
            <p className={`text-sm sm:text-base font-light max-w-xl ${
              theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
            }`}>
              Data Analyst & Scientist specializing in financial data intelligence, enterprise analytics, and ETL pipeline automation.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenResume}
              className={`px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </button>
          </div>
        </div>

        {/* Minimal Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statMetrics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className={`p-6 rounded-2xl transition-all ${
                theme === 'dark'
                  ? 'bg-[#121212] text-white'
                  : 'bg-white text-slate-900 shadow-sm'
              }`}
            >
              <div className={`text-[11px] font-mono font-bold uppercase ${
                theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
              }`}>
                {stat.label}
              </div>
              <div className="text-2xl sm:text-4xl font-black pt-2 pb-1 tracking-tight">
                {stat.value}
              </div>
              <div className={`text-[11px] font-mono ${
                theme === 'dark' ? 'text-neutral-500' : 'text-slate-400'
              }`}>
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION: WORK EXPERIENCE (ALTERNATING SIDE-BY-SIDE LAYOUT INSPIRED BY ATTACHED DESIGN) */}
        <div className="space-y-12">
          <div className="space-y-1 border-b border-neutral-800/60 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">
              WORK EXPERIENCE
            </h2>
            <p className={`text-xs font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Click LEARN MORE on any role to view detailed tasks, deliverables, and learned insights
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {workExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
                      <img
                        src={exp.imageUrl}
                        alt={exp.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        theme === 'dark'
                          ? 'from-black/80 via-black/30 to-transparent'
                          : 'from-slate-900/60 via-transparent to-transparent'
                      }`} />
                      
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                          theme === 'dark' ? 'bg-black/80 text-white' : 'bg-white/90 text-slate-900'
                        }`}>
                          {exp.company}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-900/90 text-neutral-200">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Content Column */}
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Index Number */}
                    <div className="text-4xl sm:text-6xl font-mono font-black tracking-tighter text-neutral-400 opacity-60">
                      0{index + 1}
                    </div>

                    {/* Title & Company */}
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                        {exp.title}
                      </h3>
                      <div className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                      }`}>
                        {exp.company} • {exp.location}
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className={`text-sm sm:text-base font-light leading-relaxed max-w-xl ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
                    }`}>
                      {exp.summary}
                    </p>

                    {/* Key Skills Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.skills.slice(0, 5).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-medium ${
                            theme === 'dark'
                              ? 'bg-[#181818] text-neutral-300'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: » LEARN MORE */}
                    <div className="pt-3">
                      <button
                        onClick={() => navigate(`/resume/${exp.id}`)}
                        className={`inline-flex items-center gap-2 text-xs font-mono font-black uppercase tracking-widest transition-all group ${
                          theme === 'dark'
                            ? 'text-white hover:text-neutral-300'
                            : 'text-slate-900 hover:text-slate-600'
                        }`}
                      >
                        <span>» LEARN MORE & EXPLORE DETAILS</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Technical Stack & Skills Grid */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-neutral-800/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
              TECHNICAL STACK & SKILLS
            </h2>
            <p className={`text-xs font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Business intelligence, data engineering, and predictive modeling toolkit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-3xl space-y-5 ${
                  theme === 'dark'
                    ? 'bg-[#121212] text-white'
                    : 'bg-white text-slate-900 shadow-sm'
                }`}
              >
                <div className="border-b border-neutral-800/60 pb-3">
                  <h3 className="text-base font-black uppercase">{cat.category}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span>{skill.name}</span>
                        <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'
                      }`}>
                        <div
                          style={{ width: `${skill.level}%` }}
                          className={`h-full rounded-full ${
                            theme === 'dark' ? 'bg-white' : 'bg-slate-900'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-neutral-800/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
              EDUCATION & DEGREES
            </h2>
            <p className={`text-xs font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
              Academic qualifications & ongoing research
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className={`p-6 sm:p-7 rounded-3xl space-y-4 ${
                  theme === 'dark'
                    ? 'bg-[#121212] text-white'
                    : 'bg-white text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className={`text-xs font-mono font-bold uppercase ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'
                    }`}>
                      {edu.institution} • {edu.location}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black pt-0.5">{edu.degree}</h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    theme === 'dark'
                      ? 'bg-[#1c1c1c] text-neutral-200'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {edu.duration}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
                }`}>
                  {edu.description}
                </p>

                {edu.gpa && (
                  <div className="pt-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-slate-100 text-slate-900'
                    }`}>
                      Cumulative GPA: {edu.gpa}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
