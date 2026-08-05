import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, Phone, Mail, MapPin, Globe, GraduationCap, Building2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { contactInfo, workExperiences, educationList, skillCategories } from '../data/resumeData';
import { ThemeMode } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, theme }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const resumeText = `${contactInfo.name} - ${contactInfo.title}
Phone: ${contactInfo.phone} | Email: ${contactInfo.email} | Location: ${contactInfo.location}
Website: ${contactInfo.website}

ABOUT ME
${contactInfo.aboutMe}

EDUCATION
1. ${educationList[0].degree} - ${educationList[0].institution} (${educationList[0].duration})
   Thesis: ${educationList[0].thesisTitle}
2. ${educationList[1].degree} - ${educationList[1].institution} (GPA: ${educationList[1].gpa}, ${educationList[1].duration})

EXPERIENCE
1. ${workExperiences[0].title} - ${workExperiences[0].company} (${workExperiences[0].duration})
2. ${workExperiences[1].title} - ${workExperiences[1].company} (${workExperiences[1].duration})
`;
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
        theme === 'dark' ? 'bg-[#0a0a0a] border-neutral-800 text-neutral-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header Bar */}
        <div className={`p-4 md:p-6 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-neutral-800 bg-black' : 'border-slate-200 bg-slate-50'
        }`}>
          <div>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Daniel Yetesha — Curriculum Vitae
            </h2>
            <p className="text-xs text-slate-400">Official Data Analyst & Scientist Resume</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Text!' : 'Copy Info'}
            </button>

            <button
              onClick={handlePrint}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                theme === 'dark'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 font-sans">
          {/* Header Block */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-[#141C2E]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase">{contactInfo.name}</h1>
            <p className={`text-base font-semibold mt-1 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
              {contactInfo.title}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{contactInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>{contactInfo.website}</span>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-widest pb-2 border-b ${
              theme === 'dark' ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-blue-600'
            }`}>
              About Me
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
              {contactInfo.aboutMe}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-widest pb-2 border-b ${
              theme === 'dark' ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-blue-600'
            }`}>
              Work Experience
            </h3>
            <div className="mt-4 space-y-6">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="text-base font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-500" />
                      {exp.title} — <span className={theme === 'dark' ? 'text-amber-300' : 'text-blue-700'}>{exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{exp.location} | {exp.duration}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-400 pl-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.skills.map((s, i) => (
                      <span key={i} className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        theme === 'dark' ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-widest pb-2 border-b ${
              theme === 'dark' ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-blue-600'
            }`}>
              Education & Academic Achievements
            </h3>
            <div className="mt-4 space-y-5">
              {educationList.map((edu) => (
                <div key={edu.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="text-base font-bold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      {edu.degree} — <span className={theme === 'dark' ? 'text-amber-300' : 'text-blue-700'}>{edu.institution}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{edu.location} | {edu.duration}</span>
                  </div>
                  {edu.gpa && (
                    <div className="text-xs font-bold text-emerald-500 font-mono">GPA: {edu.gpa}</div>
                  )}
                  <p className="text-xs text-slate-400 leading-relaxed">{edu.description}</p>
                  {edu.thesisTitle && (
                    <div className={`p-2.5 rounded-lg text-xs font-mono border ${
                      theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}>
                      <strong className="text-amber-500">Thesis Title:</strong> "{edu.thesisTitle}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Expertise */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-widest pb-2 border-b ${
              theme === 'dark' ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-blue-600'
            }`}>
              Key Skills & Tooling
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {skillCategories.map((cat, i) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#141C2E]/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className="font-bold text-amber-400 mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded font-mono ${
                        theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                      }`}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
