
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";

function App() {
  // قراءة اللغة المحفوظة في الـ localStorage أو اعتماد الإنجليزية افتراضياً
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  // تحديث اتجاه لغة المتصفح وحفظ الاختيار في localStorage
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("app_lang", lang);
  }, [lang]);

  // دالة تغيير اللغة من الهيدر
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans">
      <Header onLanguageChange={handleLanguageChange} currentLang={lang} />

      <main className="flex-1">


        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/package/:id" element={<PackageDetailsPage lang={lang} />} />
          </Routes>
        </AnimatePresence>
        
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default App;