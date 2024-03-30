import styles from "./box.module.css"

interface BoxProps {
  title: string;
  text: string;
}

const Box = ({ title, text }: BoxProps) => {
  return (
    <div className={styles.box}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Box;