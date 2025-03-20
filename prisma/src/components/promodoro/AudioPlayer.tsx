"use client"

import { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  enabled: boolean;
  soundUrl: string;
  onAudioReady?: () => void;
  onAudioError?: (error: any) => void;
}

/**
 * A utility component for handling audio playback with browser compatibility
 * This can be used as a drop-in replacement if the current audio implementation
 * has issues on certain browsers.
 */
export default function AudioPlayer({ 
  enabled = true, 
  soundUrl, 
  onAudioReady,
  onAudioError
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);

  // Initialize audio only once
  useEffect(() => {
    if (!initializedRef.current) {
      try {
        audioRef.current = new Audio(soundUrl);
        audioRef.current.preload = "auto";
        
        // Set up event handlers
        audioRef.current.addEventListener('canplaythrough', () => {
          initializedRef.current = true;
          if (onAudioReady) onAudioReady();
        });
        
        audioRef.current.addEventListener('error', (e) => {
          if (onAudioError) onAudioError(e);
          console.error("Audio error:", e);
        });
        
        // Load the audio
        audioRef.current.load();
        
        // Unlock audio for iOS/Safari
        const unlockAudio = () => {
          if (audioRef.current) {
            audioRef.current.play().then(() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }).catch(e => console.log("Audio unlock failed:", e));
          }
          
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
        };
        
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
      } catch (error) {
        if (onAudioError) onAudioError(error);
        console.error("Error initializing audio:", error);
      }
    }
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.oncanplaythrough = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [soundUrl, onAudioReady, onAudioError]);

  // Method to play the sound programmatically
  const playSound = () => {
    if (!enabled || !audioRef.current) return;
    
    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Failed to play audio:", error);
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Expose the play method to parent through ref
  return null; // This component doesn't render anything
}

// Usage:
// const audioPlayerRef = useRef<{ playSound: () => void }>(null);
// <AudioPlayer ref={audioPlayerRef} enabled={!muted} soundUrl="/notification.mp3" />
// Then call audioPlayerRef.current?.playSound() when needed
