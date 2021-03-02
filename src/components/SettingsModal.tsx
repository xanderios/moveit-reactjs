import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/SettingsModal.module.css";

export function SettingsModal() {
  const {
    configModalOpen,
    closeConfigModal,
    time,
    handleInput,
    handleSubmit,
  } = useContext(CountdownContext);

  return (
    <div
      className={`${styles.overlay} ${configModalOpen && styles.overlayActive}`}
    >
      <div className={styles.container}>
        <header>Atualizar temporizador</header>
        <form onSubmit={handleSubmit}>
          <input type="text" value={time} onChange={handleInput} />
          <button type="submit">Salvar</button>
        </form>
        <button onClick={closeConfigModal} className={styles.closeButton}>
          <img src="/icons/close.svg" alt="X" />
        </button>
      </div>
    </div>
  );
}
