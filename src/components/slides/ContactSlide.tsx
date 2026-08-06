import React from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { contactInfo } from "../../data/resumeData";
import { ThemeMode } from "../../types";

interface ContactSlideProps {
  theme: ThemeMode;
}

export const ContactSlide: React.FC<ContactSlideProps> = ({ theme }) => {
  const socialChannels = [
    {
      name: "Telegram",
      label: "@danielyetesha",
      url: "https://t.me/Danyet",
      description: "Direct messaging & instant queries",
      icon: MessageCircle,
    },
    {
      name: "LinkedIn",
      label: "Daniel Yetesha",
      url: "https://linkedin.com/in/daniel-yetesha",
      description: "Professional experience & endorsements",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      label: "github.com/danielyetesha",
      url: "https://github.com/danielyetesha",
      description: "Code repositories & analytics scripts",
      icon: Github,
    },
    {
      name: "Direct Email",
      label: contactInfo.email,
      url: `mailto:${contactInfo.email}`,
      description: "Primary channel for project inquiries",
      icon: Mail,
    },
    {
      name: "Direct Phone",
      label: contactInfo.phone,
      url: `tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`,
      description: "Business hours (GMT+3)",
      icon: Phone,
    },
  ];

  return (
    <div
      className={`w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-4 sm:py-6 transition-colors duration-300 overflow-y-auto lg:overflow-hidden ${
        theme === "dark"
          ? "bg-black text-neutral-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-5xl w-full space-y-6 my-auto">
        {/* Main Grid: Left Side Description & Details, Right Side Social Connect Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Heading, Bio & Direct Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 space-y-5 text-center lg:text-left"
          >
            {/* Header Title with Underline */}
            <div className="space-y-2">
              <div className="inline-block relative">
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider">
                  CONTACT
                </h1>
                <div
                  className={`h-1.5 w-16 mt-1.5 rounded-full mx-auto lg:mx-0 ${
                    theme === "dark" ? "bg-white" : "bg-slate-900"
                  }`}
                />
              </div>

              <div
                className={`font-mono text-xs sm:text-sm pt-1 ${
                  theme === "dark" ? "text-neutral-400" : "text-slate-600"
                }`}
              >
                {contactInfo.email}
              </div>
            </div>

            {/* Intro Paragraph */}
            <p
              className={`text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                theme === "dark" ? "text-neutral-300" : "text-slate-700"
              }`}
            >
              Feel free to reach out for business intelligence consultation,
              data science collaboration, automated financial reporting
              pipelines, or general inquiries.
            </p>

            {/* Address, Phone, Email Stack */}
            <div className="space-y-4 pt-2 max-w-md mx-auto lg:mx-0 font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
                  Address
                </div>
                <div className="text-xs sm:text-sm font-semibold">
                  {contactInfo.location}
                </div>
                <div
                  className={`text-[11px] ${theme === "dark" ? "text-neutral-500" : "text-slate-500"}`}
                >
                  Bank of Abyssinia Headquarters
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
                  Phone
                </div>
                <a
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className={`text-xs sm:text-sm font-semibold hover:underline block ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] uppercase font-bold tracking-widest text-neutral-400">
                  E-mail
                </div>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className={`text-xs sm:text-sm font-semibold hover:underline block ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Borderless Dark Card with Telegram, LinkedIn, GitHub, Email, Phone */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div
              className={`p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm transition-all ${
                theme === "dark"
                  ? "bg-[#121212] text-white"
                  : "bg-white text-slate-900 shadow-md"
              }`}
            >
              <div className="space-y-0.5 border-b border-neutral-800/60 pb-3">
                <h2 className="text-lg font-black uppercase tracking-wider">
                  CONNECT & SOCIALS
                </h2>
                <p
                  className={`text-xs font-mono ${theme === "dark" ? "text-neutral-400" : "text-slate-500"}`}
                >
                  Click any platform below to connect directly with Daniel
                </p>
              </div>

              {/* Social Channels Stack */}
              <div className="space-y-2.5">
                {socialChannels.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 sm:p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all group ${
                        theme === "dark"
                          ? "bg-[#1a1a1a] hover:bg-[#222222] text-neutral-200 hover:text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${
                            theme === "dark"
                              ? "bg-neutral-800 text-white"
                              : "bg-slate-200 text-slate-900"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            {item.name}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold group-hover:underline">
                            {item.label}
                          </div>
                        </div>
                      </div>

                      <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>

              <div
                className={`pt-1 text-center text-[11px] font-mono ${
                  theme === "dark" ? "text-neutral-500" : "text-slate-400"
                }`}
              >
                Available for remote & hybrid opportunities in Ethiopia &
                globally
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
