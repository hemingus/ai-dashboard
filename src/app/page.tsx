import OpenAItest from "./chat/OpenAI/OpenAItest";
import WeatherTest from "./weather/WeatherTest/WeatherTest";
import styles from "./page.module.css";
import { VoiceProvider } from "./context/VoiceContext";
import VoiceSelector from "./components/VoiceSelector/VoiceSelector";

export default function Home() {
  
  return (
    <VoiceProvider>
      <div className={styles.page}>
        <h1 className={styles.header}>Ask the AI</h1>
        <VoiceSelector />
        <OpenAItest />
        <WeatherTest />
      </div>
    </VoiceProvider>
  );
}
