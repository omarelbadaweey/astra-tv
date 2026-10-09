import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaWhatsapp, FaArrowLeft, FaArrowRight, FaCreditCard, FaUser, FaShieldAlt } from "react-icons/fa";
// استيراد الأيقونات هنا
import { FaStar, FaCrown, FaRocket } from "react-icons/fa"; 
import Transition from "../components/Transition";
import ScrollToTop from "../components/ScrollToTop";

const PackageDetailsPage = ({ lang = "en" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { id } = useParams();

  const isRtl = lang === "ar";

  // استلام بيانات الباقة
  const pkg = location.state?.pkg;
  const priceData = location.state?.priceData; // استلام بيانات السعر برضه

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    paymentMethod: "vodafone_cash",
    notes: "",
  });


  // دالة لإرجاع الأيقونة المناسبة بناءً على الـ ID بتاع الباقة
  const renderPackageIcon = (packageId) => {
    switch (packageId) {
      case 1: return <FaStar />;
      case 2: return <FaCrown />;
      case 3: return <FaRocket />;
      default: return <FaStar />;
    }
  };

  const content = {
    // ... (نفس قاموس النصوص بتاعك بدون تغيير)
    ar: {
      backBtn: "الرجوع للباقات",
      pageTitle: "إتمام عملية الاشتراك",
      subTitle: "أدخل بياناتك للتواصل معك وتأكيد تفعيل الباقة فوراً",
      packageSummary: "ملخص الباقة المختارة",
      forDuration: "المدة:",
      featuresTitle: "الميزات المشمولة:",
      formTitle: "بيانات المشترك والدفع",
      nameLabel: "الاسم بالكامل",
      namePlaceholder: "أدخل اسمك الثلاثي",
      phoneLabel: "رقم الواتساب للتواصل",
      phonePlaceholder: "مثال: 01012345678",
      paymentLabel: "طريقة الدفع المفضلة",
      notesLabel: "ملاحظات إضافية (اختياري)",
      notesPlaceholder: "أي استفسار أو تفاصيل إضافية...",
      submitBtn: "متابعة الدفع عبر الواتساب",
      securityNotice: "سيتم تحويلك مباشرة لمحادثة الدعم الفني على الواتساب لإكمال عملية تحويل المبلغ وتفعيل حسابك.",
      methods: {
        vodafone_cash: "فودافون كاش / محفظة إلكترونية",
        instapay: "إنستا باي (InstaPay)",
        bank_transfer: "تحويل بنكي",
        crypto: "عملات رقمية (USDT)",
      },
      notFound: "لم يتم العثور على بيانات الباقة. يرجى اختيار باقة من الصفحة الرئيسية.",
    },
    en: {
      backBtn: "Back to Packages",
      pageTitle: "Complete Subscription",
      subTitle: "Fill in your details to confirm your subscription and activate immediately.",
      packageSummary: "Selected Package Summary",
      forDuration: "Duration:",
      featuresTitle: "Included Features:",
      formTitle: "Subscriber & Payment Details",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "WhatsApp Phone Number",
      phonePlaceholder: "e.g. +201012345678",
      paymentLabel: "Preferred Payment Method",
      notesLabel: "Additional Notes (Optional)",
      notesPlaceholder: "Any extra info or questions...",
      submitBtn: "Proceed to WhatsApp Payment",
      securityNotice: "You will be redirected directly to WhatsApp support to complete payment and activate your account.",
      methods: {
        vodafone_cash: "Vodafone Cash / E-Wallet",
        instapay: "InstaPay",
        bank_transfer: "Bank Transfer",
        crypto: "Crypto (USDT)",
      },
      notFound: "Package data not found. Please select a package from the home page.",
    },
  };

  const t = content[lang] || content.en;

  if (!pkg) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-400 text-lg mb-6">{t.notFound}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-bold cursor-pointer"
        >
          {t.backBtn}
        </button>
      </div>
    );
  }

  const packageName = pkg.name[lang] || pkg.name.en;
  const packageDuration = pkg.duration[lang] || pkg.duration.en;
  const featuresList = pkg.features[lang] || pkg.features.en;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPaymentName = t.methods[formData.paymentMethod] || formData.paymentMethod;
    const message = `
🌟 *طلب اشتراك جديد - متجر أورنج* 🌟

👤 *اسم المشترك:* ${formData.fullName}
📱 *رقم التواصل:* ${formData.phoneNumber}
📦 *الباقة المختارة:* ${packageName} (${packageDuration})
💰 *المبلغ المطلوب:* ${priceData?.price} ${priceData?.currencySymbol}
💳 *طريقة الدفع:* ${selectedPaymentName}
${formData.notes ? `📝 *ملاحظات:* ${formData.notes}` : ""}

----------------------------------
⏱️ أرجو تزويدي ببيانات الدفع لتأكيد التفعيل.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/message/SK3PWHJIEMODA1?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
  <Transition>
    <ScrollToTop/>
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-black text-white py-12 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <button
          onClick={() => navigate("/")} // خليتها ترجع للصفحة الرئيسية مباشرة أضمن
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold mb-8 transition-all cursor-pointer"
        >
          {isRtl ? <FaArrowRight /> : <FaArrowLeft />}
          <span>{t.backBtn}</span>
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            {t.pageTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              {packageName}
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">{t.subTitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 bg-gray-900/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-orange-500/20 pb-4 mb-6">
                {/* تم تعديل عرض الأيقونة هنا */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${pkg.color} text-white text-2xl`}>
                  {renderPackageIcon(pkg.id)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{packageName}</h3>
                  <p className="text-xs text-orange-400 font-semibold">{t.forDuration} {packageDuration}</p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-300 mb-4">{t.featuresTitle}</h4>
              <ul className="space-y-3 mb-6">
                {featuresList.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-300">
                    <FaCheck className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border border-orange-500/10 text-center">
              <span className="text-gray-400 text-xs block mb-1">Total Amount</span>
              <span className="text-2xl font-extrabold text-orange-400">
                {/* استخدام السعر الديناميكي المرسل */}
                {priceData?.price || 0} {priceData?.currencySymbol || "$"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-gray-900/90 border border-orange-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <FaCreditCard className="text-orange-400" />
              <span>{t.formTitle}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  {t.nameLabel} <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder={t.namePlaceholder} className="w-full bg-black/60 border border-orange-500/20 focus:border-orange-500 rounded-xl px-4 py-3 pl-10 text-sm text-white outline-none transition-all" />
                  <FaUser className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"} text-gray-500 text-xs`} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                  {t.phoneLabel} <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} placeholder={t.phonePlaceholder} className="w-full bg-black/60 border border-orange-500/20 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all" />
                  <FaWhatsapp className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? "left-3" : "right-3"} text-emerald-500 text-sm`} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">{t.paymentLabel}</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full bg-black/60 border border-orange-500/20 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer">
                  <option value="vodafone_cash">{t.methods.vodafone_cash}</option>
                  <option value="instapay">{t.methods.instapay}</option>
                  <option value="bank_transfer">{t.methods.bank_transfer}</option>
                  <option value="crypto">{t.methods.crypto}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">{t.notesLabel}</label>
                <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} placeholder={t.notesPlaceholder} className="w-full bg-black/60 border border-orange-500/20 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-400 bg-orange-500/5 p-3 rounded-xl border border-orange-500/10">
                <FaShieldAlt className="text-orange-400 text-base shrink-0 mt-0.5" />
                <p>{t.securityNotice}</p>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] shadow-lg shadow-emerald-500/20 cursor-pointer text-base">
                <FaWhatsapp className="text-xl" />
                <span>{t.submitBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>   
  </Transition>
  );
};

export default PackageDetailsPage;