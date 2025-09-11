
import styles from "./page.module.css";
import Link from "next/link";

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, description, href }) => (
  <Link href={href}>
    <div className={styles.linkCard}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </Link>
);

const links: LinkCardProps[] = [
  { title: "AI Chat", description: "Ask questions and get AI-powered answers.", href: "/chat" },
  { title: "Weather", description: "Check the current weather and forecasts.", href: "/weather" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Welcome to Your Dashboard</h1>
      <div className={styles.linksContainer}>
        {links.map((link) => (
          <LinkCard key={link.href} {...link} />
        ))}
      </div>
    </div>
  );
};
