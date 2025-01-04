import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Terminal, Quote, Sun, Moon } from 'lucide-react';

function App() {
  const [exams, setExams] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [currentWeekday, setCurrentWeekday] = useState('');
  const [pomodoro, setPomodoro] = useState({ minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroInterval, setPomodoroInterval] = useState(25);

  // Greeting state
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: <Sun className="w-6 h-6 text-yellow-400" /> };
    if (hour < 18) return { text: 'Good Afternoon', icon: <Sun className="w-6 h-6 text-orange-400" /> };
    return { text: 'Good Evening', icon: <Moon className="w-6 h-6 text-blue-400" /> };
  };
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // Fetch exams data from GitHub
    fetch('https://raw.githubusercontent.com/itsmadson/Exam-Info/main/src/data/exams.json')
      .then(response => response.json())
      .then(data => setExams(data.exams))
      .catch(error => console.error('Error fetching exams data:', error));

    // Update time every second
    const updateDateTime = () => {
      const now = new Date();
      const dateTimeOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Tehran',
      };
      const weekdayOptions = {
        weekday: 'long',
        timeZone: 'Asia/Tehran',
      };

      try {
        setCurrentDateTime(new Intl.DateTimeFormat('fa-IR', dateTimeOptions).format(now));
        setCurrentWeekday(new Intl.DateTimeFormat('fa-IR', weekdayOptions).format(now));
      } catch (error) {
        console.error('Error formatting date:', error);
        setCurrentDateTime(now.toLocaleString('en-US', { timeZone: 'Asia/Tehran' }));
        setCurrentWeekday(now.toLocaleString('en-US', { weekday: 'long', timeZone: 'Asia/Tehran' }));
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setPomodoro((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            setIsRunning(false);
            return { minutes: pomodoroInterval, seconds: 0 };
          } else if (prev.seconds === 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { ...prev, seconds: prev.seconds - 1 };
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroInterval]);

  const togglePomodoro = () => setIsRunning(!isRunning);

  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoro({ minutes: pomodoroInterval, seconds: 0 });
  };

  const openPDF = (pdf) => {
    window.open(pdf, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="flex items-center justify-center mb-8">
        <Terminal className="w-8 h-8 text-green-400 mr-2" />
        <h1 className="text-green-400 text-2xl md:text-4xl font-bold font-mono">EXAM_SCHEDULE</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-green-400 text-xl font-mono">Date & Time</h2>
              {greeting.icon}
            </div>
            <p className="text-white text-lg mb-2">{currentWeekday}</p>
            <p className="text-white text-lg">{currentDateTime || 'Loading...'}</p>
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <p className="text-green-400">{greeting.text}!</p>
              <p className="text-gray-300 text-sm mt-1">Ready for your study session?</p>
            </div>
          </div>

          <div className="bg-gray-800 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 rounded-lg p-6">
            <h2 className="text-green-400 text-xl font-mono">Pomodoro Timer</h2>
            <p className="text-white text-lg mt-4">
              {pomodoro.minutes}:{pomodoro.seconds.toString().padStart(2, '0')}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={togglePomodoro}
                className="w-full bg-gray-700 hover:bg-gray-600 text-green-400 font-mono py-2 px-4 rounded transition-colors duration-300"
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetPomodoro}
                className="w-full bg-gray-700 hover:bg-gray-600 text-green-400 font-mono py-2 px-4 rounded transition-colors duration-300"
              >
                Reset
              </button>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setPomodoroInterval(25)}
                className={`w-full ${pomodoroInterval === 25 ? 'bg-green-400' : 'bg-gray-700'} hover:bg-gray-600 text-white font-mono py-2 px-4 rounded transition-colors duration-300`}
              >
                25 Min
              </button>
              <button
                onClick={() => setPomodoroInterval(50)}
                className={`w-full ${pomodoroInterval === 50 ? 'bg-green-400' : 'bg-gray-700'} hover:bg-gray-600 text-white font-mono py-2 px-4 rounded transition-colors duration-300`}
              >
                50 Min
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 rounded-lg p-6 mb-8">
          <h2 className="text-green-400 text-xl font-mono mb-4">Study Music</h2>
          <div className="relative w-full" style={{ paddingBottom: '30%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0"
              title="Lofi Music"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="grid gap-4">
          {exams.map((exam, index) => (
            <div key={index} className="bg-gray-800 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 rounded-lg">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Terminal className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 font-mono">SUBJECT:</p>
                      <h2 className="text-white text-xl font-bold">{exam.exam}</h2>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 font-mono">DATE:</p>
                      <p className="text-white">{exam.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 font-mono">TIME:</p>
                      <p className="text-white">{exam.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Quote className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-green-400 font-mono">NOTES:</p>
                      <p className="text-white">{exam.quote}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openPDF(exam.pdf)}
                  className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-green-400 font-mono py-2 px-4 rounded flex items-center justify-center"
                >
                  <FileText className="w-5 h-5" />
                  <span>{exam.file}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;