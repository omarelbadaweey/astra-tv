import React, { useState } from "react";
import { FaWhatsapp, FaGlobe, FaChevronDown, FaTelegram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onLanguageChange, currentLang = "en" }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const languages = [
    { code: "en", label: "English"  },
    { code: "ar", label: "العربية"},
  ];

  const handleLanguageChange = (langCode) => {
    if (onLanguageChange) onLanguageChange(langCode);
    setIsLangDropdownOpen(false);
  };

  const isRtl = currentLang === "ar";

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-black border-b border-orange-500/30 sticky top-0 z-50 shadow-md shadow-orange-500/5 backdrop-blur-md bg-opacity-95"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="h-14 flex items-center justify-between">
          
          {/* Logo Section */}
          <div onClick={()=> navigate("/")} className="cursor-pointer overflow-hidden h-14 w-16  border border-orange-500/40 rounded-xl flex items-center justify-center p-1 bg-black shadow-sm shadow-orange-500/20">
            <img
              src="/logo.jpg"
              className="w-full h-full object-cover rounded-lg"
              alt="Logo"
            />
          </div>

          {/* Controls Section (Language & WhatsApp) */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="cursor-pointer flex items-center space-x-2.5 rtl:space-x-reverse bg-gray-900/90 hover:bg-gray-800 border border-orange-500/80 rounded-xl px-3.5 py-2 text-white transition-all duration-300 shadow-sm hover:border-orange-400"
              >
                <FaGlobe className="text-orange-400 text-base" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {currentLang}
                </span>
                <FaChevronDown
                  className={`text-orange-400 text-xs transition-transform duration-300 ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLangDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 min-w-[130px] bg-gray-900 border border-orange-500/50 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`cursor-pointer flex items-center space-x-2.5 rtl:space-x-reverse w-full px-4 py-2.5 text-sm transition-all duration-200 ${
                        currentLang === lang.code
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold"
                          : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                      }`}
                    >
                      {/* <span className="text-base">{lang.flag}</span> */}
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Direct Button */}
            <a
              href="https://wa.me/message/SK3PWHJIEMODA1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-xl transition-all duration-300 shadow-md shadow-green-500/20 hover:scale-105"
              title="Contact WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>
            <a
              href="https://t.me/ASTRA1TV"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-all duration-300 shadow-md shadow-green-500/20 hover:scale-105"
              title="Contact WhatsApp"
            >
              <FaTelegram className="text-xl" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;