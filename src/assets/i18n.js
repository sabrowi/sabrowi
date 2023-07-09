import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        portfolio: "Portfolios",
        more: "More",
        back: "Back",
        stack: "Tech Stacks",
        description: [
          "Mobile apps owned by Polres Banyumas (Police of Banyumas Regency). It's use to report incident (criminal, accident, disaster, etc) by people of Banyumas Regency. There is a feature to call police with Panic Button, and then the police can track its location.",
          "Mobile apps owned by Sabhara Polres Banyumas. It's help the police to track police patrol.",
          "Online travel booking platform. My job is developed the frontend of apps.",
          "Mobile apps used to emergency call. Owned by Dinas Kesehatan Purbalingga. Help the people which need an emergency help (Critical, Disaster, Accident, etc).",
          "Saving and Loan Coop managaement system. I build it from scratch.",
          "Sharia crowdfunding platform. I developed its frontend."
        ]
      }
    },
    id: {
      translations: {
        portfolio: "Portfolio",
        more: "Selengkapnya",
        back: "Kembali",
        stack: "Teknologi yang digunakan",
        description: [
          "Aplikasi yang dimiliki oleh Polres Banyumas untuk pelaporan masyarakat secara real time",
          "Aplikasi yang digunakan oleh Sabhara Polres Banyumas untuk pelaporan kegiatan Patroli",
          "Platform pemesanan travel online kapan saja dan dimana saja.",
          "Aplikasi untuk kegawatdaruratan Dinas Kesehatan Purbalingga",
          "Sistem manajemen koperasi simpan pinjam",
          "Platform crwodfunding/urun dana berbasis syariah yang dimiliki oleh Koperasi Syirkah Ummat Mulia"
        ]
      }
    }
  },
  fallbackLng: "en",
  debug: true,
  ns: ["transalations"],
  defaultNS: "translations",
  // keySeparator: false,
  // interpolation: {
  //   escapeValue: false,
  //   formatSeparator: ","
  // },
  react: {
    wait: true
  }
});

export default i18n;
