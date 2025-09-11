import WeatherTest from "./WeatherTest/WeatherTest";
import styles from "../page.module.css";
import { VoiceProvider } from "../context/VoiceContext";
import VoiceSelector from "../components/VoiceSelector/VoiceSelector";

export default function Home() {
  
  return (
    <VoiceProvider>
      <div className={styles.page}>
        <h1 className={styles.header}>Weather</h1>
        <VoiceSelector />
        <WeatherTest />
      </div>
    </VoiceProvider>
  );
}