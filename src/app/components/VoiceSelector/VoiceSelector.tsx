"use client";

import React from "react";
import styles from "./VoiceSelector.module.css";
import { useVoice } from "../../context/VoiceContext";

const VoiceSelector: React.FC = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoice();

  if (voices.length === 0) {
    return <p>No voices available</p>;
  }

  return (
    <div className={styles.voiceSelectorContainer}>
      <h3>Select Voice</h3>
      <select
        className={styles.voiceSelector}
        value={selectedVoice || ""}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelector;
