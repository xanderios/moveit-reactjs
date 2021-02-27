import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/LoginModal.module.css";

export function LoginModal() {
  const { gitUsername, loginModalOpen, handleInput, handleSubmit } = useContext(
    UserContext
  );

  return (
    <div
      className={`${styles.overlay} ${loginModalOpen && styles.overlayActive}`}
    >
      <div className={styles.container}>
        <header>Usuário do Github</header>
        <form onSubmit={handleSubmit}>
          <input type="text" value={gitUsername} onChange={handleInput} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
