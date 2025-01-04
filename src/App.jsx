// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Terminal, Quote } from 'lucide-react';
import examData from './data/exams.json';

function App() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    setExams(examData.exams);
  }, []);

  const openPDF = (pdfPath) => {
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <Terminal className="w-8 h-8 text-green-400 mr-2" />
        <h1 className="text-green-400 text-2xl md:text-4xl font-bold font-mono">
          EXAM_SCHEDULE
        </h1>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto grid gap-4">
        {exams.map((exam, index) => (
          <div key={index} className="bg-gray-800 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 rounded-lg">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Exam Name */}
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Terminal className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-mono">SUBJECT:</p>
                    <h2 className="text-white text-xl font-bold">{exam.exam}</h2>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Calendar className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-mono">DATE:</p>
                    <p className="text-white">{exam.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-mono">TIME:</p>
                    <p className="text-white">{exam.time}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Quote className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-mono">NOTES:</p>
                    <p className="text-white">{exam.quote}</p>
                  </div>
                </div>
              </div>

              {/* PDF Button */}
              <button
                onClick={() => openPDF(exam.pdf)}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-green-400 font-mono py-2 px-4 rounded flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors duration-300"
              >
                <FileText className="w-5 h-5" />
                <span> Book/Booklet.pdf
                  {exam.pdf.name}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;