import {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { LoginModal } from "../components/LoginModal";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  gitUsername: string;
  loginModalOpen: boolean;
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [gitUsername, setGitUsername] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    setGitUsername(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGitUsername(gitUsername);
    Cookies.set("gitUsername", gitUsername);
    setLoginModalOpen(false);
  }

  useEffect(() => {
    if (!Cookies.get("gitUsername")) {
      setLoginModalOpen(true);
      return;
    }
    setGitUsername(Cookies.get("gitUsername"));
  }, []);

  useEffect(() => {
    Cookies.set("gitUsername", gitUsername);
  }, [gitUsername]);

  return (
    <UserContext.Provider
      value={{ gitUsername, loginModalOpen, handleInput, handleSubmit }}
    >
      {children}

      <LoginModal />
    </UserContext.Provider>
  );
}
