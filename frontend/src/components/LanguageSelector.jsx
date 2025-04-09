import React, { useEffect, useState } from "react";
import GoogleTranslate from "./GoogleTranslate";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "gu", label: "Gujarati" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" },
  { code: "mr", label: "Marathi" },
  { code: "bn", label: "Bengali" },
  { code: "pa", label: "Punjabi" },
  { code: "or", label: "Odia" },
  { code: "as", label: "Assamese" },
  { code: "ur", label: "Urdu" },
  { code: "ne", label: "Nepali" },
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  const handleChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);
    localStorage.setItem("selectedLang", newLang);

    // Change the language via Google Translate
    const selectEl = document.querySelector(".goog-te-combo");
    if (selectEl) {
      selectEl.value = newLang;
      selectEl.dispatchEvent(new Event("change"));
    }

    // Reload the page to fully apply translation
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="text-sm flex items-center gap-2">
      <select
        onChange={handleChange}
        value={selectedLang}
        className="p-1 rounded-md border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <GoogleTranslate />
    </div>
  );
};

export default LanguageSelector;
