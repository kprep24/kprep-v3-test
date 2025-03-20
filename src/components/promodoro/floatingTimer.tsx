"use client"

import { usePomodoro } from "./promodoroContext"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, RotateCcw, Play, Pause, Minimize2, Maximize2, Eye, EyeOff, Flame, BellOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface FloatingTimerProps {
  inFocusPage?: boolean;
}

export default function FloatingTimer({ inFocusPage = false }: FloatingTimerProps) {
  const {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    switchMode,
    toggleSound,
    muted,
    formatTime,
    isMinimized,
    toggleMinimized,
    isVisible,
    toggleVisibility,
    completedPomodoros,
    lastUpdated,
  } = usePomodoro()

  const [forceUpdate, setForceUpdate] = useState(0);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);

  // Use context values directly with no local component state for timer values
  // This ensures we're always using the shared state from context
  const [streak, setStreak] = useState(0)
  const [showEmoji, setShowEmoji] = useState(false)
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
  const pathname = usePathname()
  
  // Log when component mounts/unmounts to help debug navigation issues
  useEffect(() => {
    console.log("FloatingTimer mounted", inFocusPage ? "in focus page" : "floating");
    return () => console.log("FloatingTimer unmounted", inFocusPage ? "in focus page" : "floating");
  }, [inFocusPage]);
  
  // Update streak when pomodoros are completed
  useEffect(() => {
    setStreak(Math.floor(completedPomodoros / 2))
  }, [completedPomodoros])

  // Show emoji animation when timer is active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setShowEmoji(true)
        setTimeout(() => setShowEmoji(false), 1000)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isActive])
  
  // Change quote every 30 seconds in focus page
  useEffect(() => {
    if (inFocusPage) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
        setCurrentQuote(motivationalQuotes[randomIndex])
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [inFocusPage, motivationalQuotes])

  // Force component to update via multiple methods
  useEffect(() => {
    // Method 1: BroadcastChannel (more reliable)
    if (typeof window !== 'undefined') {
      try {
        broadcastChannel.current = new BroadcastChannel('pomodoro-timer-sync');
        
        broadcastChannel.current.onmessage = () => {
          // Force re-render when message received
          setForceUpdate(prev => prev + 1);
        };
      } catch (error) {
        console.error('BroadcastChannel not supported:', error);
      }
    }
    
    // Method 2: Custom Event listener
    const handleTimerUpdate = () => {
      setForceUpdate(prev => prev + 1);
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
  }, []);

  // Method 3: Regular polling as backup
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setForceUpdate(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Force update more frequently when timer is active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setForceUpdate(prev => prev + 1);
      }, 500); // Update every half second when timer is active
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Add heartbeat to keep timer synchronized across pages
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (typeof window !== 'undefined' && broadcastChannel.current) {
        broadcastChannel.current.postMessage({
          action: 'heartbeat',
          timestamp: Date.now()
        });
      }
    }, 2000); // Send heartbeat every 2 seconds
    
    return () => clearInterval(heartbeat);
  }, []);

  // Use forceUpdate to ensure component re-renders
  useEffect(() => {
    console.log(`FloatingTimer updated (${inFocusPage ? 'focus page' : 'floating'}):`, 
      { mode, timeLeft, isActive, forceUpdate });
  }, [mode, timeLeft, isActive, forceUpdate, inFocusPage]);

  // If on focus-test page but not specifically rendered as inFocusPage, hide floating version
  const isFocusTestPage = pathname.includes("focus-test");
  if (isFocusTestPage && !inFocusPage) {
    return null;
  }

  const modeColors = {
    pomodoro: {
      bg: "bg-gradient-to-r from-rose-400 to-pink-600",
      light: "bg-rose-100 text-rose-700",
      border: "border-rose-300",
    },
    shortBreak: {
      bg: "bg-gradient-to-r from-emerald-400 to-teal-600",
      light: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-300",
    },
    longBreak: {
      bg: "bg-gradient-to-r from-blue-400 to-indigo-600",
      light: "bg-blue-100 text-blue-700",
      border: "border-blue-300",
    },
  }

  const modeEmojis = {
    pomodoro: "",
    shortBreak: "",
    longBreak: "",
  }

  // Enhanced reset handler for the floating timer
  const handleResetTimer = () => {
    console.log("Floating timer reset triggered");
    
    // Broadcast reset first to synchronize all timer instances
    if (broadcastChannel.current) {
      broadcastChannel.current.postMessage({
        action: 'manual-reset',
        timestamp: Date.now(),
        forceReset: true
      });
    }
    
    // Then call the reset function with a small delay
    setTimeout(() => {
      resetTimer();
      setForceUpdate(prev => prev + 1);
    }, 50);
  };

  // Render large focus page layout
  if (inFocusPage) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-purple-100">
          <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pomodoro Timer
          </h1>

          {streak > 0 && (
            <div className="text-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                <Flame className="w-4 h-4 mr-1" />
                Streak: {streak}
              </span>
            </div>
          )}

          <motion.div
            className="mb-6 text-center"
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs text-gray-500 mb-1">Daily Motivation</div>
            <p className="text-gray-700 italic">{currentQuote}</p>
          </motion.div>

          <div className="mb-8">
            <motion.div
              className={cn(
                "w-48 h-48 mx-auto rounded-full flex items-center justify-center",
                "shadow-lg relative overflow-hidden",
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
            >
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

              <div className="relative flex flex-col items-center">
                <div className="text-4xl font-bold text-white">{formatTime(timeLeft)}</div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center space-x-2 mb-6">
            <button
              onClick={() => switchMode("pomodoro")}
              className={cn(
                "px-4 py-2 rounded-full transition-colors flex items-center",
                mode === "pomodoro"
                  ? modeColors.pomodoro.bg + " text-white"
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
                  ? modeColors.shortBreak.bg + " text-white"
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
                  ? modeColors.longBreak.bg + " text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              Long
            </button>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTimer}
              className={cn(
                "px-6 py-3 rounded-full text-white transition-colors flex items-center",
                isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-purple-500 hover:bg-purple-600",
              )}
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" /> Start
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetTimer} // Use enhanced reset handler
              className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Reset
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Render floating timer for all other pages
  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow border border-purple-200"
        onClick={toggleVisibility}
      >
        <Eye className="w-5 h-5 text-purple-600" />
      </motion.button>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {isMinimized ? (
        <motion.div
          key="minimized"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={cn(
            "fixed bottom-4 right-4 z-50 rounded-full shadow-lg flex items-center",
            "cursor-pointer overflow-hidden backdrop-blur-md border border-white/20",
            modeColors[mode].bg,
          )}>
          <div className="px-4 py-2 text-white font-bold flex items-center gap-2" onClick={toggleMinimized}>
            <span>{formatTime(timeLeft)}</span>
            <Maximize2 className="w-4 h-4" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 w-72 border border-purple-200"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-1">
              <button
                onClick={() => switchMode("pomodoro")}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium transition-colors",
                  mode === "pomodoro" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                Focus
              </button>
              <button
                onClick={() => switchMode("shortBreak")}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium transition-colors",
                  mode === "shortBreak"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                Short
              </button>
              <button
                onClick={() => switchMode("longBreak")}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium transition-colors",
                  mode === "longBreak" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                Long
              </button>
            </div>
            <div className="flex space-x-1">
              <button title="Minimize" onClick={toggleMinimized} className="p-1 rounded-full hover:bg-gray-100">
                <Minimize2 className="w-4 h-4 text-gray-600" />
              </button>
              <button title="Close" onClick={toggleVisibility} className="p-1 rounded-full hover:bg-gray-100">
                <EyeOff className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className={cn("rounded-xl p-4 mb-3 text-center text-white relative overflow-hidden", modeColors[mode].bg)}>
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

            <div className="relative">
              <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>

              {/* Streak indicator */}
              {streak > 0 && (
                <div className="mt-1 text-xs font-medium flex items-center justify-center">
                  <Flame className="w-3 h-3 mr-1" /> Streak: {streak}
                </div>
              )}

              {/* Emoji animation - empty content but keeping structure */}
              <AnimatePresence>
                {showEmoji && isActive && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: -20, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2"
                  >
                    {/* Empty content - emojis removed */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={toggleTimer}
              className={cn(
                "flex-1 mr-2 py-2 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200",
              )}
            >
              {isActive ? (
                <span className="flex items-center justify-center">
                  <Pause className="w-4 h-4 mr-1" /> Pause
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Play className="w-4 h-4 mr-1" /> Start
                </span>
              )}
            </button>
            <button
            title="Reset Timer"
              onClick={handleResetTimer} // Use enhanced reset handler
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSound}
              className={cn(
                "p-2 rounded-lg transition-colors",
                muted ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              {muted ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

