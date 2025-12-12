"use client"

import { useState } from 'react'
import styles from './OpenAItest.module.css';
import containerStyles from '../../../styles/container.module.css'
import inputStyles from '../../../styles/input.module.css'
import { useVoice } from "../../context/VoiceContext";

const OpenAItest = () => {
    const [apiText, setApiText] = useState<string>("Waiting for input...")
    const [loading, setLoading] = useState(false)
    const [word, setWord] = useState<string>("")
    const { speak } = useVoice();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    }

    const fetchCompletion = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `${word} (respond taking the role of a classy englishman, max 50 words)`
          })
        });

        const data = await res.json();
        setApiText(data.response);
      } catch (err) {
        console.error(err);
        setApiText("Failed to fetch response.");
      }

      setLoading(false);
    };
  
    return (
        <div className={containerStyles.container}>
            <img src="/ai_david.png" alt="Image of the ai companion, David"/>
            <input
            className={inputStyles.input}
            type="text"
            onChange={handleInputChange}
            value={word}
            placeholder="input text..."
            />
            {loading ? <h3>Loading...</h3> : <button className={styles.openAItestButton} onClick={fetchCompletion}>Submit</button>}
            
            <article className={styles.openAItestResponse}>{loading ? "loading..." : apiText}</article>
            {apiText !== "Waiting for input..." && <button className={styles.speakButton} onClick={e => speak(apiText)}>🔊 Speak</button>}
        </div>
      )
}

export default OpenAItest