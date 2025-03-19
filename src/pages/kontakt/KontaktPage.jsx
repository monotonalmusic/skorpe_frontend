import { useState } from "react";
import styles from "./kontaktpage.module.css";
import useKontakt from "../../hooks/useKontakt";

const KontaktPage = () => {
  const { sendMessage, loading, error, success } = useKontakt(
    "http://localhost:3042/message"
  );
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
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Har du spørgsmål eller ønsker du at bestille din favoritpizza?
          </h1>
          <p className={styles.subtitle}>
            Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi
            glæder os til at høre fra dig!
          </p>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder=""
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Emne
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={styles.input}
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Beskrivelse
              </label>
              <textarea
                id="message"
                name="description"
                className={styles.textarea}
                placeholder=""
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Sender..." : "Send"}
            </button>
            {error && <p className={styles.error}>Fejl: {error}</p>}
            {success && (
              <p className={styles.success}>Besked sendt succesfuldt!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default KontaktPage;
