"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface VoiceContextType {
  voices: SpeechSynthesisVoice[];
  selectedVoice: string | null;
  setSelectedVoice: (voice: string) => void;
  speak: (text: string) => void;
}

// Add optional props to make it easy to inject mock data
interface VoiceProviderProps {
  children: ReactNode;
  initialVoices?: SpeechSynthesisVoice[];
  initialSelectedVoice?: string | null;
  // Optional flag to disable real speechSynthesis in Storybook/testing
  disableSpeechSynthesis?: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({
  children,
  initialVoices = [],
  initialSelectedVoice = null,
  disableSpeechSynthesis = false,
}: VoiceProviderProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(initialVoices);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(
    initialSelectedVoice
  );

  // Load available voices from browser only if not disabled
  useEffect(() => {
    if (disableSpeechSynthesis) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);

      if (available.length > 0 && !selectedVoice) {
        setSelectedVoice(available[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice, disableSpeechSynthesis]);

  // Speak function (disabled for Storybook if desired)
  const speak = (text: string) => {
    if (disableSpeechSynthesis) {
      console.log(`[Storybook mock] Speak: ${text}`);
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <VoiceContext.Provider
      value={{ voices, selectedVoice, setSelectedVoice, speak }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

// Hook remains the same
export const useVoice = () => {
  const ctx = useContext(VoiceContext);
  if (!ctx) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return ctx;
};
