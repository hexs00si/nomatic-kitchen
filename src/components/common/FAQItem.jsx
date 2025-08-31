"use client";
import { useState } from "react";

const FAQItem = ({ id, question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const formatIndex = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="bg-brand-dark-secondary rounded-lg mb-4 overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full py-6 px-6 flex items-center justify-between text-left hover:bg-opacity-80 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <span className="text-brand-identity font-bold text-lg">
            {formatIndex(index + 1)}
          </span>
          <span className="text-brand-light font-medium text-lg">
            {question}
          </span>
        </div>
        <div className="ml-4">
          <svg
            className={`w-6 h-6 text-brand-light transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <div className="pl-10">
            <p className="text-gray-300 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
