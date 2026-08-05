import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Building2, Calendar, Layers, Tag, ShieldCheck } from 'lucide-react';
import { bankProjects } from '../../data/resumeData';
import { ThemeMode } from '../../types';

interface ProjectDetailSlideProps {
  theme: ThemeMode;
}

export const ProjectDetailSlide: React.FC<ProjectDetailSlideProps> = ({ theme }) => {
  const { id } = useParams<{ id: string }>();

  const project = bankProjects.find((p) => String(p.id) === String(id)) || bankProjects[0];

  return (
    <div className={`w-full min-h-[calc(100vh-5rem)] px-6 sm:px-12 lg:px-16 py-8 sm:py-12 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-neutral-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="w-full space-y-8 max-w-7xl mx-auto">
        {/* Navigation & Header Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-6 ${
          theme === 'dark' ? 'border-neutral-800/60' : 'border-slate-200'
        }`}>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              theme === 'dark'
                ? 'bg-[#141414] text-neutral-300 hover:text-white hover:bg-neutral-800'
                : 'bg-white text-slate-700 hover:text-slate-900 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={`px-3 py-1 rounded-full font-bold uppercase ${
              theme === 'dark' ? 'bg-[#181818] text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              Bank of Abyssinia
            </span>
            <span className={theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}>
              Project ID: #{project.id}
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Image Banner */}
            {project.imageUrl && (
              <div className="w-full h-72 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden relative shadow-md group">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-black uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-black/80 text-white backdrop-blur-md">
                    ● {project.status}
                  </span>
                </div>
              </div>
            )}

            {/* Title & Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
                {project.title}
              </h1>

              <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${
                theme === 'dark' ? 'text-neutral-400' : 'text-slate-600'
              }`}>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Bank of Abyssinia HQ</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {project.date || '2023 - Present'}</span>
              </div>
            </div>

            {/* Business Value Overview */}
            <div className={`p-8 rounded-3xl space-y-3 ${
              theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
            }`}>
              <h2 className="text-xs font-mono uppercase font-bold text-neutral-400 tracking-wider">
                Executive Overview & Problem Statement
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed font-light ${
                theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Key Features / Outputs */}
            <div className={`p-8 rounded-3xl space-y-6 ${
              theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
            }`}>
              <h2 className="text-xs font-mono uppercase font-bold text-neutral-400 tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Key Features & Functional Modules</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(project.keyFeatures || project.keyOutputs).map((out, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm ${
                      theme === 'dark'
                        ? 'bg-[#1a1a1a] text-neutral-300'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Impact Box */}
            {project.metrics && (
              <div className={`p-6 rounded-3xl space-y-3 ${
                theme === 'dark'
                  ? 'bg-[#181818] text-white'
                  : 'bg-slate-900 text-white shadow-md'
              }`}>
                <div className="text-xs font-mono uppercase font-bold text-neutral-400">
                  Measured Business Impact
                </div>
                <div className="text-xl sm:text-2xl font-black leading-tight">
                  {project.metrics}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className={`p-6 rounded-3xl space-y-4 ${
              theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
            }`}>
              <h3 className="text-xs font-mono uppercase font-bold text-neutral-400 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Core Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium ${
                      theme === 'dark'
                        ? 'bg-[#1c1c1c] text-neutral-200'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.librariesAndTools && project.librariesAndTools.length > 0 && (
                <div className="pt-3 border-t border-neutral-800/60 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase font-bold">
                    Libraries & Internal Tools
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.librariesAndTools.map((lib, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono ${
                          theme === 'dark'
                            ? 'bg-[#181818] text-neutral-300'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Environment */}
            <div className={`p-6 rounded-3xl space-y-3 ${
              theme === 'dark' ? 'bg-[#121212]' : 'bg-white shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-neutral-800 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-400 font-bold uppercase">Deployment Environment</div>
                  <div className="text-sm font-bold">Bank of Abyssinia Core Systems</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Data Warehouse & Executive BI
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                to="/projects"
                className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Other Projects</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
