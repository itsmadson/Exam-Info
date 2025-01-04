import React, { useState, useEffect } from 'react';
import { Terminal, Calendar, Clock, FileText, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import examData from '../data/exams.json';

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Load exams from JSON file
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
          EXAM_SCHEDULE.exe
        </h1>
      </div>

      {/* Matrix-like decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 select-none overflow-hidden font-mono text-green-400 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute text-xs" style={{
            left: `${i * 10}%`,
            animation: `fall ${Math.random() * 5 + 3}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}>
            {[...Array(20)].map((_, j) => (
              <div key={j}>
                {Math.random().toString(36).charAt(2)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto grid gap-4">
        {exams.map((exam, index) => (
          <Card key={index} className="bg-gray-800 border-green-400/20 hover:border-green-400/40 transition-all duration-300">
            <CardContent className="p-6">
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
                <span>DOWNLOAD_MATERIALS.pdf</span>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fall {
          from { transform: translateY(-100%); }
          to { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default ExamSchedule;