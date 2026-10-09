import React from "react";

const PaymentMethodsSection = ({ lang = "en" }) => {
  const isAr = lang === "ar";

  // النصوص الخاصة بالعنوان
  const texts = {
    titleStart: isAr ? "طرق الدفع " : "Supported ",
    titleHighlight: isAr ? "المدعومة" : "Payment Methods",
  };

  const paymentMethods = [
    { id: 1, name: "VISA" },
    { id: 2, name: "MasterCard" },
    { id: 3, name: "PayPal" },
    { id: 4, name: "AMERICAN EXPRESS" },
    { id: 5, name: "VISA Electron" },
    { id: 6, name: "MasterCard" },
    { id: 7, name: "PayPal" },
    { id: 8, name: "USDT" },
  ];

  return (
    <section className="py-10 bg-black relative border-b border-orange-500/10">
      <div className="container mx-auto px-4 relative z-10">
        {/* عنوان السكشن متناسق مع ألوان الموقع */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            {texts.titleStart}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              {texts.titleHighlight}
            </span>
          </h2>
        </div>

        {/* تم تثبيت اتجاه المحتوى الداخلي كـ ltr عشان الكلمات الإنجليزية تظهر بشكل سليم */}
        <div className="relative group overflow-hidden" dir="ltr">
          {/* تأثير التلاشي باللون الأسود عشان يندمج مع الخلفية */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <marquee
            // تغيير اتجاه حركة الشريط حسب اللغة
            direction={isAr ? "left" : "right"}
            className="flex flex-wrap gap-4 border-y border-orange-500/20 py-4 bg-gray-900/20"
          >
            <div className="flex">
              {paymentMethods.map((method, index) => (
                <div
                  key={`method-${method.id}-${index}`}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <div className="bg-gray-900/80 mx-4 backdrop-blur-md rounded-xl px-8 py-4 border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:bg-orange-500/10 hover:scale-105 min-w-[180px] text-center shadow-lg shadow-black/50">
                    <span className="font-bold text-xl tracking-wider text-gray-200 hover:text-white transition-colors duration-300">
                      {method.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </marquee>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;