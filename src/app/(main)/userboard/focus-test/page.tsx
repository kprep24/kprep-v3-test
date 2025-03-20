"use client"

import { usePomodoro, PomodoroProvider } from "@/components/promodoro/promodoroContext"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Flame, Calendar, Bell, BellOff, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"

function FocusPage() {
  const { mode, timeLeft, isActive, toggleTimer, resetTimer, switchMode, formatTime, completedPomodoros, muted, toggleSound, settings, updateSettings } =
    usePomodoro()
  
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [tempSettings, setTempSettings] = useState(settings)

  const [motivationalQuotes, setMotivationalQuotes] = useState([
    "Your crush likes financially stable people. Open that DSA sheet.",
    "One more Pomodoro and I'll text you back.",
    "This assignment won't finish itself. But the timer will.",
    "Focus now, TikTok later.",
    "Your future self will thank you for grinding now.",
    "Plot twist: You're the main character in your success story.",
    "Vibing with productivity. Let's go!",
  ])

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0])
  const [streak, setStreak] = useState(0)
  const [forceUpdate, setForceUpdate] = useState(0)
  const broadcastChannel = useRef<BroadcastChannel | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const prevPropsRef = useRef({ timeLeft, isActive, mode });

  // Add state for current date
  const [currentDate, setCurrentDate] = useState<string>("")
  
  // Update current date on component mount
  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    setCurrentDate(today.toLocaleDateString(undefined, options))
  }, [])

  // Update temp settings when settings change from context
  useEffect(() => {
    setTempSettings(settings)
  }, [settings])

  // Save settings function
  const saveSettings = () => {
    // Validate settings to ensure they're in reasonable bounds
    const validatedSettings = {
      pomodoro: Math.min(Math.max(1, tempSettings.pomodoro), 120), // 1-120 minutes
      shortBreak: Math.min(Math.max(1, tempSettings.shortBreak), 30), // 1-30 minutes
      longBreak: Math.min(Math.max(1, tempSettings.longBreak), 60), // 1-60 minutes
      cycles: Math.min(Math.max(1, tempSettings.cycles), 10), // 1-10 cycles
    }
    
    updateSettings(validatedSettings)
    setIsCustomizeOpen(false)
  }

  // Close settings modal and reset temp settings
  const cancelSettings = () => {
    setTempSettings(settings)
    setIsCustomizeOpen(false)
  }

  // Update streak when pomodoros are completed
  useEffect(() => {
    setStreak(Math.floor(completedPomodoros / 2))
  }, [completedPomodoros])

  // Change quote every 10 seconds instead of 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
      setCurrentQuote(motivationalQuotes[randomIndex])
    }, 10000) // Changed from 30000 to 10000 milliseconds

    return () => clearInterval(interval)
  }, [motivationalQuotes])

  // Efficient update strategy to prevent loops
  const safeForceUpdate = () => {
    const now = Date.now();
    if (now - lastUpdateTimeRef.current > 300) {  // Throttle updates
      lastUpdateTimeRef.current = now;
      setForceUpdate(prev => prev + 1);
    }
  };

  // Check for meaningful changes to trigger updates
  useEffect(() => {
    const { timeLeft: prevTime, isActive: prevActive, mode: prevMode } = prevPropsRef.current;
    
    // Only update if something meaningful changed
    if (timeLeft !== prevTime || isActive !== prevActive || mode !== prevMode) {
      prevPropsRef.current = { timeLeft, isActive, mode };
      safeForceUpdate();
    }
  }, [timeLeft, isActive, mode]);

  // Force update to keep in sync with floating timer - improved with throttling
  useEffect(() => {
    // Listen for broadcast channel messages for timer sync
    if (typeof window !== 'undefined') {
      try {
        broadcastChannel.current = new BroadcastChannel('pomodoro-timer-sync');
        
        broadcastChannel.current.onmessage = () => {
          // Don't immediately update - check if we need to
          safeForceUpdate();
        };
      } catch (error) {
        console.error('BroadcastChannel not supported:', error);
      }
    }

    // Listen for timer update events as fallback
    const handleTimerUpdate = () => {
      safeForceUpdate();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('timer-updated', handleTimerUpdate);
      return () => {
        window.removeEventListener('timer-updated', handleTimerUpdate);
        if (broadcastChannel.current) {
          broadcastChannel.current.close();
        }
      };
    }
  }, []); // Empty dependency array - only run once

  // Additional update when timer is active - limit frequency
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        safeForceUpdate();
      }, 1000); // Update once per second when timer is active
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Safe timer toggle function
  const handleToggleTimer = () => {
    console.log("Focus page toggling timer, current state:", isActive);
    toggleTimer();
    
    // Throttled broadcast
    const now = Date.now();
    if (now - lastUpdateTimeRef.current > 300) {
      lastUpdateTimeRef.current = now;
      
      // Broadcast the change to ensure all components update
      if (broadcastChannel.current) {
        broadcastChannel.current.postMessage({
          action: 'manual-toggle',
          timestamp: now
        });
      }
    }
    
    // Force an immediate update for visual feedback
    safeForceUpdate();
  };

  // Safe reset function with improved broadcasting
  const handleResetTimer = () => {
    console.log("Focus page resetting timer");
    
    // First, ensure we broadcast the reset intent before actually resetting
    if (broadcastChannel.current) {
      broadcastChannel.current.postMessage({
        action: 'manual-reset',
        timestamp: Date.now(),
        forceReset: true // Special flag to ensure this reset is processed
      });
    }
    
    // Small delay to ensure broadcast happens before state changes
    setTimeout(() => {
      resetTimer();
      
      // Force an immediate update
      safeForceUpdate();
    }, 50);
  };

  // Debug info to track state
  useEffect(() => {
    console.log("Focus page timer state:", { mode, timeLeft, isActive, forceUpdate });
  }, [mode, timeLeft, isActive, forceUpdate]);

  const modeColors = {
    pomodoro: {
      bg: "bg-transparent", 
      light: "bg-rose-100 text-rose-700",
      border: "border-rose-300",
    },
    shortBreak: {
      bg: "bg-transparent", 
      light: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-300",
    },
    longBreak: {
      bg: "bg-transparent", 
      light: "bg-blue-100 text-blue-700",
      border: "border-blue-300",
    },
  }

  return (
    <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/focus-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6 // Adjust opacity as needed
        }}
      />
      
      <div className="w-full p-6 rounded-xl relative z-10">
        {/* Streak indicator */}
        {streak > 0 && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              <Flame className="w-4 h-4 mr-1" />
              Streak: {streak}
            </span>
          </div>
        )}

        {/* Motivational quote */}
        <motion.div
          className="mb-10 text-center"
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm dark:text-gray-100 text-gray-600 mb-1">
            <span>Daily Motivation</span>
            <span className="px-1">|</span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 inline" />
              {currentDate}
            </span>
          </div>
          <p className="text-gray-900 dark:text-gray-100 italic">{currentQuote}</p>
        </motion.div>

        {/* Timer display */}
        <div className="mb-8">
          <motion.div
            className={cn(
              "w-48 h-48 mx-auto rounded-full flex items-center justify-center",
              "shadow-lg relative overflow-hidden",
              "backdrop-blur-md bg-white/10 border border-white/20", // Glass morphism effect
              modeColors[mode].bg,
            )}
            animate={{
              scale: isActive ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
            key={`timer-${forceUpdate}`}
          >
            {/* Glossy shine effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none z-10" />
            
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    width: `${Math.random() * 100 + 20}px`,
                    height: `${Math.random() * 100 + 20}px`,
                    opacity: Math.random() * 0.3 + 0.1,
                  }}
                />
              ))}
            </div>

            <div className="relative flex flex-col items-center z-20">
              <div className="text-4xl font-bold dark:text-white text-black">{formatTime(timeLeft)}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleTimer}
                className="mt-2 rounded-full text-black dark:text-white transition-colors flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                aria-label={isActive ? "Pause timer" : "Start timer"}
              >
                {isActive ? (
                  <Pause className="w-6 h-6 " />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mode buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => switchMode("pomodoro")}
            className={cn(
              "px-4 py-2 rounded-full transition-colors flex items-center",
              mode === "pomodoro"
                ? "bg-usersidebar-light-link dark:bg-usersidebar-dark-link text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            Focus
          </button>
          <button
            onClick={() => switchMode("shortBreak")}
            className={cn(
              "px-4 py-2 rounded-full transition-colors flex items-center",
              mode === "shortBreak"
              ? "bg-usersidebar-light-link dark:bg-usersidebar-dark-link text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            Short
          </button>
          <button
            onClick={() => switchMode("longBreak")}
            className={cn(
              "px-4 py-2 rounded-full transition-colors flex items-center",
              mode === "longBreak"
              ? "bg-usersidebar-light-link dark:bg-usersidebar-dark-link text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            Long
          </button>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-4">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetTimer} // Use our enhanced reset function
            className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> Reset
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSound}
            className={cn(
              "px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center",
              muted ? "bg-gray-200 text-gray-400" : "bg-gray-200 text-gray-700"
            )}
          >
            {muted ? <BellOff className="w-5 h-5 mr-2" /> : <Bell className="w-5 h-5 mr-2" />}
            {muted ? "Sound Off" : "Sound On"}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCustomizeOpen(true)}
            className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center"
          >
            <Settings className="w-5 h-5 mr-2" /> Customize
          </motion.button>
        </div>
      </div>

      {/* Customize Modal */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button 
              title=" Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={cancelSettings}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Customize Timer Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Focus Duration (minutes)
                </label>
                <input
                  title="pomodoro"
                  type="number"
                  min="1"
                  max="120"
                  value={tempSettings.pomodoro}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    pomodoro: parseInt(e.target.value) || 25
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Short Break (minutes)
                </label>
                <input
                  title="shortBreak"
                  type="number"
                  min="1"
                  max="30"
                  value={tempSettings.shortBreak}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    shortBreak: parseInt(e.target.value) || 5
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Break (minutes)
                </label>
                <input
                  title="longBreak"
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.longBreak}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    longBreak: parseInt(e.target.value) || 15
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Break After (cycles)
                </label>
                <input
                  title="cycles"
                  type="number"
                  min="1"
                  max="10"
                  value={tempSettings.cycles}
                  onChange={(e) => setTempSettings({
                    ...tempSettings,
                    cycles: parseInt(e.target.value) || 4
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={cancelSettings}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <PomodoroProvider>
      <FocusPage />
    </PomodoroProvider>
  )
}

