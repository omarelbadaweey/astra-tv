
import React, { useState, useEffect } from "react";

const Hero = ({ lang: propLang }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // قراءة اللغة من propLang إن وُجدت، أو من localStorage، أو اختيار 'ar' كافتراضي
  const [lang, setLang] = useState(() => {
    return propLang || localStorage.getItem("app_lang") || "en";
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // المتابعة والتحديث في حال تغير الـ prop الممرر من App
  useEffect(() => {
    if (propLang) {
      setLang(propLang);
    }
  }, [propLang]);

  // الاستماع للتغييرات المباشرة في LocalStorage (اختياري)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLang = localStorage.getItem("app_lang");
      if (savedLang) setLang(savedLang);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isRtl = lang === "ar";

  // قاموس النصوص المترجمة
  const content = {
    ar: {
      titlePrefix: "تجربة مشاهدة ",
      titleHighlight: "فريدة واستثنائية",
      description: "استمتع بأفضل وأحدث المحتويات بأعلى جودة وبدون تقطيع.",
      subDescription: "انضم إلى الآلاف من المشتركين السعداء اليوم!",
      stats: {
        users: "مستخدم نشط",
        channels: "قناة مباشرة",
        support: "دعم فني 24/7",
      },
      buttons: {
        offers: "أحدث العروض",
        download: "تحميل التطبيق",
      },
      badges: {
        new: "جديد!",
        popular: "الأكثر طلباً",
      },
      imgAlt: "📱 صورة التطبيق",
    },
    en: {
      titlePrefix: "A unique streaming ",
      titleHighlight: "experience",
      description: "Enjoy the best content with ultra-high quality and top speed.",
      subDescription: "Join thousands of satisfied users today!",
      stats: {
        users: "Active Users",
        channels: "Live Channels",
        support: "Technical Support",
      },
      buttons: {
        offers: "Latest Offers",
        download: "Download App",
      },
      badges: {
        new: "New!",
        popular: "In Demand",
      },
      imgAlt: "📱 App Preview",
    },
  };

  const t = content[lang] || content.ar;

  const programsScroll = () => {
    const programs = document.getElementById("programs");
    if (programs) {
      programs.scrollIntoView({ behavior: "smooth" });
    }
  };

  const packagesScroll = () => {
    const packages = document.getElementById("packages");
    if (packages) {
      packages.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden border-b border-orange-500/10"
    >
      {/* خلفية الإضاءات البرتقالية الناعمة السودة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full filter blur-3xl opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* قسم النصوص */}
          <div
            className={`flex-1 text-center ${
              isRtl ? "lg:text-right" : "lg:text-left"
            } space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {t.titlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                {t.titleHighlight}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.description}{" "}
              <span className="block mt-2 text-orange-400 font-semibold">
                {t.subDescription}
              </span>
            </p>

            {/* الأرقام والإحصائيات */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-2">
              <div
                className="text-center animate-fade-in-up bg-gray-900/60 border border-orange-500/20 px-4 py-3 rounded-xl min-w-28"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="text-2xl lg:text-3xl font-extrabold text-orange-400">
                  +50K
                </div>
                <div className="text-gray-400 text-xs lg:text-sm mt-1">
                  {t.stats.users}
                </div>
              </div>

              <div
                className="text-center animate-fade-in-up bg-gray-900/60 border border-orange-500/20 px-4 py-3 rounded-xl min-w-28"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="text-2xl lg:text-3xl font-extrabold text-white">
                  +10,000
                </div>
                <div className="text-gray-400 text-xs lg:text-sm mt-1">
                  {t.stats.channels}
                </div>
              </div>

              <div
                className="text-center animate-fade-in-up bg-gray-900/60 border border-orange-500/20 px-4 py-3 rounded-xl min-w-28"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="text-2xl lg:text-3xl font-extrabold text-orange-400">
                  24/7
                </div>
                <div className="text-gray-400 text-xs lg:text-sm mt-1">
                  {t.stats.support}
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={packagesScroll}
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-7 lg:px-9 py-3.5 lg:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25 text-sm lg:text-base"
              >
                {t.buttons.offers}
              </button>
              <button
                onClick={programsScroll}
                className="cursor-pointer border border-orange-500/80 text-orange-400 hover:bg-orange-500 hover:text-white px-7 lg:px-9 py-3.5 lg:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm lg:text-base bg-gray-900/50"
              >
                {t.buttons.download}
              </button>
            </div>
          </div>

          {/* قسم الصورة */}
          <div
            className={`flex-1 w-full lg:w-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative max-w-md mx-auto lg:max-w-full">
              {/* توهج خلف الإطار */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-25 blur-xl animate-pulse"></div>

              {/* حاوية الصورة */}
              <div className="relative bg-gray-900/90 rounded-2xl p-3 lg:p-4 border border-orange-500/30 shadow-2xl">
                <div className="w-full overflow-hidden h-64 md:h-80 lg:h-96 bg-black rounded-xl flex items-center justify-center border border-orange-500/20">
                  <img
                    src="/astra.png"
                    className="h-full w-full object-cover rounded-lg"
                    alt={t.imgAlt}
                  />
                </div>

                {/* الشارات الإضافية */}
                <div className="hidden lg:block absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-extrabold shadow-lg animate-bounce">
                  {t.badges.new}
                </div>
                <div className="capitalize hidden lg:block absolute -bottom-3 -left-3 bg-gray-800 border border-orange-500 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {t.badges.popular}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* التدرج السفلي للربط مع السكشن التالي */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;