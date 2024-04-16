import styles from "./icon.module.css";

export default function UserIcon() {
  return (
    <svg
      className={styles.icon}
      width="23px"
      height="23px"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="none" />
      <circle
        cx="50"
        cy="30"
        r="20"
        fill="none"
        stroke="white"
        strokeWidth="5"
      />
      <path
        d="M15 90c10 -20 60 -20 70 0"
        fill="none"
        stroke="white"
        strokeWidth="5"
      />
    </svg>
  );
}
