import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasStarted,
    hasFinished,
    startCountdown,
    resetCountdown,
    toggleCountdown,
    openConfigModal,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
        <button onClick={openConfigModal} className={styles.countdownConfig}>
          <img src="/icons/cogs.svg" alt="Configuração" />
        </button>
      </div>

      {hasFinished && !isActive ? (
        <button
          disabled
          className={`${styles.countdownButton} ${styles.countdownButtonFinished}`}
        >
          <p>Ciclo encerrado</p>
          <img src="icons/check-circle.svg" alt="check" />
          <span />
        </button>
      ) : (
        <>
          {hasStarted ? (
            <div className={styles.countdownActions}>
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonPause}`}
                onClick={toggleCountdown}
              >
                {isActive ? "Pausar ciclo" : "Retomar"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
