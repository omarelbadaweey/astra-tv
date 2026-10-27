
/* eslint-disable no-unused-vars */
import React from "react";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const ProgramsSection = ({ lang = "en" }) => {
  const isAr = lang === "ar";

  // النصوص الثابتة في السكشن
  const texts = {
    titleStart: isAr ? "تطبيقات " : "Streaming ",
    titleHighlight: isAr ? "البث" : "Apps",
    subtitle: isAr
      ? "قم بتحميل التطبيق المناسب لجهازك واستمتع بتجربة بث استثنائية وعالية الجودة"
      : "Download the suitable app for your device and enjoy an exceptional, high-quality streaming experience",
    downloadBtn: isAr ? "تحميل التطبيق" : "Download App",
    noCode: isAr ? "لا يحتاج لكود" : "No Code Needed",
  };

  const programs = [
    {
      id: 1,
      name: isAr ? "تطبيق أندرويد" : "Android App",
      badge: isAr ? "أندرويد" : "Android",
      description: isAr ? "للبث على أجهزة أندرويد" : "To stream on Android devices",
      downloadUrl: "https://aftv.news/2169095",
      textcode:isAr ? "كود التحميل من Downloader" : "Download code from Downloader",
      code: "9348503",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      gradient: "from-orange-500 to-amber-500",
      link: "https://aftv.news/2169095",
    },
    {
      id: 2,
      name: isAr ? "تطبيق آيفون" : "iPhone App",
      badge: isAr ? "آيفون" : "iPhone",
      description: isAr ? "للبث على أجهزة iOS" : "To stream on iOS devices",
      downloadUrl: "https://apps.apple.com/eg/app/var-player-unlock-your-world/id6477530321",
        textcode:isAr ? "كود السيرفر " : "Server Code",
      code: "4010",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      gradient: "from-orange-400 to-orange-600",
      link: "https://apps.apple.com/eg/app/var-player-unlock-your-world/id6477530321",
    },
  ];

  return (
    <section
      id="programs"
      className="py-20 bg-black relative border-b border-orange-500/10 overflow-hidden"
    >
      {/* تأثيرات الإضاءة في الخلفية */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 rtl:left-auto rtl:right-10 w-72 h-72 bg-orange-500 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 rtl:right-auto rtl:left-10 w-72 h-72 bg-amber-500 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {texts.titleStart}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              {texts.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            {texts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 max-w-6xl mx-auto">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative bg-gray-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-orange-500/20 hover:border-orange-500 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-40 mix-blend-multiply`}
                ></div>
                {/* ضبط مكان الـ Badge ليتوافق مع اللغة */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                  <span className="bg-black/70 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {program.badge}
                  </span>
                </div>
              </div>

              {/* content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {program.name}
                </h3>
                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* active code */}
                {program.code && (
                  <div className="mb-6 p-4 bg-black/50 rounded-xl border border-orange-500/10 backdrop-blur-sm">
                                                        <div className="text-orange-400 text-sm mb-2 font-semibold">
                      {program.textcode}
                    </div>
                    <div className="text-orange-400 text-sm mb-2 font-semibold">
                      {texts.codeLabel}
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-gray-200 font-mono text-lg bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                        {program.code}
                      </code>
                      <a
                        href={program.link}
                        className="text-gray-500 hover:text-orange-400 transition-colors duration-300 p-2"
                      >
                        <FaDownload className="text-lg" />
                      </a>
                    </div>
                  </div>
                )}

                {/* download button */}
                <a
                  href={program.downloadUrl}
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-orange-500 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 group/btn text-lg shadow-lg hover:shadow-orange-500/25"
                >
                  <span>{texts.downloadBtn}</span>
                  <FaDownload className="group-hover/btn:-translate-y-1 transition-transform duration-300 text-xl" />
                </a>
              </div>

              {/* effect */}
              {/* ضبط نقطة البداية لتأثير الخط السفلي بناءً على اللغة */}
              <div className="absolute bottom-0 left-0 right-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right"></div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProgramsSection;