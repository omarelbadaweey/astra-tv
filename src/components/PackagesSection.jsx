/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaDollarSign, FaEuroSign, FaStar, FaCrown, FaRocket } from "react-icons/fa";

const PackagesSection = ({ selectedCountry, lang = "en" }) => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const isRtl = lang === "ar";

  const packagesData = [
    {
      id: 1,
      name: { en: "Basic Package", ar: "الباقة الأساسية" },
      icon: FaStar,
      color: "from-green-500 to-emerald-600",
      price: { SA: 20, AE: 17.20 },
      originalPrice: { SA: 30, AE: 26.20 },
      duration: { en: "Three Months", ar: "ثلاثة أشهر" },
      popular: false,
      features: {
        en: ["Basic Channels", "HD Quality", "24/7 Technical Support", "Single Screen", "Regular Updates"],
        ar: ["القنوات الأساسية", "جودة HD عالية", "دعم فني 24/7", "شاشة واحدة", "تحديثات دورية"],
      },
    },
    {
      id: 2,
      name: { en: "Standard Package", ar: "الباقة القياسية" },
      icon: FaCrown,
      color: "from-orange-400 to-orange-500",
      price: { SA: 40, AE: 34.35 },
      originalPrice: { SA: 54, AE: 50.35 },
      duration: { en: "Six Months", ar: "ستة أشهر" },
      popular: true,
      features: {
        en: ["All Basic Channels", "Full HD Quality", "Premium Technical Support", "Sports Channels", "Instant Updates"],
        ar: ["جميع القنوات الأساسية", "جودة Full HD ممتازة", "دعم فني مميز", "القنوات الرياضية", "تحديثات فورية"],
      },
    },
    {
      id: 3,
      name: { en: "Premium Package", ar: "الباقة الممتازة" },
      icon: FaRocket,
      color: "from-purple-500 to-pink-600",
      price: { SA: 60, AE: 51.50 },
      originalPrice: { SA: 80, AE: 70.50 },
      duration: { en: "One Year", ar: "سنة كاملة" },
      popular: false,
      features: {
        en: ["All Available Channels", "4K UHD Quality", "VIP Technical Support", "All Sports Channels", "Ad-Free Streaming", "Instant Updates", "DVR Service"],
        ar: ["جميع القنوات المتاحة", "جودة فائقة 4K UHD", "دعم فني كبار الشخصيات VIP", "جميع القنوات الرياضية", "مشاهدة بدون إعلانات", "تحديثات فورية", "خدمة التسجيل DVR"],
      },
    },
  ];

  const content = {
    ar: {
      titlePrefix: "باقات ",
      titleHighlight: "متجر أسترا",
      description: "اختر الباقة التي تناسب احتياجاتك واستمتع بأفضل تجربة مشاهدة.",
      forText: "لمدة",
      mostPopular: "⭐ الأكثر طلباً",
      saveText: "توفير",
      moreFeatures: "ميزات إضافية",
      chooseBtn: "اشتراك الآن",
      currencyToggle: { usd: "دولار ($)", eur: "يورو (€)" },
    },
    en: {
      titlePrefix: "Packages ",
      titleHighlight: "Astra_TV",
      description: "Choose the package that suits your needs and enjoy the best streaming experience.",
      forText: "For",
      mostPopular: "⭐ Most Popular",
      saveText: "Save",
      moreFeatures: "more features",
      chooseBtn: "Choose Package",
      currencyToggle: { usd: "USD ($)", eur: "EUR (€)" },
    },
  };

  const t = content[lang] || content.en;

  const getPackagePriceData = (pkg) => {
    const countryCode = selectedCountry?.code || (selectedCurrency === "EUR" ? "AE" : "SA");
    const currencySymbol = selectedCountry?.currency || (selectedCurrency === "EUR" ? "€" : "$");
    const price = pkg.price[countryCode] ?? pkg.price.SA;
    const originalPrice = pkg.originalPrice[countryCode] ?? pkg.originalPrice.SA;
    const savings = Math.max(0, originalPrice - price).toFixed(2);
    return { price, originalPrice, savings: Number(savings), currencySymbol };
  };

  // const handlePackageClick = (pkg) => {
  //   const priceData = getPackagePriceData(pkg);
  //   // التوجيه مع تمرير كل بيانات الباقة عشان نستقبلها في صفحة الدفع
  //   navigate(`/package/${pkg.id}`, { 
  //     state: { pkg, priceData } 
  //   });
  // };


  const handlePackageClick = (pkg) => {
    const priceData = getPackagePriceData(pkg);
    
    // الحل هنا: بنفصل الأيقونة عشان المتصفح يقدر ينقل باقي البيانات بدون إيرور
    const { icon, ...safePkgData } = pkg; 

    navigate(`/package/${pkg.id}`, { 
      state: { pkg: safePkgData, priceData } 
    });
  };

  return (
    <section id="packages" dir={isRtl ? "rtl" : "ltr"} className="py-20 bg-black border-b border-orange-500/10 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {t.titlePrefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            {t.description}
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedCurrency("USD")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                selectedCurrency === "USD"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 scale-105"
                  : "bg-gray-900/80 border border-orange-500/20 text-gray-400 hover:text-white hover:border-orange-500/50"
              }`}
            >
              <FaDollarSign className="text-xs" />
              <span>{t.currencyToggle.usd}</span>
            </button>

            <button
              onClick={() => setSelectedCurrency("EUR")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                selectedCurrency === "EUR"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 scale-105"
                  : "bg-gray-900/80 border border-orange-500/20 text-gray-400 hover:text-white hover:border-orange-500/50"
              }`}
            >
              <FaEuroSign className="text-xs" />
              <span>{t.currencyToggle.eur}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pt-4">
          {packagesData.map((pkg) => {
            const { price, originalPrice, savings, currencySymbol } = getPackagePriceData(pkg);
            const IconComponent = pkg.icon;
            const featuresList = pkg.features[lang] || pkg.features.en;

            return (
              <div
                key={pkg.id}
                onClick={() => handlePackageClick(pkg)}
                className={`relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border-2 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer flex flex-col justify-between ${
                  pkg.popular ? "border-orange-500 shadow-xl shadow-orange-500/10" : "border-orange-500/20 hover:border-orange-400/60"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-1.5 rounded-full text-xs font-extrabold shadow-lg uppercase tracking-wider">
                      {t.mostPopular}
                    </div>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="text-center mb-6 pt-2">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${pkg.color} text-white text-3xl mb-4 shadow-md`}>
                      <IconComponent />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {pkg.name[lang] || pkg.name.en}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 text-gray-400 text-sm">
                      <span>{t.forText}</span>
                      <span className="text-orange-400 font-bold">
                        {pkg.duration[lang] || pkg.duration.en}
                      </span>
                    </div>
                  </div>

                  <div className="text-center mb-6 bg-black/40 border border-orange-500/10 p-4 rounded-xl">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <span className="text-3xl font-extrabold text-white">
                        {price} {currencySymbol}
                      </span>
                      {originalPrice > price && (
                        <span className="text-base text-gray-500 line-through font-semibold">
                          {originalPrice} {currencySymbol}
                        </span>
                      )}
                    </div>
                    {savings > 0 && (
                      <div className="text-emerald-400 text-xs font-bold">
                        {t.saveText} {savings} {currencySymbol}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {featuresList.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="bg-emerald-500/10 p-1 rounded-full text-emerald-400 shrink-0">
                          <FaCheck className="text-xs" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                    {featuresList.length > 4 && (
                      <div className="text-orange-400 text-xs font-bold pt-1 text-center">
                        +{featuresList.length - 4} {t.moreFeatures}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageClick(pkg);
                    }}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm lg:text-base cursor-pointer ${
                      pkg.popular
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25"
                        : "bg-gray-800 hover:bg-orange-500 hover:text-white text-orange-400 border border-orange-500/40"
                    }`}
                  >
                    {t.chooseBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;