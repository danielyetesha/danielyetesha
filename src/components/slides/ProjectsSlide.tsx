import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { bankProjects } from "../../data/resumeData";
import { ThemeMode } from "../../types";

interface ProjectsSlideProps {
  theme: ThemeMode;
}

export const ProjectsSlide: React.FC<ProjectsSlideProps> = ({ theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  const projectsCount = bankProjects.length;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectsCount);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, projectsCount]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsCount) % projectsCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsCount);
  };

  const activeProject = bankProjects[activeIndex];

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-6 transition-colors duration-300 select-none overflow-y-auto overflow-x-hidden ${
        theme === "dark"
          ? "bg-black text-neutral-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 3D Carousel Container */}
      <div
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        className="relative max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center overflow-visible"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full max-w-3xl h-[260px] sm:h-[340px] md:h-[380px] flex items-center justify-center overflow-visible">
          <AnimatePresence mode="popLayout">
            {bankProjects.map((project, index) => {
              let offset = index - activeIndex;
              if (offset < -Math.floor(projectsCount / 2))
                offset += projectsCount;
              if (offset > Math.floor(projectsCount / 2))
                offset -= projectsCount;

              if (Math.abs(offset) > 2) return null;

              const isActive = offset === 0;

              const rotateY = offset * -28;
              const translateX = `${offset * 58}%`;
              const scale = isActive ? 1.05 : 0.82 - Math.abs(offset) * 0.1;
              const opacity = isActive ? 1 : 0.5 - Math.abs(offset) * 0.15;
              const zIndex = 30 - Math.abs(offset) * 10;

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      navigate(`/projects/${project.id}`);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.7, rotateY: offset * -40 }}
                  animate={{
                    opacity,
                    scale,
                    rotateY,
                    x: translateX,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.8,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute cursor-pointer w-[260px] sm:w-[340px] md:w-[400px] aspect-[4/3] rounded-3xl overflow-hidden shadow-md transition-shadow duration-300 group ${
                    isActive
                      ? theme === "dark"
                        ? "shadow-xl bg-[#141414]"
                        : "shadow-lg bg-white"
                      : theme === "dark"
                        ? "filter brightness-75 bg-[#101010]"
                        : "filter brightness-90 bg-slate-100 shadow-sm"
                  }`}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      theme === "dark"
                        ? "from-black via-black/40 to-transparent"
                        : "from-slate-900/90 via-slate-900/30 to-transparent"
                    }`}
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold ${
                        theme === "dark"
                          ? "bg-black/80 text-white"
                          : "bg-white/90 text-slate-900"
                      }`}
                    >
                      {project.category}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-800/90 text-neutral-200">
                      {project.status}
                    </span>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left z-10 space-y-0.5">
                    <h3 className="text-sm sm:text-base font-black text-white group-hover:underline transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-200 line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={handlePrev}
            title="Previous Project"
            className={`absolute left-0 sm:left-2 z-40 p-3 rounded-full transition-all shadow-md ${
              theme === "dark"
                ? "bg-black/80 text-white hover:bg-neutral-800"
                : "bg-white/90 text-slate-800 hover:bg-slate-200"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            title="Next Project"
            className={`absolute right-0 sm:right-2 z-40 p-3 rounded-full transition-all shadow-md ${
              theme === "dark"
                ? "bg-black/80 text-white hover:bg-neutral-800"
                : "bg-white/90 text-slate-800 hover:bg-slate-200"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button & Info */}
        <div className="text-center space-y-3 pt-4 sm:pt-6 z-20">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-widest">
            MY PROJECTS
          </h2>

          <p
            className={`text-xs font-mono uppercase tracking-wider max-w-lg mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-slate-500"
            }`}
          >
            DANIEL YETESHA • DATA ANALYST & SCIENTIST (BANK OF ABYSSINIA)
          </p>

          <div className="pt-1">
            <button
              onClick={() => navigate(`/projects/${activeProject.id}`)}
              className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-sm inline-flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>VIEW PROJECT DETAILS</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            {bankProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? theme === "dark"
                      ? "w-7 h-1.5 bg-white"
                      : "w-7 h-1.5 bg-slate-900"
                    : theme === "dark"
                      ? "w-1.5 h-1.5 bg-neutral-700 hover:bg-neutral-500"
                      : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`max-w-5xl mx-auto w-full pt-3 border-t flex flex-wrap items-center justify-between text-xs font-mono ${
          theme === "dark"
            ? "border-neutral-800/60 text-neutral-500"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <div>
          Showing {activeIndex + 1} of {projectsCount} Bank Projects
        </div>
        <div>Click card or press VIEW PROJECT DETAILS</div>
      </div>
    </div>
  );
};
