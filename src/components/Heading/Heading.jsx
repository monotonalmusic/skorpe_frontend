import styles from "./heading.module.css";

const Heading = ({ title, subtitle }) => {
  return (
    <div className={styles.headingContainer}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default Heading;