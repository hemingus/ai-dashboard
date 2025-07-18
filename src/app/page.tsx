import OpenAItest from "./components/OpenAI/OpenAItest";
import WeatherTest from "./components/Weather/WeatherTest";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Ask the AI</h1>
      <OpenAItest />
      <WeatherTest />
    </div>
  );
}
