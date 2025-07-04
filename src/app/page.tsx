import OpenAItest from "./components/OpenAI/OpenAItest";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <OpenAItest />
    </div>
  );
}
