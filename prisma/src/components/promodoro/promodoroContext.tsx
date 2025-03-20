"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

type TimerMode = "pomodoro" | "shortBreak" | "longBreak"

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
}

interface PomodoroContextType {
  mode: TimerMode
  timeLeft: number
  isActive: boolean
  completedPomodoros: number
  currentSession: number
  muted: boolean
  isMinimized: boolean
  isVisible: boolean
  lastUpdated: number
  settings: TimerSettings
  toggleTimer: () => void
  resetTimer: () => void
  switchMode: (mode: TimerMode) => void
  toggleSound: () => void
  toggleMinimized: () => void
  toggleVisibility: () => void
  formatTime: (seconds: number) => string
  updateSettings: (newSettings: TimerSettings) => void
}

const defaultSettings: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  cycles: 4,
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<TimerMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('timerMode');
      return (savedMode as TimerMode) || "pomodoro";
    }
    return "pomodoro";
  });
  
  // Load custom settings from localStorage if available
  const [settings, setSettings] = useState<TimerSettings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('customTimerSettings');
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings);
        } catch (e) {
          console.error("Error parsing saved timer settings:", e);
        }
      }
    }
    return defaultSettings;
  });
  
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTime = localStorage.getItem('timerTimeLeft');
      if (savedTime) return parseInt(savedTime);
    }
    return settings.pomodoro * 60;
  });
  
  const [isActive, setIsActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedActive = localStorage.getItem('timerIsActive');
      return savedActive === 'true';
    }
    return false;
  });
  
  const [completedPomodoros, setCompletedPomodoros] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedPomodoros');
      if (saved) return parseInt(saved);
    }
    return 0;
  });

  const [currentSession, setCurrentSession] = useState(1)
  const [muted, setMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(Date.now())

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const broadcastChannel = useRef<BroadcastChannel | null>(null);
  const timerStartRef = useRef<number | null>(null);
  const lastBroadcastRef = useRef<number>(0);
  const processingMessageRef = useRef<boolean>(false);

  // Initialize audio with better error handling and mobile support
  useEffect(() => {
    try {
      // Create audio instance only if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio("/notification.wav")
        
        // Add error handling for the audio element
        audioRef.current.addEventListener('error', (e) => {
          // console.error("Audio error:========>", e);
        });
        
        // Preload audio for better response
        audioRef.current.preload = "auto";
        audioRef.current.load()
        
        // For iOS/Safari, we need a user interaction to enable audio
        const unlockAudio = () => {
          if (audioRef.current) {
            // Create and immediately pause a playing instance
            audioRef.current.play().then(() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }).catch(err => console.log("Audio unlock failed:", err));
          }
          // Remove the event listeners after first interaction
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
        };
        
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioRef.current) {
        // Remove event listeners
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        
        // Properly clean up audio
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null;
      }
    }
  }, [])

  // Debug to console to see if provider is being created multiple times
  useEffect(() => {
    console.log("PomodoroProvider mounted");
    return () => console.log("PomodoroProvider unmounted");
  }, []);

  // Initialize BroadcastChannel for better cross-component communication
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        broadcastChannel.current = new BroadcastChannel('pomodoro-timer-sync');
        
        // Listen for messages from other components
        broadcastChannel.current.onmessage = (event) => {
          // Prevent processing nested messages
          if (processingMessageRef.current) return;
          
          try {
            processingMessageRef.current = true;
            const { action, data, forceReset, forceToggle } = event.data;
            
            // console.log('BroadcastChannel message received:', action);
            
            // Handle reset action specifically
            if (action === 'manual-reset' || forceReset) {
              console.log("Received reset command via broadcast");
              resetTimerInternal();
              return;
            }
            
            // Handle toggle action specifically
            if (action === 'manual-toggle' || forceToggle) {
              console.log("Received toggle command via broadcast");
              const newIsActive = !isActive;
              setIsActive(newIsActive);
              setLastUpdated(Date.now());
              
              if (newIsActive) {
                localStorage.setItem('originalTimeLeft', timeLeft.toString());
                timerStartRef.current = Date.now();
                localStorage.setItem('timerStartTime', timerStartRef.current.toString());
              } else {
                localStorage.removeItem('originalTimeLeft');
                localStorage.removeItem('timerStartTime');
                timerStartRef.current = null;
              }
              
              processingMessageRef.current = false;
              return;
            }
            
            // Sync state from other components without triggering loops
            if (action === 'sync-state' && data) {
              // Only update if values are significantly different to avoid loops
              if (data.mode && data.mode !== mode) setMode(data.mode);
              
              // For numeric values, only update if difference is significant
              if (data.timeLeft && Math.abs(data.timeLeft - timeLeft) > 2) {
                setTimeLeft(data.timeLeft);
              }
              
              if (data.isActive !== undefined && data.isActive !== isActive) {
                setIsActive(data.isActive);
              }
              
              if (data.completedPomodoros !== undefined && 
                  data.completedPomodoros !== completedPomodoros) {
                setCompletedPomodoros(data.completedPomodoros);
              }
            }
          } finally {
            processingMessageRef.current = false;
          }
        };
      } catch (error) {
        console.error('BroadcastChannel not supported:', error);
      }
    }
    
    return () => {
      if (broadcastChannel.current) {
        broadcastChannel.current.close();
      }
    };
  }, [isActive, timeLeft]);  // Add dependencies to ensure we have current state

  // Use server time or calculate based on localStorage for more accurate timing
  useEffect(() => {
    if (isActive && typeof window !== 'undefined') {
      // If timer is active, record start time or retrieve from localStorage
      const storedStartTime = localStorage.getItem('timerStartTime');
      if (storedStartTime) {
        timerStartRef.current = parseInt(storedStartTime);
      } else {
        timerStartRef.current = Date.now();
        localStorage.setItem('timerStartTime', timerStartRef.current.toString());
      }

      // Calculate elapsed time since timer started and adjust timeLeft
      if (timerStartRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - timerStartRef.current) / 1000);
        const originalTime = parseInt(localStorage.getItem('originalTimeLeft') || '0');
        
        // Only update if we have a valid original time and elapsed time is reasonable
        if (originalTime > 0 && elapsedSeconds > 0 && elapsedSeconds < originalTime) {
          const adjustedTime = originalTime - elapsedSeconds;
          if (adjustedTime !== timeLeft) {
            console.log('Adjusting time after navigation:', adjustedTime);
            setTimeLeft(adjustedTime);
          }
        }
      }
    } else if (!isActive && timerStartRef.current) {
      // Clear timer start time when paused
      timerStartRef.current = null;
      localStorage.removeItem('timerStartTime');
    }
  }, [isActive, timeLeft]);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      // Store the original time when starting the timer
      if (!localStorage.getItem('originalTimeLeft')) {
        localStorage.setItem('originalTimeLeft', timeLeft.toString());
      }
      
      // Record timer start time
      if (!timerStartRef.current) {
        timerStartRef.current = Date.now();
        localStorage.setItem('timerStartTime', timerStartRef.current.toString());
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleTimerComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
      // Clear original time when timer is stopped
      localStorage.removeItem('originalTimeLeft');
      localStorage.removeItem('timerStartTime');
      timerStartRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  // Broadcast timer state changes to other components
  const broadcastTimerUpdate = () => {
    if (typeof window !== 'undefined' && !processingMessageRef.current) {
      // Throttle broadcasts to prevent loops
      const now = Date.now();
      if (now - lastBroadcastRef.current < 200) return;
      lastBroadcastRef.current = now;
      
      const event = new CustomEvent('timer-updated', { 
        detail: { mode, timeLeft, isActive, completedPomodoros } 
      });
      window.dispatchEvent(event);
      
      if (broadcastChannel.current) {
        broadcastChannel.current.postMessage({
          action: 'sync-state',
          data: { mode, timeLeft, isActive, completedPomodoros }
        });
      }
    }
  }

  // Broadcast state more efficiently - only when values actually change
  const prevTimeRef = useRef({ timeLeft, isActive, mode, completedPomodoros });
  
  useEffect(() => {
    // Only broadcast if values have actually changed
    const { timeLeft: prevTime, isActive: prevActive, 
            mode: prevMode, completedPomodoros: prevCompleted } = prevTimeRef.current;
            
    if (timeLeft !== prevTime || isActive !== prevActive || 
        mode !== prevMode || completedPomodoros !== prevCompleted) {
      
      prevTimeRef.current = { timeLeft, isActive, mode, completedPomodoros };
      
      // Don't broadcast too frequently - use throttling
      const now = Date.now();
      if (now - lastBroadcastRef.current > 500 || !isActive) {
        broadcastTimerUpdate();
      }
    }
  }, [timeLeft, isActive, mode, completedPomodoros]);

  // Save state to localStorage and broadcast change whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timerMode', mode);
      localStorage.setItem('timerTimeLeft', timeLeft.toString());
      localStorage.setItem('timerIsActive', isActive.toString());
      localStorage.setItem('completedPomodoros', completedPomodoros.toString());
    }
  }, [mode, timeLeft, isActive, completedPomodoros]);

  // Enhanced timer completion handler with improved audio playback
  const handleTimerComplete = () => {
    // Play completion sound if not muted
    if (!muted && audioRef.current) {
      try {
        // Reset audio to beginning
        audioRef.current.currentTime = 0;
        
        // Create a promise to handle audio playback
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Timer completion sound played successfully");
            })
            .catch((error) => {
              console.error("Audio play error:", error);
              
              // If autoplay is blocked, we can try again with user interaction
              if (error.name === 'NotAllowedError') {
                console.log("Audio autoplay blocked - will try on next user interaction");
                
                // For debugging only - you may want to show a UI notification
                // that sound is blocked by browser policy
              }
            });
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }

    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsActive(false);

    // Handle mode switching with updated settings
    if (mode === "pomodoro") {
      const newCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(newCompletedPomodoros);

      if (newCompletedPomodoros % settings.cycles === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      switchMode("pomodoro");
    }

    setCurrentSession((prev) => prev + 1);
    
    // Broadcast state change to other components
    setTimeout(() => broadcastTimerUpdate(), 50);
  };

  // Switch timer mode with updated settings
  const switchMode = (newMode: TimerMode) => {
    setMode(newMode)
    setIsActive(false)
    setLastUpdated(Date.now())

    switch (newMode) {
      case "pomodoro":
        setTimeLeft(settings.pomodoro * 60)
        break
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60)
        break
      case "longBreak":
        setTimeLeft(settings.longBreak * 60)
        break
    }

    setTimeout(() => broadcastTimerUpdate(), 50); // Small delay to ensure state is updated
  }

  // Toggle timer - improved with better toggle broadcasting
  const toggleTimer = () => {
    const newIsActive = !isActive;
    console.log("Timer toggled, new state:", newIsActive);
    
    setIsActive(newIsActive);
    setLastUpdated(Date.now());
    
    if (newIsActive) {
      // Record original time when starting
      localStorage.setItem('originalTimeLeft', timeLeft.toString());
      timerStartRef.current = Date.now();
      localStorage.setItem('timerStartTime', timerStartRef.current.toString());
    } else {
      // Clear when pausing
      localStorage.removeItem('originalTimeLeft');
      localStorage.removeItem('timerStartTime');
      timerStartRef.current = null;
    }
    
    // Ensure broadcast happens after state update
    setTimeout(() => {
      if (broadcastChannel.current && !processingMessageRef.current) {
        broadcastChannel.current.postMessage({
          action: 'sync-state',
          data: { 
            mode, 
            timeLeft, 
            isActive: newIsActive, 
            completedPomodoros 
          },
          timestamp: Date.now()
        });
      }
      
      // Use custom event as fallback for broadcast channel
      const event = new CustomEvent('timer-updated', { 
        detail: { mode, timeLeft, isActive: newIsActive, completedPomodoros } 
      });
      window.dispatchEvent(event);
    }, 10);
  }

  // Internal reset function that does the actual reset work
  const resetTimerInternal = () => {
    console.log("Internal timer reset");
    
    // Clear any running timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsActive(false);
    setCompletedPomodoros(0);
    setCurrentSession(1);
    
    // Clear timer tracking data
    localStorage.removeItem('originalTimeLeft');
    localStorage.removeItem('timerStartTime');
    timerStartRef.current = null;
    
    // Reset to pomodoro mode with full time
    setMode("pomodoro");
    setTimeLeft(settings.pomodoro * 60);
    
    setLastUpdated(Date.now());
    
    // Immediately broadcast the reset state
    setTimeout(() => broadcastTimerUpdate(), 50);
    
    if (audioRef.current) {
      try {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      } catch (error) {
        console.error("Error resetting audio:", error)
      }
    }
  };

  // Public reset function that can be called from components
  const resetTimer = () => {
    console.log("Timer reset triggered");
    
    // Broadcast reset command first to ensure all instances update
    if (broadcastChannel.current && !processingMessageRef.current) {
      broadcastChannel.current.postMessage({
        action: 'manual-reset',
        timestamp: Date.now(),
        forceReset: true
      });
    }
    
    // Then perform the reset
    resetTimerInternal();
  };

  // Enhanced toggle sound function
  const toggleSound = () => {
    setMuted(!muted);

    // Test audio when unmuting to ensure it works
    if (muted && audioRef.current) {
      try {
        // Create a short test sound at low volume when enabling audio
        const originalVolume = audioRef.current.volume;
        audioRef.current.volume = 0.1; // Set very low volume for test
        
        audioRef.current.currentTime = 0;
        const testPlay = audioRef.current.play();
        
        if (testPlay !== undefined) {
          testPlay
            .then(() => {
              // Quickly stop it and restore volume
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                  audioRef.current.volume = originalVolume;
                }
              }, 50);
            })
            .catch((error) => {
              console.log("Audio test failed:", error);
              // Keep audio enabled even if test fails
            });
        }
      } catch (error) {
        console.error("Error testing audio:", error);
      }
    } else if (audioRef.current) {
      // Just reset the audio when muting
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }
  };

  // Toggle minimized state
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized)
  }

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Update settings function
  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    
    // If the timer is not active, update the current timer immediately
    if (!isActive) {
      // Update timeLeft based on current mode and new settings
      switch (mode) {
        case "pomodoro":
          setTimeLeft(newSettings.pomodoro * 60);
          break;
        case "shortBreak":
          setTimeLeft(newSettings.shortBreak * 60);
          break;
        case "longBreak":
          setTimeLeft(newSettings.longBreak * 60);
          break;
      }
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('customTimerSettings', JSON.stringify(newSettings));
    }
    
    // Broadcast settings change
    if (broadcastChannel.current) {
      broadcastChannel.current.postMessage({
        action: 'settings-updated',
        data: { settings: newSettings },
        timestamp: Date.now()
      });
    }
    
    // Force update with small delay to ensure all components receive the update
    setTimeout(() => broadcastTimerUpdate(), 50);
  };

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('customTimerSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Update timeLeft and broadcast change
  useEffect(() => {
    broadcastTimerUpdate();
  }, [timeLeft]);

  const value = {
    mode,
    timeLeft,
    isActive,
    completedPomodoros,
    currentSession,
    muted,
    isMinimized,
    isVisible,
    lastUpdated,
    settings,
    toggleTimer,
    resetTimer,
    switchMode,
    toggleSound,
    toggleMinimized,
    toggleVisibility,
    formatTime,
    updateSettings,
  }

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider")
  }
  return context
}

