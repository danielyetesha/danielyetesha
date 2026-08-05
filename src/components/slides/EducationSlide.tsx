import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, FileCode, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { educationList } from '../../data/resumeData';
import { ThemeMode } from '../../types';

interface EducationSlideProps {
  onSelectSlide: (index: number) => void;
  theme: ThemeMode;
}

export const EducationSlide: React.FC<EducationSlideProps> = ({ onSelectSlide, theme }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-4 md:px-12 lg:px-20 max-w-7xl mx-auto py-4">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700/30 gap-2"
        >
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <span>SLIDE 04</span>
              <span>•</span>
              <span>ACADEMIC DEGREES & RESEARCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
              Education & Qualifications
            </h2>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            EQF Level 7 Postgraduate Qualified
          </div>
        </motion.div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between relative overflow-hidden ${
                theme === 'dark' ? 'bg-[#121824] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/30">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    edu.gpa
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-600/10 text-blue-500 border border-blue-600/30'
                  }`}>
                    {edu.gpa ? <Award className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wide">{edu.institution}</h3>
                    <p className="text-xs font-mono text-slate-400">{edu.location} • {edu.duration}</p>
                  </div>
                </div>

                {edu.gpa && (
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 uppercase">GRADUATION GPA</span>
                    <div className="text-xl font-black text-amber-400 font-mono flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {edu.gpa}
                    </div>
                  </div>
                )}
              </div>

              {/* Degree Title & Description */}
              <div className="mt-4 space-y-3">
                <h4 className={`text-base font-extrabold uppercase ${
                  theme === 'dark' ? 'text-amber-300' : 'text-blue-700'
                }`}>
                  {edu.degree}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {edu.description}
                </p>

                {/* Thesis Box for MSc */}
                {edu.thesisTitle && (
                  <div className={`p-3.5 rounded-xl border mt-3 ${
                    theme === 'dark' ? 'bg-[#0B0F17] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 mb-1">
                      <FileCode className="w-4 h-4" />
                      MSc Postgraduate Thesis Research:
                    </div>
                    <p className="text-xs font-mono italic text-slate-300 leading-relaxed">
                      "{edu.thesisTitle}"
                    </p>
                  </div>
                )}

                {/* Achievements List */}
                {edu.achievements && (
                  <div className="mt-3 pt-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-2 block">
                      Academic Highlights & Coursework:
                    </span>
                    <div className="space-y-1.5">
                      {edu.achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{edu.isCurrent ? 'Postgraduate Candidate' : 'Completed Degree'}</span>
                <span className="text-amber-500 font-bold">
                  {edu.gpa ? 'Honors distinction' : 'EQF Level 7'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
