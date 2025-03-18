import { useState } from "react";
import styles from "./kontaktpage.module.css";
import { icons } from "../../services/icons";
import useKontakt from "../../hooks/useKontakt";

const KontaktPage = () => {
  const { sendMessage, loading, error, success } = useKontakt("http://localhost:3042/message");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(formData);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.kontaktContainer}>
        <h1 className={styles.title}>Send en besked til os</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              placeholder="Dit navn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Din email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              id="message"
              name="description"
              className={styles.textarea}
              placeholder="Din besked"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Sender..." : "Send besked"}
          </button>
          {error && <p className={styles.error}>Fejl: {error}</p>}
          {success && <p className={styles.success}>Besked sendt succesfuldt!</p>}
        </form>
      </div>
      <div className={styles.hurtigContainer}>
        <h2>Hurtig kontakt?</h2>
        <p>Har du spørgsmål eller ønsker du at høre mere om vores produkter? Kontakt os – vi står altid klar til at hjælpe!</p>
        <div className={styles.footerContactContainer}>
          <div className={styles.iconContainer}>{icons.FaPhone}</div>
          <div>
            <p>+88130-589-745-6987</p>
            <p>+1655-456-532</p>
          </div>
        </div>
        <div className={styles.footerOpeningContainer}>
          <div className={styles.iconContainer}>{icons.FaClock}</div>
          <div>
            <p>Monday - Friday: 8:00 - 16:00</p>
            <p>Saturday: 8:00 - 12:00</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className={styles.footerAddressContainer}>
          <div className={styles.iconContainer}>{icons.FaLocationDot}</div>
          <div>
            <p>1234 Street Name, City Name, United States</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontaktPage;