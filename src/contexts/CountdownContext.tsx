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
  timeSetting: number;
  timeFormat: string;
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
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    time: number,
    format: string
  ) => void;
  toggleCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [timeFormat, setTimeFormat] = useState(
    Cookies.get("timeFormat") || "minutes"
  );
  const [timeSetting, setTimeSetting] = useState(
    Number(Cookies.get("timeSetting")) || 25
  );
  const [currentTime, setCurrentTime] = useState(
    timeFormat === "minutes" ? timeSetting * 60 : timeSetting
  );
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
    if (timeFormat === "minutes") setCurrentTime(timeSetting * 60);
    else setCurrentTime(timeSetting);
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

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    time: number,
    format: string
  ) {
    e.preventDefault();
    setTimeSetting(time);
    setTimeFormat(format);
    setConfigModalOpen(false);
    Cookies.set("timeSetting", String(time));
    Cookies.set("timeFormat", format);
  }

  useEffect(() => {
    if (timeFormat === "minutes") setCurrentTime(timeSetting * 60);
    else setCurrentTime(timeSetting);
    resetCountdown();
  }, [timeSetting, timeFormat]);

  return (
    <CountdownContext.Provider
      value={{
        timeSetting,
        minutes,
        seconds,
        timeFormat,
        hasStarted,
        hasFinished,
        isActive,
        configModalOpen,
        startCountdown,
        resetCountdown,
        openConfigModal,
        closeConfigModal,
        handleSubmit,
        toggleCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
