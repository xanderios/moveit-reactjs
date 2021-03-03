import { useContext, useState } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import Cookies from "js-cookie";
import styles from "../styles/components/SettingsModal.module.css";

export function SettingsModal() {
  const { configModalOpen, closeConfigModal, handleSubmit } = useContext(
    CountdownContext
  );

  const [timeSetting, setTimeSetting] = useState(
    Number(Cookies.get("timeSetting")) || 25
  );
  const [timeFormat, setTimeFormat] = useState(
    Cookies.get("timeFormat") || "minutes"
  );

  return (
    <div
      className={`${styles.overlay} ${configModalOpen && styles.overlayActive}`}
    >
      <div className={styles.container}>
        <header>Atualizar temporizador</header>
        <form
          onSubmit={(e) => {
            handleSubmit(e, timeSetting, timeFormat);
          }}
        >
          <div>
            <input
              type="text"
              value={timeSetting}
              onChange={(e) => setTimeSetting(Number(e.currentTarget.value))}
            />
            <select
              value={timeFormat}
              onChange={(e) => setTimeFormat(e.currentTarget.value)}
            >
              <option value="minutes">Minutos</option>
              <option value="seconds">Segundos</option>
            </select>
          </div>
          <button type="submit">Salvar</button>
        </form>
        <button onClick={closeConfigModal} className={styles.closeButton}>
          <img src="/icons/close.svg" alt="X" />
        </button>
      </div>
    </div>
  );
}
