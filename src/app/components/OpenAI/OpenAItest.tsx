"use client"

import OpenAI from "openai";
import { useState } from 'react'
import styles from './OpenAItest.module.css';
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
        const openai = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,

          dangerouslyAllowBrowser: true, // Required for frontend usage
        });
  
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: `${word} (respond taking the role of a classy englishman, use max 50 words)` }],
          });
  
          setApiText(completion.choices[0].message.content || "No response received.");
        } catch (error) {
          console.error("Error fetching data:", error);
          setApiText("Failed to fetch response.");
        }
        setLoading(false)
      };
  
    return (
        <div className={styles.openAItestContainer}>
            <input
            className={styles.openAItestInput}
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