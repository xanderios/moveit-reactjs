import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { gitUsername } = useContext(UserContext);

  function username() {
    return gitUsername || "undefined";
  }

  return (
    <div className={styles.profileContainer}>
      <img src={`https://github.com/${username()}.png`} alt={username()} />
      <div>
        <strong>{username()}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
