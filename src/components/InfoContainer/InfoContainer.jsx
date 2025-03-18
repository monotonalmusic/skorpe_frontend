import styles from "./infocontainer.module.css";


const InfoContainer = ({ title, children, img }) => {


  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoImageContainer}>
        <img src={img} alt="" className={styles.infoImage} />
      </div>

      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default InfoContainer;
