import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Building2, Calendar, MapPin, CheckCircle2, Layers, BookOpen, Award, Wrench } from 'lucide-react';
import { workExperiences } from '../../data/resumeData';
import { ThemeMode } from '../../types';

interface ExperienceDetailSlideProps {
  theme: ThemeMode;
}

export const ExperienceDetailSlide: React.FC<ExperienceDetailSlideProps> = ({ theme }) => {
  const { id } = useParams<{ id: string }>();

  const exp = workExperiences.find((item) => String(item.id) === String(id)) || workExperiences[0];

  return (
    <div className={`w-full min-h-[calc(100vh-5rem)] px-6 sm:px-12 lg:px-20 py-8 sm:py-12 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-neutral-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="w-full space-y-8 max-w-6xl mx-auto">
        
        {/* Navigation & Header Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-6 ${
          theme === 'dark' ? 'border-neutral-800/60' : 'border-slate-200'
        }`}>
          <Link
            to="/resume"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              theme === 'dark'
                ? 'bg-[#141414] text-neutral-300 hover:text-white hover:bg-neutral-800'
                : 'bg-white text-slate-700 hover:text-slate-900 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Resume</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={`px-3 py-1 rounded-full font-bold uppercase ${
              theme === 'dark' ? 'bg-[#181818] text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              Experience #{exp.indexNumber || '01'}
            </span>
            <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>
              {exp.duration}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Hero Banner Image */}
          {exp.imageUrl && (
            <div className="w-full h-64 sm:h-80 md:h-[380px] rounded-3xl overflow-hidden relative shadow-md group">
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-white">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
                    {exp.company}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                    {exp.title}
                  </h1>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-black uppercase tracking-wider">
                  {exp.duration}
                </span>
              </div>
            </div>
          )}

          {/* Role Snapshot & Location Meta */}
          <div className={`p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs ${
            theme === 'dark' ? 'bg-[#121212] text-neutral-300' : 'bg-white text-slate-700 shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-neutral-400" />
              <span className="font-bold">{exp.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span>{exp.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Executive Summary Paragraph */}
        <div className={`p-8 rounded-3xl space-y-3 ${
          theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
        }`}>
          <h2 className="text-xs font-mono uppercase font-bold text-neutral-400 tracking-wider">
            Executive Summary & Role Focus
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed font-light ${
            theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
          }`}>
            {exp.summary}
          </p>
        </div>

        {/* 2x2 Grid of Rich Details: What I Built, What I Learned, What I Achieved, Key Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Box 1: WHAT I BUILT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`p-7 rounded-3xl space-y-4 ${
              theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-slate-200 text-slate-900'}`}>
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider">
                WHAT I BUILT & DEVELOPED
              </h3>
            </div>
            <div className="space-y-3">
              {(exp.whatIBuilt || exp.responsibilities.slice(0, 4)).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Box 2: WHAT I LEARNED */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`p-7 rounded-3xl space-y-4 ${
              theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-slate-200 text-slate-900'}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider">
                WHAT I LEARNED & MASTERED
              </h3>
            </div>
            <div className="space-y-3">
              {(exp.whatILearned || exp.skills).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Box 3: WHAT I ACHIEVED */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`p-7 rounded-3xl space-y-4 ${
              theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-slate-200 text-slate-900'}`}>
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider">
                KEY RESULTS & IMPACT
              </h3>
            </div>
            <div className="space-y-3">
              {(exp.whatIAchieved || exp.responsibilities.slice(3, 7)).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-bold font-mono">▸</span>
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Box 4: TASKS DONE & RESPONSIBILITIES */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className={`p-7 rounded-3xl space-y-4 ${
              theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-slate-200 text-slate-900'}`}>
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider">
                DAILY TASKS & EXECUTIONS
              </h3>
            </div>
            <div className="space-y-3">
              {(exp.tasksDone || exp.responsibilities).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="text-neutral-500 font-mono text-[11px] font-bold">0{idx + 1}</span>
                  <span className={theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Tech Stack Pills & Bottom Return Button */}
        <div className={`p-8 rounded-3xl space-y-6 ${
          theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
        }`}>
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase font-bold text-neutral-400 tracking-wider">
              Technologies & Tools Mastered During This Role
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {exp.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono font-medium ${
                    theme === 'dark'
                      ? 'bg-[#1c1c1c] text-neutral-200'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800/60 flex justify-between items-center">
            <Link
              to="/resume"
              className={`px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Resume Experience</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
