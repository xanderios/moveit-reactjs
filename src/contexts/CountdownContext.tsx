import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData {
  time: string;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
  hasFinished: boolean;
  isActive: boolean;
  configModalOpen: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  openConfigModal: () => void;
  closeConfigModal: () => void;
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(
    Cookies.get("timeSetting") || String(25 * 60)
  );
  const [currentTime, setCurrentTime] = useState(Number(time));
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  function startCountdown() {
    setIsActive(true);
    setHasStarted(true);
    setHasFinished(false);
  }

  function resetCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
    setHasStarted(false);
    setHasFinished(false);
    setCurrentTime(Number(time));
  }

  useEffect(() => {
    if (isActive && currentTime > 0) {
      countdownTimeout = setTimeout(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    } else if (isActive && currentTime === 0) {
      setIsActive(false);
      startNewChallenge();
      setHasStarted(false);
      setHasFinished(true);
    }
  }, [isActive, currentTime]);

  function openConfigModal() {
    setConfigModalOpen(true);
  }

  function closeConfigModal() {
    setConfigModalOpen(false);
  }

  function toggleCountdown() {
    setIsActive(!isActive);
    clearTimeout(countdownTimeout);
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    setTime(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setConfigModalOpen(false);
    setCurrentTime(Number(time));
    Cookies.set("timeSetting", time);
  }

  return (
    <CountdownContext.Provider
      value={{
        time,
        minutes,
        seconds,
        hasStarted,
        hasFinished,
        isActive,
        configModalOpen,
        startCountdown,
        resetCountdown,
        openConfigModal,
        closeConfigModal,
        handleInput,
        handleSubmit,
        toggleCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
