
import React from "react";
import Hero from "../components/Hero";
import PackagesSection from "../components/PackagesSection";
import ProgramsSection from "../components/ProgramsSection";
import PaymentMethodsSection from "../components/PaymentMethodsSection";
import Transition from "../components/Transition";

const Home = ({ selectedCountry, lang = "en" }) => {
  return (
    <Transition>
      {/* 1. قسم الهيرو */}
      <Hero lang={lang} />

      {/* 2. قسم الباقات (يحتاج الدولة واللغة لعرض العملات والأسعار المترجمة) */}
      <PackagesSection selectedCountry={selectedCountry} lang={lang} />

      {/* 3. قسم طرق الدفع (يحتاج اللغة لترجمة العناوين) */}
      <PaymentMethodsSection lang={lang} />

      {/* 4. قسم البرامج والتطبيقات (يحتاج اللغة لترجمة التعليمات) */}
      <ProgramsSection lang={lang} />
    </Transition>
  );
};

export default Home;